"use client";
import { Col, Form, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";

function EmployerForm() {
  const { mode } = useSelector((state: any) => state.theme);
  const isDark = mode === "dark";

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

  const textareaStyle = {
    ...inputStyle,
    minHeight: "100px",
    resize: "vertical" as const,
    fontFamily: "inherit",
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item label="Name" name="name">
            <input type="text" style={inputStyle} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Email" name="email">
            <input type="email" style={inputStyle} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Phone" name="phone">
            <input type="text" style={inputStyle} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Est Year" name="establishmentYear">
            <input type="number" style={inputStyle} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Website" name="website">
            <input type="text" style={inputStyle} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="No Of Employees" name="companySize">
            <input type="number" style={inputStyle} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="About" name="about">
            <textarea style={textareaStyle} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Address" name="address">
            <textarea style={textareaStyle} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default EmployerForm;
