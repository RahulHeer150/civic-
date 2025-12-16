
const Issue = require('../models/issue.model');
const issueService = require('../services/issue.service');
const mongoose = require('mongoose');
const path = require("path");
const fs=require("fs")
const { sendEmail } = require("../services/email.service");
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

module.exports.getMyIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ reportedBy: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /issues/create


// module.exports.createIssue = async (req, res) => {
//   try {
//     const { title, description, location } = req.body;

//     if (!title || !description || !location) {
//       return res.status(400).json({
//         message: "Title, description and location are required",
//       });
//     }

//     // Expect frontend to send: "lat,lng"
//     const [lat, lng] = location.split(",").map(Number);

//     if (isNaN(lat) || isNaN(lng)) {
//       return res.status(400).json({
//         message: "Invalid location format. Use 'lat,lng'",
//       });
//     }

//     // ✅ Get full address object
//     const geo = await getAddressFromCoordinates(lat, lng);

//     // Media upload
//     const mediaPath = req.file ? `/uploads/${req.file.filename}` : null;

//     const issue = await Issue.create({
//       title,
//       description,
//       location: {
//         type: "Point",
//         coordinates: [lng, lat],
//         address: geo.address,
//       },
//       media: mediaPath,
//       reportedBy: req.user?._id, // REQUIRED for MyActivity
//     });

//     return res.status(201).json({
//       message: "Issue created successfully",
//       issue,
//     });

//   } catch (error) {
//     console.error("Create Issue Error:", error);
//     return res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
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
    reportedBy: req.user?._id,
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

module.exports.deleteIssue = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ MUST populate reportedBy for email
    const issue = await Issue.findById(id).populate(
      "reportedBy",
      "email username name"
    );

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    /* ===============================
       🗑️ DELETE MEDIA FILE (SAFE)
    =============================== */
    if (issue.media) {
      const filename = path.basename(issue.media);
      const filePath = path.join(process.cwd(), "uploads", filename);

      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log("🗑️ Media deleted:", filePath);
        } else {
          console.warn("⚠️ Media not found:", filePath);
        }
      } catch (fileErr) {
        console.error("❌ Media delete error:", fileErr.message);
      }
    }

    /* ===============================
       📧 EMAIL NOTIFICATION (SAME LOGIC AS resolveIssue)
    =============================== */
    if (!issue.reportedBy?.email) {
      console.error("❌ User email not found, skipping email");
    } else {
      console.log("📧 Sending delete email to:", issue.reportedBy.email);

      try {
        await sendEmail({
          to: issue.reportedBy.email,
          subject: "Your issue has been removed | CivicPlus",
          html: `
            <h2>Issue Removed ❌</h2>
            <p>Hello <b>${issue.reportedBy.name || issue.reportedBy.username || "User"}</b>,</p>
            <p>Your reported issue titled <b>"${issue.title}"</b> has been removed by the administrator.</p>
            <p>If you believe this was a mistake, you may contact the support team.</p>
            <br/>
            <p>– CivicPlus Team</p>
          `,
        });

        console.log("✅ Delete email sent successfully");
      } catch (mailError) {
        console.error("❌ Email send failed:", mailError.message);
      }
    }

    /* ===============================
       🗑️ DELETE ISSUE FROM DB
    =============================== */
    await Issue.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Issue deleted permanently and user notified",
    });

  } catch (error) {
    console.error("❌ Delete Issue Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};




// module.exports.deleteIssue = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const issue = await Issue.findById(id);
//     if (!issue) {
//       return res.status(404).json({ message: "Issue not found" });
//     }

//     await issue.deleteOne();

//     return res.status(200).json({
//       success: true,
//       message: "Issue deleted successfully",
//     });

//   } catch (error) {
//     console.error("Delete Issue Error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };


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
const User = require("../models/user.model");

module.exports.resolveIssue = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ MUST populate reportedBy
    const issue = await Issue.findById(id).populate(
      "reportedBy",
      "email name"
    );

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // 🔍 DEBUG (TEMPORARY)
    console.log("Reported By:", issue.reportedBy);

    if (issue.status === "Resolved") {
      return res.status(400).json({ message: "Issue already resolved" });
    }

    // ✅ Update status
    issue.status = "Resolved";
    await issue.save();

    // ✅ Email logic
    if (!issue.reportedBy?.email) {
      console.error("❌ User email not found");
    } else {
      console.log("📧 Sending email to:", issue.reportedBy.email);

      try {
        await sendEmail({
          to: issue.reportedBy.email,
          subject: "Your issue has been resolved | CivicPlus",
          html: `
            <h2>Issue Resolved ✅</h2>
            <p>Hello ${issue.reportedBy.name || "User"},</p>
            <p>Your reported issue <b>${issue.title}</b> has been resolved.</p>
            <p><b>Location:</b> ${issue.location}</p>
            <p>Thank you for contributing to CivicPlus.</p>
            <br/>
            <p>– CivicPlus Team</p>
          `,
        });

        console.log("✅ Email sent successfully");
      } catch (mailError) {
        console.error("❌ Email send failed:", mailError);
      }
    }

    // ✅ Send response LAST
    res.status(200).json({
      message: "Issue resolved and email process completed",
    });

  } catch (error) {
    console.error("Resolve Issue Error:", error);
    res.status(500).json({ message: "Failed to resolve issue" });
  }
};

