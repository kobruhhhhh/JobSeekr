"use client";
import React from "react";
import { Col, Form, Row } from "antd";
import { useSelector } from "react-redux";

function JobPostForm() {
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
    minHeight: "120px",
    resize: "vertical" as const,
    fontFamily: "inherit",
  };

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer",
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Form.Item
          label="Title"
          rules={[{ required: true, message: "Please enter a job title" }]}
          name="title"
        >
          <input style={inputStyle} placeholder="e.g. Senior Software Engineer" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          label="Description"
          rules={[
            { required: true, message: "Please enter a job description" },
          ]}
          name="description"
        >
          <textarea 
            style={textareaStyle} 
            placeholder="Describe the role, responsibilities, and requirements..."
          />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label="Type" name="jobType" rules={[{ required: true}]}>
          <select style={selectStyle}>
            <option value="" disabled selected hidden>Please Choose...</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
          </select>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label="Location" name="location" rules={[{ required: true}]}>
          <input style={inputStyle} placeholder="e.g. New York, USA" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label="Experience" name="experience" rules={[{ required: true}]}>
          <input type="number" style={inputStyle} placeholder="Years required" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Work Mode" name="workMode" rules={[{ required: true}]}>
          <select style={selectStyle}>
            <option value="" disabled selected hidden>Please Choose...</option>
            <option value="remote">Remote</option>
            <option value="office">Office</option>
          </select>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label="Salary From Range (LPA)" name="salaryFromRange" rules={[{ required: true}]}>
          <input type="number" style={inputStyle} placeholder="Min salary" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label="Salary To Range (LPA)" name="salaryToRange" rules={[{ required: true}]}>
          <input type="number" style={inputStyle} placeholder="Max salary" />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default JobPostForm;
