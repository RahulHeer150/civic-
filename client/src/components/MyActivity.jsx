import React from "react";

const MyActivity = () => {
  // Example data (you can replace these with API data or props)
  const stats = {
    totalIssues: 12,
    totalVotes: 45,
    totalSolved: 8,
  };

  const issues = [
    { id: 1, title: "Road damage near school", status: "Pending" },
    { id: 2, title: "Streetlight not working", status: "Solved" },
    { id: 3, title: "Garbage collection delay", status: "In Progress" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6">My Activity</h1>

        {/* Top Stats Section */}
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
        <h2 className="text-xl font-semibold mb-4">Posts:</h2>
        <div className="space-y-4">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
            >
              <h3 className="text-lg font-medium text-gray-800">{issue.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                Status: <span className="font-semibold text-gray-700">{issue.status}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyActivity;
