
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5001";

// 🔐 Helper: attach token only if present
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 🔐 Auth check
const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

const Explore = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(new Set());

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get(`${API}/issues`, {
          headers: getAuthHeaders(),
        });
        setIssues(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load issues");
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  // 🔒 SECURED VOTE FUNCTION
  const handleVote = async (issueId, event) => {
    event.preventDefault(); // prevent card navigation

    // ❌ BLOCK UNAUTHENTICATED USERS
    if (!isLoggedIn()) {
      toast.warn("Please login or register to vote on issues");
      return;
    }

    if (voting.has(issueId)) return;

    setVoting((prev) => new Set(prev).add(issueId));

    try {
      const res = await axios.post(
        `${API}/issues/${issueId}/vote`,
        {},
        {
          headers: getAuthHeaders(),
        },
      );

      const newCount = res.data.votesCount ?? 0;

      setIssues((prev) =>
        prev.map((i) =>
          i._id === issueId ? { ...i, votesCount: newCount } : i,
        ),
      );

      toast.success("Vote submitted successfully");
    } catch (err) {
      console.error("Vote failed", err);

      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("Could not submit vote");
      }
    } finally {
      setVoting((prev) => {
        const s = new Set(prev);
        s.delete(issueId);
        return s;
      });
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
      <h1 className="text-3xl font-bold text-center mb-8">Reported Issues</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {issues.map((issue) => (
          <Link
            to={`/issues/${issue._id}`}
            key={issue._id}
            className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition block"
          >
            {issue.media && (
              <img
                src={`${API}${issue.media}`}
                alt={issue.title}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{issue.title}</h2>

              <p className="text-gray-600 mb-3">{issue.description}</p>

              <div className="flex items-center justify-between">
                <button
                  onClick={(e) => handleVote(issue._id, e)}
                  disabled={voting.has(issue._id)}
                  className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm flex items-center gap-2"
                >
                  Vote {issue.votesCount || 0}
                </button>

                <span className="flex items-center gap-1 text-md text-gray-500">
                  <FaMapMarkerAlt className="text-blue-600 text-md" />
                  <span>{issue.location || "—"}</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Explore;
