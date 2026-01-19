import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const API = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const AdminAnalytics = () => {
  const [summary, setSummary] = useState({});
  const [monthly, setMonthly] = useState([]);
  const [status, setStatus] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/analytics/summary`, { headers: authHeader() })
      .then((res) => setSummary(res.data));

    axios
      .get(`${API}/analytics/monthly`, { headers: authHeader() })
      .then((res) => setMonthly(res.data));

    axios
      .get(`${API}/analytics/status`, { headers: authHeader() })
      .then((res) => setStatus(res.data));

    axios
      .get(`${API}/analytics/locations`, { headers: authHeader() })
      .then((res) => setLocations(res.data));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📊 Admin Analytics</h1>

      {/* 🔹 SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded">
          <h3>Total Issues</h3>
          <p className="text-2xl font-bold">{summary.totalIssues}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <h3>Pending</h3>
          <p className="text-2xl font-bold">{summary.pendingIssues}</p>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <h3>Resolved</h3>
          <p className="text-2xl font-bold">{summary.resolvedIssues}</p>
        </div>
      </div>

      {/* 🔹 CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LINE CHART */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="mb-2 font-semibold">Issues per Month</h3>
          <LineChart width={400} height={250} data={monthly}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Line dataKey="count" stroke="#2563EB" />
          </LineChart>
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="mb-2 font-semibold">Issue Status</h3>
          <PieChart width={400} height={250}>
            <Pie data={status} dataKey="count" nameKey="_id" label>
              {status.map((_, index) => (
                <Cell key={index} fill={index === 0 ? "#F59E0B" : "#10B981"} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-4 rounded shadow col-span-2">
          <h3 className="mb-2 font-semibold">Top Locations</h3>
          <BarChart width={800} height={300} data={locations}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#6366F1" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
