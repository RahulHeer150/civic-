import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
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
    e.preventDefault(); // prevent card click
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this issue?"
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(issueId);

      await axios.delete(`${API}/issues/${issueId}`, {
        headers: authHeader(),
      });

      // Remove from UI
      setIssues((prev) => prev.filter((i) => i._id !== issueId));
      toast.success("Issue deleted successfully");

    } catch (error) {
      console.error(error);
      toast.error("Delete failed (Admin only)");
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
    <div className="min-h-screen bg-gray-100 p-6">
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
              <h2 className="text-xl font-semibold mb-1">
                {issue.title}
              </h2>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {issue.description}
              </p>

              <p className="text-xs text-gray-500 mb-2">
                📍 {issue.location?.address || "Unknown location"}
              </p>

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

                {/* DELETE */}
                <button
                  onClick={(e) => handleDelete(issue._id, e)}
                  disabled={deletingId === issue._id}
                  className="flex-1 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-60"
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
