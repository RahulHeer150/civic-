import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5001";

// attach token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const AdminExplore = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get(`${API}/issues`, {
          headers: getAuthHeaders(),
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

  const handleDelete = async (issueId, e) => {
    e.preventDefault(); // prevent card click

    if (!window.confirm("Are you sure you want to delete this issue?")) return;

    setDeleting(issueId);

    try {
      await axios.delete(`${API}/issues/${issueId}`, {
        headers: getAuthHeaders(),
      });

      setIssues((prev) => prev.filter((i) => i._id !== issueId));
      toast.success("Issue deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete issue");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ClipLoader size={48} color="#4A90E2" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">
        Admin – Manage Issues
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            {issue.media && (
              <img
                src={`${API}${issue.media}`}
                alt={issue.title}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                {issue.title}
              </h2>

              <p className="text-gray-600 mb-3">
                {issue.description}
              </p>

              <p className="text-sm text-gray-500 mb-3">
                📍 {issue.location?.address || "—"}
              </p>

              {/* ADMIN ACTIONS */}
              <div className="flex gap-3">
                <Link
                  to={`/issues/${issue._id}`}
                  className="flex-1 text-center px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm"
                >
                  View
                </Link>

                <button
                  onClick={(e) => handleDelete(issue._id, e)}
                  disabled={deleting === issue._id}
                  className="flex-1 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm disabled:opacity-60"
                >
                  {deleting === issue._id ? "Deleting..." : "Delete"}
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
