import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// 🔐 Auth helper
const isLoggedIn = () => !!localStorage.getItem("token");

const ReportForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔒 Protect direct access
  useEffect(() => {
    if (!isLoggedIn()) {
      toast.warn("Please login or register to report an issue");
      navigate("/login");
    }
  }, [navigate]);

  // 🔒 Submit handler (UNCHANGED)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn()) {
      toast.error("Please login or register to report an issue");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("date", date);
      if (photo) formData.append("media", photo);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/issues/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Issue reported successfully!");
      navigate("/explore");
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else {
        toast.error(err.response?.data?.message || "Failed to submit report");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Progress calculation (UI only)
  const totalSteps = 5;
  const completedSteps =
    (title ? 1 : 0) +
    (description ? 1 : 0) +
    (location ? 1 : 0) +
    (date ? 1 : 0) +
    (photo ? 1 : 0);

  const progressPercentage = Math.round(
    (completedSteps / totalSteps) * 100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-20 px-4 pb-40">
      <div className="max-w-5xl mx-auto flex gap-6">

        {/* 🟢 LEFT VERTICAL PROGRESS BAR */}
        <div className="relative w-6 flex justify-center">
          <div className="sticky top-32 h-[420px] w-2 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="absolute bottom-0 w-full bg-green-500 transition-all duration-500"
              style={{ height: `${progressPercentage}%` }}
            />
          </div>
          <span className="absolute -left-6 top-32 text-sm font-bold text-green-600 rotate-[-90deg]">
            {progressPercentage}%
          </span>
        </div>

        {/* 📄 FORM CONTENT */}
        <div className="flex-1">
          {/* HEADER */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              Report an Issue
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Complete each section below to submit your issue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ISSUE TITLE */}
            <div className={`bg-white rounded-2xl shadow-md p-6 border-l-4 ${
              title ? "border-green-500" : "border-gray-300"
            }`}>
              <label className="block font-semibold mb-2">Issue Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* DESCRIPTION */}
            <div className={`bg-white rounded-2xl shadow-md p-6 border-l-4 ${
              description ? "border-green-500" : "border-gray-300"
            }`}>
              <label className="block font-semibold mb-2">Description</label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* LOCATION */}
            <div className={`bg-white rounded-2xl shadow-md p-6 border-l-4 ${
              location ? "border-green-500" : "border-gray-300"
            }`}>
              <label className="block font-semibold mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* DATE */}
            <div className={`bg-white rounded-2xl shadow-md p-6 border-l-4 ${
              date ? "border-green-500" : "border-gray-300"
            }`}>
              <label className="block font-semibold mb-2">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* PHOTO */}
            <div className={`bg-white rounded-2xl shadow-md p-6 border-l-4 ${
              photo ? "border-green-500" : "border-gray-300"
            }`}>
              <label className="block font-semibold mb-2">
                Upload Photo (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="w-full border rounded-xl p-3"
              />
            </div>
          </form>
        </div>
      </div>

      {/* 🔵 FIXED SUBMIT BUTTON (NO OVERFLOW) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4">
        <button
          type="submit"
          form="report-form"
          disabled={loading}
          onClick={handleSubmit}
          className={`w-full py-4 rounded-2xl text-lg font-semibold text-white shadow-lg transition-all
            ${
              loading
                ? "bg-gray-400"
                : "bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-[1.02]"
            }
          `}
        >
          {loading ? "Submitting..." : "Submit Issue"}
        </button>
      </div>
    </div>
  );
};

export default ReportForm;
