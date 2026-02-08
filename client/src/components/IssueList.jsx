import React, { useEffect, useState } from "react";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL || "http://localhost:5001";


const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUserIssues = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Please login to view your issues");
          return;
        }

        const res = await axios.get(`${API}/issues/myissue`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIssues(res.data);
      } catch (error) {
        console.error("IssueList Error:", error);
        toast.error("Failed to load your issues");
      } finally {
        setLoading(false);
      }
    };

    fetchUserIssues();
  }, []);

  /* 🔄 Loader */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <HashLoader color="#4f46e5" size={50} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 px-4 pt-24 sm:pt-28">
      <div className="flex flex-col w-full max-w-[1190px] mx-auto items-center">

        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          My Posted Issues
        </h1>

        <div className="w-full text-black">
          <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto border-2 rounded-3xl py-8 sm:py-12 px-6 sm:px-10 shadow-2xl bg-white">

            {issues.length === 0 ? (
              <p className="text-center text-gray-500">
                You haven’t posted any issues yet.
              </p>
            ) : (
              issues.map((issue) => (
                <div
                  key={issue._id}
                  className="p-4 border-b last:border-b-0"
                >
                  <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                    {issue.title}
                  </h2>

                  <p className="text-gray-700 mb-2">
                    {issue.description}
                  </p>

                  <div className="text-sm text-gray-500 flex flex-col sm:flex-row sm:gap-6">
                    <span>Status: <b>{issue.status}</b></span>
                    <span>Votes: {issue.votesCount || 0}</span>
                    <span>Location: {issue.location || "N/A"}</span>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueList;
