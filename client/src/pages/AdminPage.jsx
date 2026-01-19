import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminPage = () => {
  const [issues, setIssues] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // all, pending, resolved

  // Fetch all issues
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get("http://localhost:5001/issues");
        setIssues(res.data);
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    fetchIssues();
  }, []);

  // Resolve issue (✅ FIXED)
  const handleResolve = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Admin login required");
        return;
      }

      const res = await axios.put(
        `http://localhost:5001/issues/${id}/resolve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Update UI immediately
      setIssues((prev) =>
        prev.map((issue) =>
          issue._id === id ? { ...issue, status: "Resolved" } : issue,
        ),
      );

      console.log(res.data.message);
    } catch (error) {
      console.error(
        "Error resolving issue:",
        error.response?.data || error.message,
      );
    }
  };

  // Filter logic
  const filteredIssues =
    activeTab === "all"
      ? issues
      : activeTab === "pending"
        ? issues.filter((i) => i.status === "Pending")
        : issues.filter((i) => i.status === "Resolved");

  return (
    <div className="max-w-screen min-h-screen mx-10 mt-20 p-5 bg-gray-300 rounded-xl items-center justify-center pb-20">
      {/* ---------- TOP TAB MENU ---------- */}
      <div className="flex justify-center space-x-10 mb-6 text-xl font-semibold">
        <button
          className={`${activeTab === "all" ? "underline" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All Issues
        </button>

        <button
          className={`${activeTab === "resolved" ? "underline" : ""}`}
          onClick={() => setActiveTab("resolved")}
        >
          Resolved Issues
        </button>

        <button
          className={`${activeTab === "pending" ? "underline" : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Issues
        </button>
      </div>

      {/* ---------- SECTION TITLE ---------- */}
      <h1 className="font-bold text-gray-800 text-4xl text-center py-5">
        {activeTab === "all"
          ? "ALL Reported Issues"
          : activeTab === "pending"
            ? "Pending Issues"
            : "Resolved Issues"}
      </h1>

      {/* ---------- ISSUE LIST ---------- */}
      {filteredIssues.map((issue) => (
        <div
          key={issue._id}
          className="w-full p-5 border-2 border-gray-500 rounded-xl flex mb-6 bg-white shadow-md"
        >
          <div className="w-1/2 px-5 py-3 flex h-15 bg-white rounded-xl">
            <div className="h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center text-white">
              Img
            </div>

            <div>
              <h1 className="px-5 text-xl">{issue.title}</h1>
              <p className="px-5 text-sm text-gray-600">
                Status:{" "}
                <span
                  className={
                    issue.status === "Resolved"
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {issue.status}
                </span>
              </p>
            </div>
          </div>

          <div className="w-1/2 px-10 py-4 justify-end items-end mx-20 flex gap-4">
            <button
              onClick={() => handleResolve(issue._id)}
              disabled={issue.status === "Resolved"}
              className={`h-10 px-10 py-3 text-lg text-white font-semibold rounded-xl ${
                issue.status === "Resolved"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-400"
              }`}
            >
              {issue.status === "Resolved" ? "Resolved" : "Resolve"}
            </button>

            <Link
              to={`/issues/${issue._id}`}
              className="bg-gray-400 h-10 px-10 py-3 text-lg text-white font-semibold rounded-xl"
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
