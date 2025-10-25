const Issue = require("../models/issueModel");
const mongoose = require("mongoose");

// 🟢 Add a new issue
exports.createIssue = async (req, res) => {
  try {
    const { title, description, location, category, media } = req.body;
    const userId = req.user ? req.user._id : null; // assuming you use auth middleware

    if (!title || !description || !location) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newIssue = new Issue({
      title,
      description,
      location,
      category,
      media,
      reportedBy: userId,
    });

    const savedIssue = await newIssue.save();
    res.status(201).json({
      message: "✅ Issue created successfully",
      issue: savedIssue,
    });
  } catch (error) {
    console.error("Error creating issue:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🔵 Get all issues
exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate("reportedBy", "username email");
    res.status(200).json(issues);
  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🟣 Get issue by ID
exports.getIssueById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid issue ID" });

    const issue = await Issue.findById(id).populate("reportedBy", "username email");
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    res.status(200).json(issue);
  } catch (error) {
    console.error("Error fetching issue:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🟠 Update an issue
exports.updateIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedIssue = await Issue.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedIssue) return res.status(404).json({ message: "Issue not found" });

    res.status(200).json({
      message: "✅ Issue updated successfully",
      issue: updatedIssue,
    });
  } catch (error) {
    console.error("Error updating issue:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🔴 Delete an issue
exports.deleteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Issue.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Issue not found" });

    res.status(200).json({ message: "🗑️ Issue deleted successfully" });
  } catch (error) {
    console.error("Error deleting issue:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🟡 Upvote an issue
exports.upvoteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await Issue.findById(id);

    if (!issue) return res.status(404).json({ message: "Issue not found" });

    issue.votes += 1;
    await issue.save();

    res.status(200).json({
      message: "👍 Issue upvoted successfully",
      votes: issue.votes,
    });
  } catch (error) {
    console.error("Error upvoting issue:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🔻 Downvote an issue
exports.downvoteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await Issue.findById(id);

    if (!issue) return res.status(404).json({ message: "Issue not found" });

    issue.votes = Math.max(0, issue.votes - 1); // prevent negative votes
    await issue.save();

    res.status(200).json({
      message: "👎 Issue downvoted successfully",
      votes: issue.votes,
    });
  } catch (error) {
    console.error("Error downvoting issue:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
