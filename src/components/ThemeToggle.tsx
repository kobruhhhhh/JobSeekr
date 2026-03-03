"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/redux/themeSlice";
import { Tooltip } from "antd";

function ThemeToggle() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state: any) => state.theme);
  const isDark = mode === "dark";

  return (
    <Tooltip title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
      <button
        onClick={() => dispatch(toggleTheme())}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: isDark ? "#374151" : "#f3f4f6",
          color: isDark ? "#fbbf24" : "#f59e0b",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          transition: "all 0.3s ease",
          boxShadow: isDark
            ? "0 4px 6px rgba(0, 0, 0, 0.3)"
            : "0 4px 6px rgba(0, 0, 0, 0.1)",
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: 1000,
        }}
        className="theme-toggle-btn"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1) rotate(15deg)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1) rotate(0deg)";
        }}
      >
        {isDark ? (
          <i className="ri-sun-line" style={{ animation: "rotate 2s linear infinite" }} />
        ) : (
          <i className="ri-moon-line" />
        )}
      </button>
      <style jsx>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .theme-toggle-btn:hover {
          box-shadow: ${isDark
            ? "0 6px 12px rgba(251, 191, 36, 0.4)"
            : "0 6px 12px rgba(245, 158, 11, 0.4)"} !important;
        }
      `}</style>
    </Tooltip>
  );
}

export default ThemeToggle;
