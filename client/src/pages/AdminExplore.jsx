import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5001";

// 🔐 helper to attach admin token
const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const AdminExplore = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // 📥 Fetch all issues (admin)
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get(`${API}/issues`, {
          headers: authHeader(),
        });
        setIssues(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load issues");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  // 🗑️ Delete Issue (Admin only)
  const handleDelete = async (issueId, e) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this issue?",
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(issueId);

      const res = await axios.delete(`${API}/issues/${issueId}`, {
        headers: authHeader(),
      });

      if (res.data?.success) {
        setIssues((prev) => prev.filter((i) => i._id !== issueId));
        toast.success(res.data.message || "Issue deleted successfully");
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);

      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please login again.");
      } else if (error.response?.status === 403) {
        toast.error("Access denied. Admin only.");
      } else {
        toast.error(error.response?.data?.message || "Failed to delete issue");
      }
    } finally {
      setDeletingId(null);
    }
  };

  // ⏳ Loader
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ClipLoader size={50} color="#2563EB" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-28">
      <h1 className="text-3xl font-bold text-center mb-8">
        Admin – Manage Issues
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            {/* 📸 Image */}
            {issue.media && (
              <img
                src={`${API}${issue.media}`}
                alt={issue.title}
                className="w-full h-48 object-cover"
              />
            )}

            {/* 📄 Content */}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{issue.title}</h2>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {issue.description}
              </p>

              {/* 📍 Location */}
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                <FaMapMarkerAlt className="text-blue-600 text-sm" />
                <span>{issue.location || "—"}</span>
              </div>

              <p className="text-xs mb-3">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    issue.status === "Resolved"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {issue.status}
                </span>
              </p>

              {/* 🔘 Buttons */}
              <div className="flex gap-3">
                {/* VIEW */}
                <Link
                  to={`/issues/${issue._id}`}
                  className="flex-1 text-center px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                  View
                </Link>

                {/* DELETE (Disabled if Resolved) */}
                <button
                  onClick={(e) => handleDelete(issue._id, e)}
                  disabled={
                    deletingId === issue._id || issue.status === "Resolved"
                  }
                  className={`flex-1 px-3 py-2 rounded-lg text-white 
                    ${
                      issue.status === "Resolved"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }
                    disabled:opacity-60`}
                  title={
                    issue.status === "Resolved"
                      ? "Resolved issues cannot be deleted"
                      : "Delete issue"
                  }
                >
                  {deletingId === issue._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminExplore;
