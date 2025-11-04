const Issue = require("../models/issue.model");
const mongoose = require("mongoose");

// 🟢 Add a new issue (auth required)
module.exports.createIssue = async (req, res) => {
  try {
    const { title, description, location, media } = req.body;
    // const userId = req.user?._id;

    if (!title || !description || !location) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newIssue = new Issue({
      title,
      description,
      location,
      media,
      // reportedBy: userId,
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

// module.exports.createIssue = async (req, res) => {
//   try {
//     // ✅ Check what multer parsed
//     console.log("Body:", req.body)

//     // Destructure fields coming from frontend
//     const { type, description, location, date } = req.body;

//     // Validate
//     if (!type || !description || !location || !date) {
//       return res.status(400).json({ message: "All required fields must be filled" });
//     }

//     //const photoPath = req.file ? req.file.path : null;

//     const issue = new Issue({
//       type,
//       description,
//       location,
//       date,
//     });

//     await issue.save();
//     res.status(201).json({ message: "Issue created successfully", issue });
//   } catch (error) {
//     console.error("Error creating issue:", error);
//     res.status(500).json({ message: "Server error while creating issue", error });
//   }
// };

// 🔵 Get all issues (public)
exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 }).lean();
    // ensure votesCount is in response — prefer voters.length if present
    const mapped = issues.map(i => ({
      ...i,
      votesCount: (i.voters ? i.voters.length : i.votesCount) || 0
    }));
    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟣 Get issue by ID (public)
exports.getIssueById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid issue ID" });

    const issue = await IssueModel.findById(id).populate("reportedBy", "username email");
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    res.status(200).json(issue);
  } catch (error) {
    console.error("Error fetching issue:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🟠 Update issue (auth required — only reporter can update)
exports.updateIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const issue = await IssueModel.findById(id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    // only the user who reported the issue can update it
    if (issue.reportedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    Object.assign(issue, updates);
    await issue.save();

    res.status(200).json({
      message: "✅ Issue updated successfully",
      issue,
    });
  } catch (error) {
    console.error("Error updating issue:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🔴 Delete issue (auth required — only reporter can delete)
exports.deleteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await IssueModel.findById(id);

    if (!issue) return res.status(404).json({ message: "Issue not found" });

    // only the user who reported the issue can delete it
    if (issue.reportedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    await issue.deleteOne();

    res.status(200).json({ message: "🗑️ Issue deleted successfully" });
  } catch (error) {
    console.error("Error deleting issue:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🟡 Upvote an issue (auth optional — can make it required if you want)
module.exports.voteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await Issue.findById(id);
    if (!issue) return res.status(404).json({ message: 'Issue not found' });

    issue.votesCount = (issue.votesCount || 0) + 1;
    await issue.save();

    return res.status(200).json({ _id: issue._id, votesCount: issue.votesCount });
  } catch (err) {
    console.error('Vote error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};


// 🔻 Downvote an issue (auth optional)
exports.downvoteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await IssueModel.findById(id);

    if (!issue) return res.status(404).json({ message: "Issue not found" });

    issue.votes = Math.max(0, issue.votes - 1);
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
