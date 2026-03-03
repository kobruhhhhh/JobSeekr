"use client";
import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";

function Filters({
  filters,
  setFilters,
  getData,
}: {
  filters: any;
  setFilters: any;
  getData: any;
}) {
  const { mode } = useSelector((state: any) => state.theme);
  const isDark = mode === "dark";

  return (
    <div className="flex gap-3 my-3 items-end">
      <div>
        <span style={{ color: isDark ? "#94a3b8" : "#374151", marginBottom: "8px", display: "block" }}>
          Search Jobs
        </span>
        <input
          type="text"
          value={filters.searchText}
          onChange={(e) =>
            setFilters({ ...filters, searchText: e.target.value })
          }
          placeholder="Search Jobs"
          style={{
            backgroundColor: isDark ? "#1e293b" : "#ffffff",
            color: isDark ? "#f3f4f6" : "#1f2937",
            border: isDark ? "1px solid #334155" : "1px solid #d1d5db",
            padding: "10px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none",
            transition: "all 0.3s ease",
            width: "100%",
          }}
        />
      </div>

      <div>
        <span style={{ color: isDark ? "#94a3b8" : "#374151", marginBottom: "8px", display: "block" }}>
          Location
        </span>
        <select 
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          style={{
            backgroundColor: isDark ? "#1e293b" : "#ffffff",
            color: isDark ? "#f3f4f6" : "#1f2937",
            border: isDark ? "1px solid #334155" : "1px solid #d1d5db",
            padding: "10px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
        >
          <option value="">Select Location</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
        </select>
      </div>

      <Button type="primary" onClick={getData}>
        Filter
      </Button>
    </div>
  );
}

export default Filters;
