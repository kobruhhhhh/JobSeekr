"use client";
import React, { useState, useEffect } from "react";
import { Button, Form, Radio, App, ConfigProvider, theme } from "antd";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "@/redux/loadersSlice";

function Register() {
    const { message } = App.useApp();
    const dispatch = useDispatch();
    const { mode } = useSelector((state: any) => state.theme);
    const isDark = mode === "dark";
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const onFinish = async (values: any) => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.post("/api/users/register", values);
            message.success(response.data.message);
        } catch (error: any) {
            message.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(SetLoading(false));
        }
    };

    const inputStyle = {
        backgroundColor: isDark ? "#0f172a" : "#ffffff",
        color: isDark ? "#f3f4f6" : "#1f2937",
        border: isDark ? "1px solid #334155" : "1px solid #d1d5db",
        padding: "10px 12px",
        borderRadius: "8px",
        fontSize: "14px",
        outline: "none",
        transition: "all 0.3s ease",
        width: "100%",
    };

    const labelColor = isDark ? "#e2e8f0" : "#1e293b";

    if (!mounted) return null;

    return (
        <ConfigProvider
            theme={{
                algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
                token: {
                    colorTextHeading: labelColor,
                    colorText: labelColor,
                    colorTextDescription: isDark ? "#94a3b8" : "#64748b",
                },
                components: {
                    Form: {
                        labelColor: labelColor,
                        labelFontSize: 15,
                        fontWeightStrong: 600,
                    },
                    Radio: {
                        colorPrimary: isDark ? "#6366f1" : "#4f46e5",
                    }
                }
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    backgroundColor: isDark ? "#0f172a" : "#213555",
                    transition: "background-color 0.3s ease",
                    padding: "20px",
                }}
            >
                <div
                    style={{
                        backgroundColor: isDark ? "#1e293b" : "#ffffff",
                        padding: "40px",
                        borderRadius: "16px",
                        boxShadow: isDark
                            ? "0 8px 24px rgba(0, 0, 0, 0.5)"
                            : "0 8px 24px rgba(0, 0, 0, 0.15)",
                        width: "100%",
                        maxWidth: "450px",
                        transition: "all 0.3s ease",
                    }}
                >
                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                        <div style={{
                            width: "80px",
                            height: "80px",
                            margin: "0 auto 16px",
                            background: isDark
                                ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
                                : "linear-gradient(135deg, #213555, #4a5a7a)",
                            borderRadius: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: isDark
                                ? "0 4px 12px rgba(79, 70, 229, 0.3)"
                                : "0 4px 12px rgba(33, 53, 85, 0.3)",
                        }}>
                            <i className="ri-user-add-fill" style={{ fontSize: "40px", color: "#ffffff" }}></i>
                        </div>
                        <h1 style={{
                            fontSize: "28px",
                            fontWeight: "700",
                            color: labelColor,
                            marginBottom: "8px",
                        }}>
                            Create Account
                        </h1>
                        <p style={{
                            fontSize: "14px",
                            color: isDark ? "#94a3b8" : "#6b7280",
                        }}>
                            Join JobSeekr and find your dream job
                        </p>
                    </div>

                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
                    >
                        <Form.Item label="Register As" name="userType" rules={[{ required: true, message: "Please select your role" }]}>
                            <Radio.Group style={{ width: "100%", display: "flex", gap: "12px" }}>
                                <Radio
                                    value="employer"
                                    style={{
                                        width: "calc(50% - 6px)",
                                        padding: "16px",
                                        border: isDark ? "2px solid #6366f1" : "2px solid #d1d5db",
                                        borderRadius: "12px",
                                        backgroundColor: isDark ? "#1e293b" : "#f8fafc",
                                        transition: "all 0.3s ease",
                                        display: "flex",
                                        alignItems: "center",
                                        margin: 0,
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%" }}>
                                        <div style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "8px",
                                            background: isDark ? "linear-gradient(135deg, #4f46e5, #7c3aed)" : "linear-gradient(135deg, #213555, #4a5a7a)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#ffffff",
                                            fontSize: "20px",
                                        }}>
                                            <i className="ri-building-line"></i>
                                        </div>
                                        <div>
                                            <div style={{
                                                fontWeight: "600",
                                                fontSize: "15px",
                                                color: labelColor,
                                            }}>
                                                Employer
                                            </div>
                                            <div style={{
                                                fontSize: "12px",
                                                color: isDark ? "#94a3b8" : "#6b7280",
                                                marginTop: "2px",
                                            }}>
                                                Hire talent
                                            </div>
                                        </div>
                                    </div>
                                </Radio>
                                <Radio
                                    value="employee"
                                    style={{
                                        width: "calc(50% - 6px)",
                                        padding: "16px",
                                        border: isDark ? "2px solid #10b981" : "2px solid #d1d5db",
                                        borderRadius: "12px",
                                        backgroundColor: isDark ? "#1e293b" : "#f8fafc",
                                        transition: "all 0.3s ease",
                                        display: "flex",
                                        alignItems: "center",
                                        margin: 0,
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%" }}>
                                        <div style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "8px",
                                            background: isDark ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #10b981, #047857)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#ffffff",
                                            fontSize: "20px",
                                        }}>
                                            <i className="ri-user-search-line"></i>
                                        </div>
                                        <div>
                                            <div style={{
                                                fontWeight: "600",
                                                fontSize: "15px",
                                                color: labelColor,
                                            }}>
                                                Employee
                                            </div>
                                            <div style={{
                                                fontSize: "12px",
                                                color: isDark ? "#94a3b8" : "#6b7280",
                                                marginTop: "2px",
                                            }}>
                                                Find jobs
                                            </div>
                                        </div>
                                    </div>
                                </Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
                            <input type="text" style={inputStyle} placeholder="Enter your full name" />
                        </Form.Item>

                        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email" }]}>
                            <input type="email" style={inputStyle} placeholder="Enter your email" />
                        </Form.Item>

                        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
                            <input type="password" style={inputStyle} placeholder="Create a password" />
                        </Form.Item>

                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{
                                height: "44px",
                                fontSize: "16px",
                                fontWeight: "600",
                                background: isDark
                                    ? "linear-gradient(135deg, #6366f1, #a855f7)"
                                    : "linear-gradient(135deg, #4f46e5, #7c3aed)",
                                border: "none",
                                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.25)",
                            }}
                        >
                            Register
                        </Button>

                        <div style={{ textAlign: "center", marginTop: "8px" }}>
                            <Link
                                href="/login"
                                style={{
                                    color: isDark ? "#ffffff" : "#1f2937",
                                    textDecoration: "none",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
                                onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
                            >
                                Already have an account? Login
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
}

export default Register;
