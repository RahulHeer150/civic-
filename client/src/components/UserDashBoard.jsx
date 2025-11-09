import React from "react";
import Profile from "../assets/profile2.jpg";
import { motion } from "framer-motion";
import { HashLoader } from "react-spinners";
import { FaCity, FaEdit, FaLocationArrow } from "react-icons/fa";
import { useAuth } from "../context/auth";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserDashBoard = () => {
  const { user, isLoading } = useAuth(); // Get user data from context
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <HashLoader color="#4f46e5" loading={isLoading} size={50} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-500 text-xl">Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto px-6 pt-8 md:pt-12 lg:pt-24">
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col lg:flex-row min-h-[70vh] w-full lg:w-5/6 mx-auto mt-20 lg:mt-0">
          {/* Left Section */}
          <div className="bg-gradient-to-br from-blue-700 to-sky-300 p-8 lg:w-1/3 flex flex-col items-center justify-center">
            <img src={Profile} className="w-32 h-32 rounded-full mb-4" alt="" />
            <h2 className="text-white text-3xl font-semibold capitalize">
              {user.username}
            </h2>
            <motion.button
              className="text-white mt-4 px-4 py-2 rounded-full border border-white flex items-center"
              onClick={() => navigate("/Update_user")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEdit className="mr-2" /> Edit Profile
            </motion.button>
          </div>

          {/* Right section */}
          <div className="p-8 pt-8 lg:w-2/3 flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Profile Details</h2>
            <div className="flex flex-col gap-6">
              <ProfileItem
                label="Email"
                value={user.email}
                icon={<FaEnvelope className="text-gray-500" />}
              />
              <ProfileItem
                label="Phone"
                value={user.phone}
                icon={<FaPhone className="text-gray-500" />}
              />
              <ProfileItem
                label="City"
                value={user.city}
                icon={<FaCity className="text-gray-500" />}
              />
              <ProfileItem
                label="State"
                value={user.state}
                icon={<FaLocationArrow className="text-gray-500" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({ label, value, icon }) => (
  <div className="flex items-center">
    {icon}
    <div className="ml-4">
      <p className="text-gray-600">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);
  export default UserDashBoard;

