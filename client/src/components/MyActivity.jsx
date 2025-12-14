import React, { useEffect, useState } from "react";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL || "http://localhost:5001";

const MyActivity = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyIssues = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${API}/issues/myissue`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIssues(res.data);
      } catch (error) {
        console.error("MyActivity Error:", error);
        toast.error("Failed to load your activity");
      } finally {
        setLoading(false);
      }
    };

    fetchMyIssues();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <HashLoader color="#4f46e5" size={50} />
      </div>
    );
  }

  const stats = {
    totalIssues: issues.length,
    totalVotes: issues.reduce((acc, curr) => acc + (curr.votesCount || 0), 0),
    totalSolved: issues.filter((i) => i.status === "Resolved").length,
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-6">

        <h1 className="text-2xl font-bold mb-6">My Activity</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard title="Total Issues" value={stats.totalIssues} color="blue" />
          <StatCard title="Total Votes" value={stats.totalVotes} color="green" />
          <StatCard title="Resolved Issues" value={stats.totalSolved} color="yellow" />
        </div>

        {/* Issues */}
        <h2 className="text-xl font-semibold mb-4">My Reported Issues</h2>

        {issues.length === 0 ? (
          <p className="text-gray-500 text-center">
            You haven’t reported any issues yet.
          </p>
        ) : (
          <div className="space-y-4">
            {issues.map((issue) => (
              <div
                key={issue._id}
                className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
              >
                <h3 className="text-lg font-medium text-gray-800">
                  {issue.title}
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Status:{" "}
                  <span className="font-semibold">
                    {issue.status}
                  </span>
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Votes: {issue.votesCount || 0}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Location: {issue.location?.address || "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  const colors = {
    blue: "bg-blue-100 border-blue-300 text-blue-700",
    green: "bg-green-100 border-green-300 text-green-700",
    yellow: "bg-yellow-100 border-yellow-300 text-yellow-700",
  };

  return (
    <div className={`${colors[color]} border rounded-lg p-4 flex flex-col items-center shadow-sm`}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default MyActivity;
