"use client";
import PageTitle from "@/components/PageTitle";
import { Table, App } from "antd";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetLoading } from "@/redux/loadersSlice";
import moment from "moment";

// Enable dynamic rendering
export const dynamic = 'force-dynamic';

function Applications() {
  const { message } = App.useApp();
  const [applications, setApplications] = React.useState([]);
  const { currentUser } = useSelector((state: any) => state.users);
  const dispatch = useDispatch();
  const router = useRouter();
  const [hasLoaded, setHasLoaded] = React.useState(false);

  const fetchApplications = async () => {
    if (!currentUser?._id) return;
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(
        `/api/applications?user=${currentUser._id}`
      );
      setApplications(response.data.data);
      setHasLoaded(true);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    if (currentUser?._id && !hasLoaded) {
      fetchApplications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?._id]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const columns = [
    {
      title: "Application ID",
      dataIndex: "_id",
      width: isMobile ? 120 : 200,
      ellipsis: true,
      render: (id: string) => (
        <span style={{
          fontSize: isMobile ? "11px" : "14px",
          wordBreak: "break-all",
        }}>
          {isMobile ? `${id.substring(0, 8)}...` : id}
        </span>
      ),
    },
    {
      title: "Job Title",
      dataIndex: "job",
      render: (job: any) => job.title,
      width: isMobile ? 150 : undefined,
      ellipsis: true,
    },
    {
      title: "Company",
      dataIndex: "job",
      render: (job: any) => job.user.name,
      width: isMobile ? 120 : undefined,
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: isMobile ? 100 : undefined,
    },
    {
      title: "Applied On",
      dataIndex: "createdAt",
      render: (createdAt: any) => moment(createdAt).format("DD/MM/YYYY"),
      width: isMobile ? 110 : undefined,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Applications" />
      </div>

      <div className="my-2" style={{
        overflowX: isMobile ? "auto" : "visible",
      }}>
        <Table
          columns={columns}
          dataSource={applications}
          scroll={isMobile ? { x: 600 } : undefined}
          pagination={{
            pageSize: isMobile ? 5 : 10,
            showSizeChanger: !isMobile,
          }}
        />
      </div>
    </div>
  );
}

export default Applications;
