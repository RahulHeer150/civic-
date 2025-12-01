import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import ResetImg from "../assets/resetp.png";

const ResetPassword = () => {
  const { token } = useParams();  // <-- Get token from URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5001/users/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        return toast.error(data.message || "Failed to reset password");
      }

      toast.success("Password reset successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      toast.error("Server error. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-4 md:pt-20">
      <div className="flex flex-grow flex-col-reverse md:flex-row w-full max-w-[1190px] pt-16 mx-auto justify-between items-center">
        
        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={ResetImg} alt="Reset" className="max-w-full hidden md:block" />
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 px-6 lg:px-0">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 w-full max-w-md mx-auto text-center border-2 rounded-3xl py-10 lg:py-20 px-6 shadow-xl bg-white"
          >
            <h1 className="text-3xl font-bold">Reset Password</h1>

            {/* New Password */}
            <div className="relative">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="peer w-full border p-3 rounded-xl shadow"
                required
              />
              <label className="absolute left-3 -top-1 text-sm text-gray-600 peer-focus:text-red-500">
                <FontAwesomeIcon icon={faLock} /> New Password
              </label>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="peer w-full border p-3 rounded-xl shadow"
                required
              />
              <label className="absolute left-3 -top-1 text-sm text-gray-600 peer-focus:text-red-500">
                <FontAwesomeIcon icon={faLock} /> Confirm Password
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="py-2 px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full hover:scale-105 transition"
            >
              {loading ? (
                <ClipLoader size={22} color="#fff" />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
