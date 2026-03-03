"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, App } from "antd";
import axios from "axios";
import { SetLoading } from "@/redux/loadersSlice";
import Divider from "@/components/Divider";
import { useRouter } from "next/navigation";
import Filters from "@/components/Filters";

function Home() {
  const { message } = App.useApp();
  const { mode } = useSelector((state: any) => state.theme);
  const isDark = mode === "dark";
  const [filters, setFilters] = React.useState({
    searchText: "",
    location: "",
  });
  const router = useRouter();
  const [jobs = [], setJobs] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const dispatch = useDispatch();

  const fetchJobs = async () => {
    if (isLoading) return; // Prevent duplicate requests
    try {
      setIsLoading(true);
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/jobs`, { params: filters });
      setJobs(response.data.data);
      setHasLoaded(true);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Filters filters={filters} setFilters={setFilters} getData={fetchJobs} />

      {!isLoading && jobs.length === 0 ? (
        <div className="flex justify-center items-center p-10">
          <h2 style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
            No jobs found. Try adjusting your filters.
          </h2>
        </div>
      ) : (
        <Row>
          {jobs.map((job: any) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={8}
              className="p-2"
              key={job._id}
              onClick={() => router.push(`/jobinfo/${job._id}`)}
              style={{ cursor: "pointer" }}
            >
              <div
                className="card flex flex-col gap-2 cursor-pointer p-2 job-card"
                style={{
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  color: isDark ? "#f3f4f6" : "#1f2937",
                  border: isDark ? "1px solid #334155" : "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "20px",
                  transition: "all 0.3s ease",
                  boxShadow: isDark
                    ? "0 4px 12px rgba(0, 0, 0, 0.3)"
                    : "0 4px 12px rgba(0, 0, 0, 0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = isDark
                    ? "0 12px 24px rgba(79, 70, 229, 0.3)"
                    : "0 12px 24px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = isDark
                    ? "0 4px 12px rgba(0, 0, 0, 0.3)"
                    : "0 4px 12px rgba(0, 0, 0, 0.08)";
                }}
              >
                <h1
                  className="text-md"
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: isDark ? "#e0e7ff" : "#213555",
                    marginBottom: "12px"
                  }}
                >
                  {job.title}
                </h1>
                <Divider />

                <div
                  className="flex justify-between"
                  style={{
                    padding: "8px 0",
                    fontSize: "14px"
                  }}
                >
                  <span style={{ color: isDark ? "#94a3b8" : "#6b7280", fontWeight: "500" }}>Company</span>
                  <span style={{ color: isDark ? "#f3f4f6" : "#1f2937", fontWeight: "600" }}>{job.user.name}</span>
                </div>
                <div
                  className="flex justify-between"
                  style={{
                    padding: "8px 0",
                    fontSize: "14px"
                  }}
                >
                  <span style={{ color: isDark ? "#94a3b8" : "#6b7280", fontWeight: "500" }}>Location</span>
                  <span style={{ color: isDark ? "#f3f4f6" : "#1f2937", fontWeight: "600" }}>{job.location}</span>
                </div>

                <div
                  className="flex justify-between"
                  style={{
                    padding: "8px 0",
                    fontSize: "14px"
                  }}
                >
                  <span style={{ color: isDark ? "#94a3b8" : "#6b7280", fontWeight: "500" }}>Salary</span>
                  <span style={{
                    color: isDark ? "#4ade80" : "#16a34a",
                    fontWeight: "700"
                  }}>
                    {job.salaryFromRange} LPA - {job.salaryToRange} LPA
                  </span>
                </div>

                <div
                  className="flex justify-between"
                  style={{
                    padding: "8px 0",
                    fontSize: "14px"
                  }}
                >
                  <span style={{ color: isDark ? "#94a3b8" : "#6b7280", fontWeight: "500" }}>Work Mode</span>
                  <span style={{
                    backgroundColor: isDark ? "#4f46e5" : "#e0e7ff",
                    color: isDark ? "#e0e7ff" : "#4f46e5",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "600"
                  }}>
                    {job.workMode}
                  </span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Home;
