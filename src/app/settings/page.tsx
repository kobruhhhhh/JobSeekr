"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/redux/themeSlice";
import PageTitle from "@/components/PageTitle";
import { Card, Radio, Space, App } from "antd";

function Settings() {
  const dispatch = useDispatch();
  const { mode, preference } = useSelector((state: any) => state.theme);
  const { message } = App.useApp();
  const isDark = mode === "dark";

  const handleThemeChange = (value: string) => {
    dispatch(setTheme(value));
    message.success(`Theme set to ${value.charAt(0).toUpperCase() + value.slice(1)}`);
  };

  const themeOptions = [
    {
      value: "light",
      label: "Light",
      icon: "ri-sun-line",
      description: "Clean and bright interface",
      color: "#f59e0b",
    },
    {
      value: "dark",
      label: "Dark",
      icon: "ri-moon-line",
      description: "Easy on the eyes in low light",
      color: "#6366f1",
    },
    {
      value: "system",
      label: "System",
      icon: "ri-computer-line",
      description: "Automatically adapts to your device settings",
      color: "#8b5cf6",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: isDark ? "#1e293b" : "#ffffff",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: isDark
          ? "0 4px 12px rgba(0, 0, 0, 0.3)"
          : "0 4px 12px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease",
      }}
    >
      <PageTitle title="Settings" />

      <div style={{ marginTop: "24px" }}>
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: isDark ? "#e0e7ff" : "#213555",
            marginBottom: "16px",
          }}
        >
          <i className="ri-palette-line" style={{ marginRight: "8px" }}></i>
          Appearance
        </h2>

        <p
          style={{
            color: isDark ? "#94a3b8" : "#6b7280",
            marginBottom: "24px",
            fontSize: "14px",
          }}
        >
          Choose how JobSeekr looks to you. Select a single theme, or sync with your
          system and automatically switch between day and night themes.
        </p>

        <Radio.Group
          value={preference}
          onChange={(e) => handleThemeChange(e.target.value)}
          style={{ width: "100%" }}
        >
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            {themeOptions.map((option) => (
              <Card
                key={option.value}
                hoverable
                style={{
                  backgroundColor: isDark ? "#0f172a" : "#f9fafb",
                  border:
                    preference === option.value
                      ? `2px solid ${option.color}`
                      : isDark
                      ? "2px solid #334155"
                      : "2px solid #e5e7eb",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow:
                    preference === option.value
                      ? `0 0 0 4px ${option.color}20`
                      : "none",
                }}
                onClick={() => handleThemeChange(option.value)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <Radio value={option.value} />
                  
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "12px",
                      background: `linear-gradient(135deg, ${option.color}30, ${option.color}10)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      color: option.color,
                    }}
                  >
                    <i className={option.icon}></i>
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "16px",
                        fontWeight: "600",
                        color: isDark ? "#f3f4f6" : "#1f2937",
                      }}
                    >
                      {option.label}
                    </h3>
                    <p
                      style={{
                        margin: "4px 0 0 0",
                        fontSize: "13px",
                        color: isDark ? "#94a3b8" : "#6b7280",
                      }}
                    >
                      {option.description}
                    </p>
                  </div>

                  {preference === option.value && (
                    <i
                      className="ri-check-line"
                      style={{
                        fontSize: "24px",
                        color: option.color,
                        animation: "scaleIn 0.3s ease",
                      }}
                    ></i>
                  )}
                </div>
              </Card>
            ))}
          </Space>
        </Radio.Group>

        {preference === "system" && (
          <div
            style={{
              marginTop: "24px",
              padding: "16px",
              backgroundColor: isDark ? "#1e3a8a20" : "#dbeafe",
              border: isDark ? "1px solid #1e40af" : "1px solid #3b82f6",
              borderRadius: "8px",
              display: "flex",
              alignItems: "start",
              gap: "12px",
            }}
          >
            <i
              className="ri-information-line"
              style={{
                fontSize: "20px",
                color: isDark ? "#60a5fa" : "#2563eb",
                marginTop: "2px",
              }}
            ></i>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: isDark ? "#93c5fd" : "#1e40af",
                  fontWeight: "500",
                }}
              >
                Currently using: <strong>{mode === "dark" ? "Dark" : "Light"} mode</strong>
              </p>
              <p
                style={{
                  margin: "4px 0 0 0",
                  fontSize: "13px",
                  color: isDark ? "#93c5fd" : "#1e40af",
                }}
              >
                This matches your system's appearance settings. The theme will automatically
                change when your system theme changes.
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default Settings;
