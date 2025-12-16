import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaMapMarkerAlt, FaArrowLeft, FaThumbsUp } from "react-icons/fa";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5001";

// ✅ Helper: attach token only if present
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function Issue() {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);

  // 🔹 Fetch single issue
  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await axios.get(`${API}/issues/${id}`, {
          headers: getAuthHeaders(),
        });
        setIssue(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load issue");
      } finally {
        setLoading(false);
      }
    };
    fetchIssue();
  }, [id]);

  // 🔹 Vote handler
  const handleVote = async () => {
    if (voting) return;

    setVoting(true);
    try {
      const res = await axios.post(
        `${API}/issues/${id}/vote`,
        {},
        { headers: getAuthHeaders() }
      );

      setIssue((prev) => ({
        ...prev,
        votesCount: res.data.votesCount,
      }));

      toast.success("Vote submitted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Could not submit vote");
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Issue not found
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100 mt-20">
      <div className="max-w-3xl mx-auto bg-white shadow rounded p-6">
        {/* 🖼️ Image */}
        {issue.media && (
          <img
            src={`${API}${issue.media}`}
            alt={issue.title}
            className="w-full h-64 object-cover rounded mb-5"
          />
        )}

        {/* 📝 Title */}
        <h1 className="text-3xl font-bold mb-2">{issue.title}</h1>

        {/* 📍 Location with icon */}
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
          <FaMapMarkerAlt className="text-blue-600 text-sm" />
          <span>{issue.location || "—"}</span>
        </div>

        {/* 📄 Description */}
        <p className="text-gray-700 mb-6">{issue.description}</p>

        {/* 🔘 Action Buttons */}
        <div className="flex flex-wrap gap-4">
          {/* 🔙 Back Button */}
          <Link
            to="/explore"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium transition"
          >
            <FaArrowLeft />
            Back to Explore
          </Link>

          {/* 👍 Vote Button */}
          <button
            onClick={handleVote}
            disabled={voting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition disabled:opacity-60"
          >
            <FaThumbsUp />
            Vote {issue.votesCount || 0}
          </button>
        </div>
      </div>
    </div>
  );
}
