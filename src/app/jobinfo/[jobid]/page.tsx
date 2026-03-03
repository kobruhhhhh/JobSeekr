"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import { Button, Col, Divider, Row, App } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetLoading } from "@/redux/loadersSlice";

// Enable dynamic rendering
export const dynamic = 'force-dynamic';

function JobInfo() {
  const { message } = App.useApp();
  const { currentUser } = useSelector((state: any) => state.users);
  const [jobData, setJobData] = React.useState<any>(null);
  const [applications = [], setApplications] = React.useState<any[]>([]);
  const [isSaved, setIsSaved] = React.useState(false);
  const router = useRouter();
  const { jobid } = useParams();
  const dispatch = useDispatch();
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

  const fetchApplications = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(
        `/api/applications?job=${jobid}&user=${currentUser._id}`
      );
      setApplications(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const fetchSavedStatus = async () => {
    try {
      const response = await axios.get('/api/users/savedjobs');
      const savedJobs = response.data.data;
      const isJobSaved = savedJobs.some((job: any) => job._id === jobid);
      setIsSaved(isJobSaved);
    } catch (error: any) {
      // Silently fail if user hasn't saved any jobs yet
      console.log(error.message);
    }
  };

  const onSaveToggle = async () => {
    try {
      dispatch(SetLoading(true));
      if (isSaved) {
        // Unsave the job
        await axios.delete(`/api/users/savedjobs?jobId=${jobid}`);
        message.success('Job removed from saved list');
        setIsSaved(false);
      } else {
        // Save the job
        await axios.post('/api/users/savedjobs', { jobId: jobid });
        message.success('Job saved successfully');
        setIsSaved(true);
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    if (jobid && currentUser?._id) {
      fetchJob();
      fetchApplications();
      if (currentUser.userType === 'employee') {
        fetchSavedStatus();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobid, currentUser?._id]);

  const onApply = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.post(`/api/applications`, {
        job: jobData._id,
        user: currentUser._id,
        status: "pending",
      });
      message.success(response.data.message);
      // Refresh applications after applying
      fetchApplications();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    jobData && (
      <div>
        <PageTitle title={jobData.title} />

        <Row gutter={[16, 16]} className="gap-3">
          <Col xs={24} sm={24} md={12} lg={12} className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Company</span>
              <span>{jobData.user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Location</span>
              <span>{jobData.location}</span>
            </div>
            <div className="flex justify-between">
              <span>Salary</span>
              <span>
                {jobData.salaryFromRange} LPA - {jobData.salaryToRange} LPA
              </span>
            </div>
            <div className="flex justify-between">
              <span>Work Mode</span>
              <span>{jobData.workMode}</span>
            </div>
            <div className="flex justify-between">
              <span>Jop Type</span>
              <span>{jobData.jobType}</span>
            </div>
            <div className="flex justify-between">
              <span>Experience Required</span>
              <span>{jobData.experience} Years</span>
            </div>
          </Col>

          <Col span={24} className="flex flex-col gap-2">
            <h1 className="text-md">Job Description</h1>
            <Divider />
            <span>{jobData.description}</span>
            {applications.length > 0 && (
              <span className="my-3 info p-3">
                You have already applied for this job. Please wait for the
                employer to respond.
              </span>
            )}
            <div className="flex justify-end gap-3" style={{
              marginBottom: "12px",
              fontSize: "13px",
              color: "#64748b",
              textAlign: "right",
            }}>
              Optimize your Portfolio in Profile section for increased shortlisting opportunities
            </div>
            <div className="flex justify-end flex-wrap" style={{
              gap: "12px",
            }}>
              <Button
                type="default"
                onClick={() => router.back()}
                style={{ minWidth: "90px" }}
              >
                Cancel
              </Button>
              <Button
                type="default"
                onClick={() => router.push(`/userinfo/${jobData.user._id}`)}
                style={{
                  minWidth: "140px",
                  whiteSpace: "normal",
                  height: "auto",
                  padding: "8px 16px",
                }}
              >
                View Company Info
              </Button>
              {currentUser.userType === 'employee' && (
                <Button
                  type={isSaved ? "primary" : "default"}
                  icon={<i className={isSaved ? "ri-bookmark-fill" : "ri-bookmark-line"}></i>}
                  onClick={onSaveToggle}
                  style={{ minWidth: "90px" }}
                >
                  {isSaved ? "Saved" : "Save"}
                </Button>
              )}
              <Button
                type="primary"
                onClick={onApply}
                style={{ minWidth: "90px" }}
                disabled={
                  currentUser.userType === "employer" || applications.length > 0
                }
              >
                Apply
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  );
}

export default JobInfo;
