import React, { useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import ForgotPass from "../assets/forgetPass.png";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Please enter your email");

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/users/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Server error. Try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-4 md:pt-20">
      <div className="flex flex-grow flex-col-reverse md:flex-row lg:flex-row w-full max-w-[1160px] pt-16 md:pt-0 mx-auto justify-between items-center mt-[12vh]">
        
        {/* Left Image */}
        <div className="w-full lg:w-1/2 md:w-1/2 flex justify-center items-center">
          <img
            src={ForgotPass}
            alt="forgot password"
            height={350}
            width={500}
            loading="lazy"
            className="max-w-full h-auto hidden md:block lg:block"
          />
        </div>

        {/* Right Form */}
        <div className="w-full lg:w-1/2 md:w-1/2 px-6 lg:px-0 text-black">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 w-full max-w-md mx-auto text-center border-2 rounded-3xl py-10 lg:py-20 px-6 lg:px-10 shadow-2xl bg-white"
          >
            <h1 className="text-4xl font-bold mb-4">Forgot Password</h1>

            <div className="relative w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full rounded-xl border border-gray-300 px-3 py-3 text-sm text-gray-700 shadow-xl outline-none transition-all focus:border-blue-400"
                required
              />
              <label className="absolute left-3 -top-1.5 text-gray-500 text-xs transition-all peer-focus:text-blue-600">
                <FontAwesomeIcon icon={faEnvelope} /> Email
              </label>
            </div>

            <button
              type="submit"
              className={`py-2 px-4 rounded-full mt-4 font-semibold text-white w-1/2 mx-auto bg-gradient-to-r from-blue-700 to-sky-300 transition duration-200 hover:scale-105 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader color="white" size={22} />
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

export default ForgetPassword;
