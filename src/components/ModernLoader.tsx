"use client";
import React from "react";
import { useSelector } from "react-redux";

function ModernLoader() {
  const { mode } = useSelector((state: any) => state.theme);
  const isDark = mode === "dark";

  return (
    <div
      className="modern-loader-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isDark ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="modern-loader-content" style={{ textAlign: "center" }}>
        {/* Animated Logo */}
        <div className="loader-logo" style={{ marginBottom: "2rem" }}>
          <div
            className="pulse-ring"
            style={{
              width: "120px",
              height: "120px",
              margin: "0 auto",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                border: `4px solid ${isDark ? "#4f46e5" : "#213555"}`,
                borderTopColor: "transparent",
                animation: "spin 1s linear infinite",
                position: "absolute",
              }}
            />
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                border: `4px solid ${isDark ? "#818cf8" : "#4a5a7a"}`,
                borderBottomColor: "transparent",
                animation: "spin 1.5s linear infinite reverse",
                position: "absolute",
                top: "15px",
                left: "15px",
              }}
            />
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: isDark ? "#4f46e5" : "#213555",
                position: "absolute",
                top: "30px",
                left: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "pulse 2s ease-in-out infinite",
              }}
            >
              <i
                className="ri-briefcase-line"
                style={{
                  fontSize: "30px",
                  color: "#ffffff",
                }}
              />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: isDark ? "#f3f4f6" : "#213555",
            marginBottom: "0.5rem",
            animation: "fadeInOut 2s ease-in-out infinite",
          }}
        >
          JobSeekr
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: isDark ? "#9ca3af" : "#6b7280",
            animation: "fadeInOut 2s ease-in-out infinite 0.5s",
          }}
        >
          Loading your opportunities...
        </p>

        {/* Progress Dots */}
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: isDark ? "#4f46e5" : "#213555",
                animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        @keyframes fadeInOut {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}

export default ModernLoader;
