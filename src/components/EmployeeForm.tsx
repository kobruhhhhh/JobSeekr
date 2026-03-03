"use client";
import { Button, Col, Form, Row, Space } from "antd";
import React from "react";
import { useSelector } from "react-redux";

function EmployeeForm() {
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

  const sectionTitleStyle = {
    color: isDark ? "#e0e7ff" : "#213555",
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "16px",
  };

  const deleteIconStyle = {
    color: isDark ? "#ef4444" : "#dc2626",
    cursor: "pointer",
    fontSize: "20px",
    transition: "all 0.3s ease",
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Required" }]}
          >
            <input type="text" style={inputStyle} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Required" }]}
          >
            <input type="email" style={inputStyle} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Phone" name="phone">
            <input type="text" style={inputStyle} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Carrier Objective" name="carrierObjective">
            <textarea style={textareaStyle} />
          </Form.Item>
        </Col>
      </Row>

      {/* education */}
      <div
        style={{
          marginTop: 35,
        }}
      >
        <h1 style={sectionTitleStyle}>Education</h1>
        <Form.List name="education">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={[16, 16]} align="bottom">
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "qualification"]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                      label="Qualification"
                    >
                      <input type="text" style={inputStyle} />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "institution"]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                      label="Institution"
                    >
                      <input type="text" style={inputStyle} />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, "percentage"]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                      label="Percentage"
                    >
                      <input type="text" style={inputStyle} />
                    </Form.Item>
                  </Col>

                  <i
                    className="ri-delete-bin-line"
                    onClick={() => remove(name)}
                    style={deleteIconStyle}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  ></i>
                </Row>
              ))}
              <Form.Item className="my-2">
                <Button type="dashed" onClick={() => add()} block>
                  Add Education
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>

      {/* skills */}
      <div
        style={{
          marginTop: 35,
        }}
      >
        <h1 style={sectionTitleStyle}>Skills</h1>
        <Form.List name="skills">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={[16, 16]} align="bottom">
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "technology"]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                      label="Technology"
                    >
                      <input type="text" style={inputStyle} />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, "rating"]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                      label="Rating"
                    >
                      <input type="text" style={inputStyle} />
                    </Form.Item>
                  </Col>

                  <i
                    className="ri-delete-bin-line"
                    onClick={() => remove(name)}
                    style={deleteIconStyle}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  ></i>
                </Row>
              ))}
              <Form.Item className="my-2">
                <Button type="dashed" onClick={() => add()} block>
                  Add Skill
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>

      {/* experience */}
      <div
        style={{
          marginTop: 35,
        }}
      >
        <h1 style={sectionTitleStyle}>Experience</h1>
        <Form.List name="experience">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={[16, 16]} align="bottom">
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "company"]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                      label="Company"
                    >
                      <input type="text" style={inputStyle} />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "role"]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                      label="Role"
                    >
                      <input type="text" style={inputStyle} />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, "period"]}
                      rules={[
                        {
                          required: true,
                          message: "Required",
                        },
                      ]}
                      label="Period of Work"
                    >
                      <input type="text" style={inputStyle} />
                    </Form.Item>
                  </Col>

                  <i
                    className="ri-delete-bin-line"
                    onClick={() => remove(name)}
                    style={deleteIconStyle}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  ></i>
                </Row>
              ))}
              <Form.Item className="my-2">
                <Button type="dashed" onClick={() => add()} block>
                  Add Experience
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
    </>
  );
}

export default EmployeeForm;
