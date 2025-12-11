

// // 🟢 Add a new issue (auth required)
// module.exports.createIssue = async (req, res) => {
//   try {
//     const { title, description, location, media } = req.body;
//     // const userId = req.user?._id;

//     if (!title || !description || !location) {
//       return res.status(400).json({ message: "All required fields must be filled" });
//     }

//     const newIssue = new Issue({
//       title,
//       description,
//       location,
//       media,
//       // reportedBy: userId,
//     });

//     const savedIssue = await newIssue.save();

//     res.status(201).json({
//       message: "✅ Issue created successfully",
//       issue: savedIssue,
//     });
//   } catch (error) {
//     console.error("Error creating issue:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


const Issue = require('../models/issue.model');
const issueService = require('../services/issue.service');
const mongoose = require('mongoose');
const getAddressFromCoordinates=require('../services/maps.service')

// GET /issues
module.exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    console.error('Error fetching issues:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /issues/create
// module.exports.createIssue = async (req, res) => {
//   try {
//     const { title, description, location, date } = req.body;
//     const mediaPath = req.file ? `/uploads/${req.file.filename}` : null;

//     if (!title) {
//       return res.status(400).json({ message: 'Title is required' });
//     }

//     const issue = new Issue({
//       title,
//       description: description || '',
//       location: location || '',
//       date: date ? new Date(date) : undefined,
//       photo: mediaPath || null,
//       votesCount: 0
//     });

//     await issue.save();
//      res.status(201).json({
//       message: "✅ Issue created successfully",
//       issue: issue,
//     });
//   } catch (err) {
//     console.error('Error creating issue:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
module.exports.createIssue = async (req, res) => {
  try {
    const { title, description, location } = req.body;

    // multer sets req.file when media is uploaded
    const mediaPath = req.file ? `/uploads/${req.file.filename}` : null;

    // auth middleware sets req.user
    //const reportedBy = req.user?._id;

    console.log('Creating issue:', { title, description, location, mediaPath});

  console.log('Headers content-type:', req.headers['content-type']);
console.log('req.file:', req.file);
console.log('req.body raw:', req.body);

    const issue = await issueService.createIssue({
      title,
      description,
      location,
      media: mediaPath,
    });

    res.status(201).json({
      message: "✅ Issue created successfully",
      issue: issue,
    });
  } catch (err) {
    console.error('Error creating issue:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

module.exports.getIssueById = async (req, res) => {
  try {
    const { id } = req.params;

    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.status(200).json(issue);
  } catch (error) {
    console.error("Error fetching issue:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



// POST /issues/:id/vote
module.exports.voteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await Issue.findById(id);
    if (!issue) return res.status(404).json({ message: 'Issue not found' });

    issue.votesCount = (issue.votesCount || 0) + 1;
    await issue.save();

    res.json({ _id: issue._id, votesCount: issue.votesCount });
  } catch (err) {
    console.error('Error voting on issue:', err);
    res.status(500).json({ message: 'Server error' });
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
// exports.getIssues = async (req, res) => {
//   try {
//     const issues = await Issue.find().sort({ createdAt: -1 }).lean();
//     // ensure votesCount is in response — prefer voters.length if present
//     const mapped = issues.map(i => ({
//       ...i,
//       votesCount: (i.voters ? i.voters.length : i.votesCount) || 0
//     }));
//     res.json(mapped);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // 🟣 Get issue by ID (public)
// exports.getIssueById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id))
//       return res.status(400).json({ message: "Invalid issue ID" });

//     const issue = await IssueModel.findById(id).populate("reportedBy", "username email");
//     if (!issue) return res.status(404).json({ message: "Issue not found" });

//     res.status(200).json(issue);
//   } catch (error) {
//     console.error("Error fetching issue:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

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
// module.exports.voteIssue = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const issue = await Issue.findById(id);
//     if (!issue) return res.status(404).json({ message: 'Issue not found' });

//     issue.votesCount = (issue.votesCount || 0) + 1;
//     await issue.save();

//     return res.status(200).json({ _id: issue._id, votesCount: issue.votesCount });
//   } catch (err) {
//     console.error('Vote error:', err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };


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

// 🟢 Resolve an issue (Admin only)
module.exports.resolveIssue = async (req, res) => {
  try {
    const { id } = req.params;

    // Find issue
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // Update status
    issue.status = "Resolved";
    await issue.save();

    res.status(200).json({
      message: "✅ Issue marked as resolved",
      issue,
    });
  } catch (error) {
    console.error("Error resolving issue:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

