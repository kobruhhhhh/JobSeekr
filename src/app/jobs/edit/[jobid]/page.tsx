"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import { Button, Form, App } from "antd";
import JobPostForm from "@/components/JobPostForm";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetLoading } from "@/redux/loadersSlice";

function EditJob() {
  const { message } = App.useApp();
  const [jobData, setJobData] = React.useState<any>(null);
  const router = useRouter();

  const { jobid } = useParams();

  const dispatch = useDispatch();
  const { mode } = useSelector((state: any) => state.theme);
  const isDark = mode === "dark";

  const onFinish = async (values: any) => {
    try {
      values._id = jobid;
      dispatch(SetLoading(true));
      const response = await axios.put(`/api/jobs/${jobid}`, values);
      message.success(response.data.message);
      router.push("/jobs");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const fetchJob = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/jobs/${jobid}`);
      setJobData(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    if (jobid) {
      fetchJob();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobid]);

  return (
    jobData && (
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
          <PageTitle title="Edit Job Post" />
          <Button type="default" onClick={() => router.back()}>
            Back
          </Button>
        </div>

        <Form layout="vertical" onFinish={onFinish} initialValues={jobData}>
          <JobPostForm />

          <div className="flex justify-end items-center gap-3 my-3">
            <Button type="default" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Update Job
            </Button>
          </div>
        </Form>
      </div>
    )
  );
}

export default EditJob;
