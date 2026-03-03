"use client";
import React, { useEffect, useState } from "react";
import { ConfigProvider, App, theme as antdTheme, Drawer } from "antd";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "@/redux/usersSlice";
import ModernLoader from "./ModernLoader";
import { SetLoading } from "@/redux/loadersSlice";
import { initializeTheme, updateSystemTheme } from "@/redux/themeSlice";

// Inner component that uses App context
function LayoutContent({ children }: { children: React.ReactNode }) {
  const { currentUser } = useSelector((state: any) => state.users);
  const { loading } = useSelector((state: any) => state.loaders);
  const { mode, preference } = useSelector((state: any) => state.theme);
  const dispatch = useDispatch();
  const router = useRouter();
  const { message } = App.useApp();
  const pathname = usePathname();
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true);
  const [isInitializing, setIsInitializing] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);
  const isDark = mode === "dark";

  // Initialize theme on mount
  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  // Listen for system theme changes
  useEffect(() => {
    if (preference === "system" && typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = () => {
        dispatch(updateSystemTheme());
      };

      // Modern browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, [preference, dispatch]);
  const [menuItems, setMenuItems] = useState([
    {
      name: "Home",
      path: "/",
      icon: "ri-home-7-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-shield-user-line",
    },
    {
      name: "Applications",
      path: "/applications",
      icon: "ri-file-list-2-line",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "ri-settings-2-line",
    },
    {
      name: "Saved",
      path: "/saved",
      icon: "ri-save-line",
    },
  ]);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get("/api/users/currentuser");
      const isEmployer = response.data.data.userType === "employer";

      if (isEmployer) {
        setMenuItems((prevItems) => {
          const newItems = [...prevItems];
          newItems[2] = { ...newItems[2], name: "Posted Jobs", path: "/jobs" };
          return newItems;
        });
      }

      dispatch(SetCurrentUser(response.data.data));
    } catch (error: any) {
      console.error("Failed to get current user:", error);
      // Only show error if not unauthorized (user will be redirected by middleware)
      if (error.response?.status !== 401) {
        message.error(error.response?.data?.message || "Something went wrong");
      }
    } finally {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    if (pathname !== "/login" && pathname !== "/register") {
      if (!currentUser) {
        getCurrentUser();
      } else {
        setIsInitializing(false);
      }
    } else {
      setIsInitializing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const onLogout = async () => {
    try {
      dispatch(SetLoading(true));
      await axios.post("/api/users/logout");
      message.success("Logged out successfully");
      dispatch(SetCurrentUser(null));
      router.push("/login");
    } catch (error: any) {
      message.error(error.response.data.message || "Something went wrong");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  // Add data-theme attribute for CSS targeting
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarExpanded(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sidebar content component
  const SidebarContent = () => (
    <>
      <div className="logo" style={{
        borderBottom: isDark ? "1px solid #334155" : "1px solid rgba(255,255,255,0.1)",
        padding: "20px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {isSidebarExpanded && (
          <h1 style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: 0,
            fontSize: "22px",
            fontWeight: "600",
          }}>
            <i className="ri-briefcase-4-fill" style={{ fontSize: "24px" }}></i>
            JobSeekr
          </h1>
        )}

        {!isSidebarExpanded && (
          <i
            className="ri-menu-2-line"
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            style={{ cursor: "pointer", fontSize: "24px" }}
          ></i>
        )}
        {isSidebarExpanded && (
          <i
            className="ri-close-line"
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            style={{ cursor: "pointer", fontSize: "24px" }}
          ></i>
        )}
      </div>

      <div className="menu-items" style={{
        padding: isMobile ? "16px 8px" : undefined,
      }}>
        {menuItems.map((item, index) => {
          const isActive = pathname === item.path;
          return (
            <div
              className={`menu-item ${isActive ? "active-menu-item" : ""}`}
              style={{
                justifyContent: isSidebarExpanded ? "flex-start" : "center",
              }}
              key={index}
              onClick={() => {
                router.push(item.path);
                if (isMobile) setIsSidebarExpanded(false);
              }}
            >
              <i className={item.icon}></i>
              <span>{isSidebarExpanded && item.name}</span>
            </div>
          );
        })}
      </div>

      <div className="user-info flex justify-between items-center">
        {isSidebarExpanded && (
          <div className="flex flex-col">
            <span>{currentUser?.name}</span>
          </div>
        )}

        <i className="ri-logout-box-r-line" onClick={onLogout}></i>
      </div>
    </>
  );

  return (
    <>
      {loading && <ModernLoader />}

      {/* if route is login or register , dont show layout */}

      {pathname === "/login" || pathname === "/register" ? (
        <div style={{
          backgroundColor: isDark ? "#111827" : "#ffffff",
          minHeight: "100vh",
          transition: "background-color 0.3s ease",
        }}>{children}</div>
      ) : isInitializing ? (
        // Show loader while fetching current user
        <ModernLoader />
      ) : currentUser ? (
        <div className="layout-parent" style={{
          backgroundColor: isDark ? "#0f172a" : "#f9fafb",
          transition: "background-color 0.3s ease",
        }}>
          {/* Mobile: Hamburger + Drawer */}
          {isMobile && (
            <>
              {!isSidebarExpanded && (
                <div style={{
                  position: "fixed",
                  top: "16px",
                  left: "16px",
                  zIndex: 1001,
                  backgroundColor: isDark ? "#1e293b" : "#213555",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                  onClick={() => setIsSidebarExpanded(true)}
                >
                  <i className="ri-menu-line" style={{ fontSize: "24px", color: "#ffffff" }}></i>
                </div>
              )}
              <Drawer
                placement="left"
                onClose={() => setIsSidebarExpanded(false)}
                open={isSidebarExpanded}
                closable={false}
                width="280px"
                styles={{
                  body: {
                    padding: 0,
                    backgroundColor: isDark ? "#1e293b" : "#213555",
                  },
                }}
              >
                <div style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: isDark ? "#1e293b" : "#213555",
                  color: "#ffffff",
                }}>
                  <SidebarContent />
                </div>
              </Drawer>
            </>
          )}

          {/* Desktop: Standard Sidebar */}
          {!isMobile && (
            <div
              className="sidebar"
              style={{
                width: isSidebarExpanded ? "250px" : "auto",
                backgroundColor: isDark ? "#1e293b" : "#213555",
                transition: "all 0.3s ease",
              }}
            >
              <SidebarContent />
            </div>
          )}

          <div className="body" style={{
            backgroundColor: isDark ? "#0f172a" : "#f9fafb",
            color: isDark ? "#f3f4f6" : "#1f2937",
            transition: "all 0.3s ease",
            paddingTop: isMobile ? "70px" : "0",
            height: isMobile ? "100vh" : "auto",
            overflowY: isMobile ? "auto" : "auto",
            overflowX: "hidden",
          }}>{children}</div>
        </div>
      ) : null}
    </>
  );
}

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const ThemeWrapper = () => {
    const { mode } = useSelector((state: any) => state.theme);
    const isDark = mode === "dark";
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) {
      return null;
    }

    return (
      <ConfigProvider
        theme={{
          algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
          token: {
            colorPrimary: isDark ? "#4f46e5" : "#213555",
            colorBgBase: isDark ? "#0f172a" : "#ffffff",
            colorTextBase: isDark ? "#f3f4f6" : "#1f2937",
            borderRadius: 8,
            fontSize: 14,
          },
          components: {
            Button: {
              controlHeight: 40,
              borderRadius: 8,
            },
            Input: {
              controlHeight: 40,
              borderRadius: 8,
            },
            Select: {
              controlHeight: 40,
              borderRadius: 8,
            },
            Card: {
              borderRadius: 12,
            },
            Table: {
              borderRadius: 12,
            },
          },
        }}
      >
        <App>
          <LayoutContent>{children}</LayoutContent>
        </App>
      </ConfigProvider>
    );
  };

  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <ThemeWrapper />
      </body>
    </html>
  );
}

export default LayoutProvider;
