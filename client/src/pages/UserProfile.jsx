import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 mt-20">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
        <h1 className="text-4xl font-bold mb-6 text-center">User Profile</h1>
        {/* Header Section */}
        <div className="flex items-center p-4 border-b border-gray-300">
          <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
          <h2 className="text-lg font-semibold">Header Title</h2>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-4">
          <div className="h-12 bg-white border-2 border-gray-200 rounded-lg">
           
            <h1 className="px-3 py-2">
               <span className="pr-2"><FontAwesomeIcon icon={faUser}/></span>
              My Profile</h1>
          </div>
          <div className="h-12 bg-white border-2 border-gray-200 rounded-lg">
            <h1>MY Activity</h1>
          </div>
          <div className="h-12 bg-white border-2 border-gray-200 rounded-lg">
            <h1>Update Profile</h1>
          </div>
          <div className="h-12 bg-white border-2 border-gray-200 rounded-lg">
            <h1>Forget Password</h1>
          </div>
          <div className="h-12 bg-white border-2 border-gray-200 rounded-lg">
            <h1>Issues</h1>
          </div>
        </div>

        {/* Footer / Button */}
        <div className="p-4 border-t border-gray-300 flex justify-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Action
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
