"use client";
import PageTitle from "@/components/PageTitle";
import { Button, Table, Tooltip, App } from "antd";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetLoading } from "@/redux/loadersSlice";
import moment from "moment";
import Applications from "@/components/Applications";

// Enable dynamic rendering
export const dynamic = 'force-dynamic';

function Jobs() {
  const { message } = App.useApp();
  const [selectedJob = {}, setSelectedJob] = React.useState({} as any);
  const [showApplications = false, setShowApplications] =
    React.useState<boolean>(false);
  const [jobs, setJobs] = React.useState([]);
  const { currentUser } = useSelector((state: any) => state.users);
  const dispatch = useDispatch();
  const router = useRouter();
  const [hasLoaded, setHasLoaded] = React.useState(false);

  const fetchJobs = async () => {
    if (!currentUser?._id) return;
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/jobs?user=${currentUser._id}`);
      setJobs(response.data.data);
      setHasLoaded(true);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const deleteJob = async (jobId: string) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.delete(`/api/jobs/${jobId}`);
      message.success(response.data.message);
      fetchJobs();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    if (currentUser?._id && !hasLoaded) {
      fetchJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?._id]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Posted On",
      dataIndex: "createdAt",
      render: (text: any) => moment(text).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Job Type",
      dataIndex: "jobType",
    },
    {
      title: "Work Mode",
      dataIndex: "workMode",
    },
    {
      title: "Experience",
      dataIndex: "experience",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text: any, record: any) => (
        <div className="flex gap-3">
          <Tooltip title="Delete">
            <i
              className="ri-delete-bin-line"
              onClick={() => deleteJob(record._id)}
            ></i>
          </Tooltip>
          <Tooltip title="Edit">
            <i
              className="ri-pencil-line"
              onClick={() => router.push(`/jobs/edit/${record._id}`)}
            ></i>
          </Tooltip>
          <Tooltip title="Applications">
            <i
              className="ri-file-list-3-line"
              onClick={() => {
                setSelectedJob(record);
                setShowApplications(true);
              }}
            ></i>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Jobs" />
        <Button type="primary" onClick={() => router.push("/jobs/new")}>
          New Job
        </Button>
      </div>

      <div className="my-2">
        <Table columns={columns} dataSource={jobs} />
      </div>

      {showApplications && (
        <Applications
          selectedJob={selectedJob}
          setShowApplications={setShowApplications}
          showApplications={showApplications}
        />
      )}
    </div>
  );
}

export default Jobs;
