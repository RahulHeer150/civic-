import React from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaClipboardList,
  FaChartLine,
  FaUserEdit,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../context/auth";

/* -------------------- Helper Components -------------------- */

const SidebarLink = ({ icon, label, to = "#", danger }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
        ${
          danger
            ? "text-red-600 hover:bg-red-50"
            : "text-gray-700 hover:bg-gray-100"
        }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-3xl font-bold mt-1">{value}</h3>
    </div>
  );
};

const ActivityItem = ({ text, status }) => {
  const statusStyle =
    status === "Resolved"
      ? "bg-green-100 text-green-700"
      : status === "Open"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-blue-100 text-blue-700";

  return (
    <li className="flex justify-between items-center border-b pb-2 last:border-none">
      <span className="text-gray-700">{text}</span>
      <span className={`text-xs px-2 py-1 rounded-full ${statusStyle}`}>
        {status}
      </span>
    </li>
  );
};

/* -------------------- Main Component -------------------- */

const UserProfile = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="pt-[96px] md:pt-[112px] text-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-[96px] md:pt-[112px] px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* ---------------- Sidebar ---------------- */}
        <aside className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <h2 className="mt-3 text-lg font-semibold">{user?.username}</h2>
            <p className="text-sm text-gray-500">Citizen</p>
          </div>

          <nav className="space-y-3">
            <SidebarLink icon={<FaUser />} label="Overview" />
            <SidebarLink
              icon={<FaChartLine />}
              label="My Activity"
              to="/activity"
            />
            <SidebarLink
              icon={<FaClipboardList />}
              label="My Issues"
              to="/all-issues"
            />
            <SidebarLink
              icon={<FaUserEdit />}
              label="Update Profile"
              to="/Update_user"
            />
            <SidebarLink
              icon={<FaKey />}
              label="Security"
              to="/Forgot_Password"
            />
            <SidebarLink
              icon={<FaSignOutAlt />}
              label="Logout"
              to="/logout"
              danger
            />
          </nav>
        </aside>

        {/* ---------------- Main Content ---------------- */}
        <main className="md:col-span-3 space-y-6">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome, {user?.username} 👋
              </h1>
              <p className="text-gray-500 mt-1">
                Manage your activity and track civic contributions
              </p>
            </div>

            <Link
              to="/Update_user"
              className="mt-4 md:mt-0 px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
            >
              Edit Profile
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Issues Reported" value="12" />
            <StatCard title="Issues Resolved" value="5" />
            <StatCard title="Votes Given" value="38" />
            <StatCard title="Active Issues" value="3" />
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-3">
              <ActivityItem text="Reported a pothole issue" status="Open" />
              <ActivityItem text="Voted on garbage issue" status="Voted" />
              <ActivityItem text="Issue marked as resolved" status="Resolved" />
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
