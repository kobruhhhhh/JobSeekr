"use client";
import React from "react";
import PageTitle from "@/components/PageTitle";
import { Empty, Button, Card, Row, Col, App } from "antd";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetLoading } from "@/redux/loadersSlice";

function SavedJobs() {
    const { message } = App.useApp();
    const { currentUser } = useSelector((state: any) => state.users);
    const { mode } = useSelector((state: any) => state.theme);
    const isDark = mode === "dark";
    const [savedJobs, setSavedJobs] = React.useState<any[]>([]);
    const router = useRouter();
    const dispatch = useDispatch();

    const fetchSavedJobs = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.get('/api/users/savedjobs');
            setSavedJobs(response.data.data);
        } catch (error: any) {
            message.error(error.response?.data?.message || error.message);
        } finally {
            dispatch(SetLoading(false));
        }
    };

    React.useEffect(() => {
        if (currentUser?._id) {
            fetchSavedJobs();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser?._id]);

    const onUnsave = async (jobId: string) => {
        try {
            dispatch(SetLoading(true));
            await axios.delete(`/api/users/savedjobs?jobId=${jobId}`);
            message.success('Job removed from saved list');
            // Refresh the list
            fetchSavedJobs();
        } catch (error: any) {
            message.error(error.response?.data?.message || error.message);
        } finally {
            dispatch(SetLoading(false));
        }
    };

    return (
        <div>
            <PageTitle title="Saved Jobs" />

            {savedJobs.length === 0 ? (
                <Empty
                    description="No saved jobs yet"
                    style={{ marginTop: "50px" }}
                >
                    <Button type="primary" onClick={() => router.push("/")}>
                        Browse Jobs
                    </Button>
                </Empty>
            ) : (
                <Row gutter={[16, 16]}>
                    {savedJobs.map((job: any) => (
                        <Col xs={24} sm={12} lg={8} key={job._id}>
                            <Card
                                hoverable
                                style={{
                                    backgroundColor: isDark ? "#1e293b" : "#ffffff",
                                    borderColor: isDark ? "#334155" : "#e5e7eb",
                                    height: "100%",
                                }}
                                bodyStyle={{
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "100%",
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <h3 style={{
                                        fontSize: "18px",
                                        fontWeight: "600",
                                        marginBottom: "12px",
                                        color: isDark ? "#f3f4f6" : "#1f2937",
                                    }}>
                                        {job.title}
                                    </h3>

                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "8px",
                                        marginBottom: "16px",
                                    }}>
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            color: isDark ? "#94a3b8" : "#6b7280",
                                            fontSize: "14px",
                                        }}>
                                            <i className="ri-building-line"></i>
                                            <span>{job.user?.name || "Company"}</span>
                                        </div>

                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            color: isDark ? "#94a3b8" : "#6b7280",
                                            fontSize: "14px",
                                        }}>
                                            <i className="ri-map-pin-line"></i>
                                            <span>{job.location}</span>
                                        </div>

                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            color: isDark ? "#94a3b8" : "#6b7280",
                                            fontSize: "14px",
                                        }}>
                                            <i className="ri-money-dollar-circle-line"></i>
                                            <span>{job.salaryFromRange} - {job.salaryToRange} LPA</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{
                                    display: "flex",
                                    gap: "8px",
                                    marginTop: "auto",
                                }}>
                                    <Button
                                        type="primary"
                                        block
                                        onClick={() => router.push(`/jobinfo/${job._id}`)}
                                    >
                                        View Details
                                    </Button>
                                    <Button
                                        danger
                                        icon={<i className="ri-bookmark-fill"></i>}
                                        onClick={() => onUnsave(job._id)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}

export default SavedJobs;
