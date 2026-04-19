import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5001";

// 🔐 Auth helper
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const isLoggedIn = () => !!localStorage.getItem("token");

const Explore = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(new Set());

  useEffect(() => {
    fetchIssues();
  }, []);

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

  // 🔥 Nearby Issues (5km)
  const handleNearby = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          const res = await axios.get(
            `${API}/issues/nearby?lat=${lat}&lng=${lng}`
          );
          setIssues(res.data);
          toast.success("Showing nearby issues (5km)");
        } catch (err) {
          console.error(err);
          toast.error("Failed to fetch nearby issues");
        }
      },
      () => {
        toast.error("Location permission denied");
      }
    );
  };

  // 🔒 Vote
  const handleVote = async (issueId, e) => {
    e.preventDefault();

    if (!isLoggedIn()) {
      toast.warn("Please login to vote");
      return;
    }

    if (voting.has(issueId)) return;

    setVoting((prev) => new Set(prev).add(issueId));

    try {
      const res = await axios.post(
        `${API}/issues/${issueId}/vote`,
        {},
        { headers: getAuthHeaders() }
      );

      const newCount = res.data.votesCount ?? 0;

      setIssues((prev) =>
        prev.map((i) =>
          i._id === issueId ? { ...i, votesCount: newCount } : i
        )
      );

      toast.success("Vote submitted");
    } catch (err) {
      console.error(err);
      toast.error("Vote failed");
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
      <h1 className="text-3xl font-bold text-center mb-6">
        Reported Issues
      </h1>

      {/* 🔥 Nearby Button */}
      <div className="text-center mb-6">
        <button
          onClick={handleNearby}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          📍 Show Nearby Issues (5km)
        </button>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {issues.map((issue) => {
          const lat = issue.location?.coordinates?.[1];
          const lng = issue.location?.coordinates?.[0];

          return (
            <Link
              to={`/issues/${issue._id}`}
              key={issue._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition block overflow-hidden"
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

                <div className="flex items-center justify-between gap-2 flex-wrap">
                  {/* Vote */}
                  <button
                    onClick={(e) => handleVote(issue._id, e)}
                    disabled={voting.has(issue._id)}
                    className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
                  >
                    Vote {issue.votesCount || 0}
                  </button>

                  {/* View on Map */}
                  {lat && lng && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(
                          `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=18/${lat}/${lng}`,
                          "_blank"
                        );
                      }}
                      className="px-3 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-sm"
                    >
                      View on Map
                    </button>
                  )}

                  {/* Location */}
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <FaMapMarkerAlt className="text-blue-600" />
                    <span>
                      {issue.location?.address
                        ? issue.location.address
                        : lat && lng
                        ? `${lat.toFixed(3)}, ${lng.toFixed(3)}`
                        : "—"}
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Explore;