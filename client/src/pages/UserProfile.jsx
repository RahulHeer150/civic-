
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { faUser, faChartLine, faUserGear, faClipboardList, faKey } from "@fortawesome/free-solid-svg-icons";

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
        <div className="px-4 py-4 space-y-4">
          {[
           { icon: faUser, label: "My Profile", link: "/userdashboard" },
    { icon: faChartLine, label: "My Activity", link: "/activity" },
    { icon: faUserGear, label: "Update Profile", link: "/Update_user" },
    { icon: faKey, label: "Forget Password", link: "/Forgot_Password" },
    { icon: faClipboardList, label: "Issues", link: "/all-issues" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <Link
                to={item.link}
                className="flex items-center justify-start px-5 py-3 text-gray-700"
              >
                <FontAwesomeIcon icon={item.icon} className="mr-3 text-gray-600" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Footer / Button */}
        <div className="p-4 border-t border-gray-300 flex justify-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
