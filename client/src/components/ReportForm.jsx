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

  // ✅ NEW STATES
  const [location, setLocation] = useState(null); // lat/lng
  const [locationText, setLocationText] = useState(""); // display text
  const [showLocationOptions, setShowLocationOptions] = useState(false);

  const [date, setDate] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔒 Protect route
  useEffect(() => {
    if (!isLoggedIn()) {
      toast.warn("Please login or register to report an issue");
      navigate("/login");
    }
  }, [navigate]);

  // ✅ GET CURRENT LOCATION
  const handleUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setLocation({ lat, lng });

        // Show readable text (you can replace with address later)
        setLocationText(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`);

        setShowLocationOptions(false);
        toast.success("Location detected!");
      },
      () => {
        toast.error("Location permission denied");
      }
    );
  };

  // 🔥 SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn()) {
      toast.error("Please login or register to report an issue");
      return;
    }

    // ✅ location validation
    if (!location) {
      toast.error("Please select location");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("latitude", location.lat);
      formData.append("longitude", location.lng);
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
      console.error("Report error:", err);

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

  return (
    <div className="min-h-screen bg-gray-300 p-6 rounded-2xl">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-4 bg-white shadow-md rounded mt-10"
      >
        <h2 className="text-2xl font-bold mb-4">Report an Incident</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Issue Title</label>
          <input
            type="text"
            placeholder="Enter issue title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
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
            required
          ></textarea>
        </div>

        {/* ✅ NEW LOCATION UI */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 mb-2">Location</label>

          <input
            type="text"
            value={locationText}
            placeholder="Click to use current location"
            onFocus={() => setShowLocationOptions(true)}
            readOnly
            className="w-full p-2 border border-gray-300 rounded cursor-pointer"
          />

          {showLocationOptions && (
            <div className="absolute w-full bg-white border mt-1 rounded shadow z-10">
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="w-full text-left px-3 py-2 hover:bg-gray-100"
              >
                📍 Use my current location
              </button>
            </div>
          )}
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Photo */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Photo (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-gray-500" : "bg-blue-500 hover:bg-black"
          } text-white p-2 rounded`}
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
};

export default ReportForm;