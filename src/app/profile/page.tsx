"use client";
import EmployeeForm from "@/components/EmployeeForm";
import EmployerForm from "@/components/EmployerForm";
import PageTitle from "@/components/PageTitle";
import { Button, Form, App } from "antd";
import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetCurrentUser } from "@/redux/usersSlice";
import { SetLoading } from "@/redux/loadersSlice";

function Profile() {
  const { message } = App.useApp();
  const { currentUser } = useSelector((state: any) => state.users);
  const { mode } = useSelector((state: any) => state.theme);
  const isDark = mode === "dark";
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      values._id = currentUser._id;
      values.userType = currentUser.userType;
      dispatch(SetLoading(true));
      const response = await axios.put("/api/users", values);
      message.success("Profile updated successfully");
      dispatch(SetCurrentUser(response.data.data));
    } catch (error: any) {
      message.error(error.response.data.message || "Something went wrong");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <div style={{
      backgroundColor: isDark ? "#1e293b" : "#ffffff",
      padding: "24px",
      borderRadius: "12px",
      boxShadow: isDark 
        ? "0 4px 12px rgba(0, 0, 0, 0.3)" 
        : "0 4px 12px rgba(0, 0, 0, 0.08)",
      transition: "all 0.3s ease",
    }}>
      <PageTitle title="Profile" />
      <Form layout="vertical" initialValues={currentUser} onFinish={onFinish}>
        {currentUser?.userType === "employer" ? (
          <EmployerForm />
        ) : (
          <EmployeeForm />
        )}

        <div className="flex justify-end my-3">
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Profile;
