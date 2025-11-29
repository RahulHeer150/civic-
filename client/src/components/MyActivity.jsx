import React from "react";
import { useAuth } from "../context/auth";
import { HashLoader } from "react-spinners";

const MyActivity = () => {
  const { user, issue, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <HashLoader color="#4f46e5" loading={isLoading} size={50} />
      </div>
    );
  }

  // Filter issues for current user
  const userIssues = issue.filter(i => i.userId === user?._id);
  
  const stats = {
    totalIssues: userIssues.length,
    totalVotes: userIssues.reduce((acc, curr) => acc + (curr.votesCount || 0), 0),
    totalSolved: userIssues.filter(i => i.status === 'Solved').length,
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6">My Activity</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 flex flex-col items-center justify-center shadow-sm">
            <h2 className="text-xl font-semibold text-blue-700">Total Issues</h2>
            <p className="text-3xl font-bold mt-2 text-blue-800">{stats.totalIssues}</p>
          </div>

          <div className="bg-green-100 border border-green-300 rounded-lg p-4 flex flex-col items-center justify-center shadow-sm">
            <h2 className="text-xl font-semibold text-green-700">Total Votes</h2>
            <p className="text-3xl font-bold mt-2 text-green-800">{stats.totalVotes}</p>
          </div>

          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 flex flex-col items-center justify-center shadow-sm">
            <h2 className="text-xl font-semibold text-yellow-700">Solved Issues</h2>
            <p className="text-3xl font-bold mt-2 text-yellow-800">{stats.totalSolved}</p>
          </div>  
        </div>

        {/* Posted Issues Section */}
        <h2 className="text-xl font-semibold mb-4">My Posts:</h2>
        <div className="space-y-4">
          {userIssues.map((issue) => (
            <div
              key={issue._id}
              className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
            >
              <h3 className="text-lg font-medium text-gray-800">{issue.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                Status: <span className="font-semibold text-gray-700">{issue.status}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Votes: {issue.votesCount || 0}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MyActivity;