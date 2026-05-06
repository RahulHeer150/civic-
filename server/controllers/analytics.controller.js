const Issue = require("../models/issue.model");

// 🔹 SUMMARY CARDS
exports.getSummary = async (req, res) => {
  try {
    const totalIssues = await Issue.countDocuments();
    const pendingIssues = await Issue.countDocuments({ status: "Pending" });
    const resolvedIssues = await Issue.countDocuments({ status: "Resolved" });

    res.json({
      totalIssues,
      pendingIssues,
      resolvedIssues,
    });
  } catch (error) {
    res.status(500).json({ message: "Analytics error" });
  }
};

// 🔹 MONTHLY ISSUES (LINE CHART)
exports.getMonthlyStats = async (req, res) => {
  try {
    const data = await Issue.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Monthly analytics error" });
  }
};

// 🔹 STATUS DISTRIBUTION (PIE)
exports.getStatusStats = async (req, res) => {
  try {
    const data = await Issue.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Status analytics error" });
  }
};


// 🔹 LOCATION BASED ANALYTICS (BAR)
exports.getLocationStats = async (req, res) => {
  try {
    const data = await Issue.aggregate([
      {
        $group: {
          _id: "$location",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Location analytics error" });
  }
};

