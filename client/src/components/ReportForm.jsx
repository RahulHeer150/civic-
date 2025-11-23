import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ReportForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("date", date);
      if (photo) formData.append("photo", photo);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/issues/create`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        toast.success("Issue reported successfully!");
        navigate("/explore");
      }
    } catch (error) {
      console.error("Report error:", error);
      toast.error(error.response?.data?.message || "Failed to submit report");
    } finally {
      setLoading(false);
      setTitle("");
      setDescription("");
      setLocation("");
      setDate("");
      setPhoto(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 p-6 rounded-2xl">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-4 bg-white shadow-md rounded mt-10"
      >
        <h2 className="text-2xl font-bold mb-4">Report an Incident</h2>

        {/* Title Input (User-defined issue name) */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Issue Title</label>
          <input
            type="text"
            placeholder="Enter issue title (e.g., Road damage, Street light not working...)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="3"
          ></textarea>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter exact location"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Photo Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Photo (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          } text-white p-2 rounded`}
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
