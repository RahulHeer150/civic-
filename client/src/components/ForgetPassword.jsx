import React, { useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { RotatingLines } from "react-loader-spinner";
import loginImg from '../assets/login.png';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // if (!backendUrl) {
    //   toast.error("Backend URL is not defined. Please check your environment variables.");
    //   setLoading(false);
    //   return;
    // }

    // try {
    //   const response = await fetch(`${backendUrl}/api/auth/forgot-password`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email }),
    //   });

    //   const responseData = await response.json();

    //   if (response.ok) {
    //     toast.success("Password reset link sent! Please check your email.");
    //   } else {
    //     toast.error(responseData.message || "Failed to send password reset email.");
    //   }
    // } catch (error) {
    //   console.error("Forgot password error:", error);
    //   toast.error("An error occurred. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="flex flex-col min-h-screen pt-4 md:pt-20">
      <div className="flex-grow flex flex-col-reverse md:flex-row lg:flex-row w-full max-w-[1160px] pt-16 md:pt-0 lg:pt-0 mx-auto justify-between items-center mt-[12vh]">
        {/* Left side - Image */}
        <div className="w-full lg:w-1/2 md:w-1/2 flex justify-center items-center">
          <img
            src={loginImg} // Add an appropriate image URL if needed
            alt="Forgot Password"
            width={500}
            height={350}
            loading="lazy"
            className="max-w-full h-auto hidden md:block lg:block"
          />
        </div>

        {/* Right side - Forgot Password Form */}
        <div className="w-full lg:w-1/2 md:w-1/2 px-6 lg:px-0 text-black">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full max-w-md mx-auto text-center border-2 rounded-3xl py-10 lg:py-20 px-6 lg:px-10 shadow-2xl bg-white">
            <h1 className="text-4xl font-bold mb-4">Forgot Password</h1>

            <div className="relative h-11 w-full">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                className="shadow-xl peer h-full w-full rounded-xl border border-gray-300 bg-transparent px-3 py-3 text-sm text-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-[#ed1f26] focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent disabled:border-0 disabled:bg-gray-50"
                required
              />
              <label className="pointer-events-none absolute left-3 -top-1.5 flex items-center space-x-2 select-none text-[12px] font-medium leading-tight text-gray-800 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-1.5 peer-focus:text-[12px] peer-focus:text-[#ed1f26]">
                <span><FontAwesomeIcon icon={faEnvelope} /></span><span>Email</span>
              </label>
            </div>

            <button
              type="submit"
              className={`py-2 px-4 rounded-full mt-6 font-medium text-white w-1/2 mx-auto block bg-gradient-to-r from-purple-500 to-red-500 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95${loading ? " opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  />
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
