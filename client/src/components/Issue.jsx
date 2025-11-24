import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const API = import.meta.env.VITE_API_URL ?? "http://localhost:5001";

export default function Issue() {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    const fetchIssue = async () => {
      const res = await axios.get(`${API}/issues/${id}`);
      setIssue(res.data);
    };
    fetchIssue();
  }, [id]);

  if (!issue) return <h1>Loading...</h1>;

  return (
    <div className="min-h-screen p-8 bg-gray-100 mt-20">
      <div className="max-w-3xl mx-auto bg-white shadow rounded p-6">
        {issue.media && (
          <img
            src={`${API}${issue.media}`}
            alt={issue.title}
            className="w-full h-64 object-cover rounded mb-4"
          />
        )}

        <h1 className="text-3xl font-bold mb-3">{issue.title}</h1>
        <p className="text-gray-700 mb-4">{issue.description}</p>

        <p className="text-gray-500">📍 Location: {issue.location}</p>
      </div>
    </div>
  );
}
