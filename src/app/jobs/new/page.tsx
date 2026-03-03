"use client";
import React from "react";
import { useRouter } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import { Button, Form, App } from "antd";
import JobPostForm from "@/components/JobPostForm";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetLoading } from "@/redux/loadersSlice";

function NewJob() {
  const { message } = App.useApp();
  const router = useRouter();
  const dispatch = useDispatch();
  const { mode } = useSelector((state: any) => state.theme);
  const isDark = mode === "dark";

  const onFinish = async (values: any) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/jobs", values);
      message.success(response.data.message);
      router.push("/jobs");
    } catch (error: any) {
      message.error(error.message);
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
      <div className="flex justify-between items-center">
        <PageTitle title="Post New Job" />
        <Button type="default" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <JobPostForm />

        <div className="flex justify-end items-center gap-3 my-3">
          <Button type="default" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Post Job
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default NewJob;
