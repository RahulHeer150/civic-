const mongoose = require("mongoose");
const userModel = require("./user.model");

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Issue title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    media: {
      type: String, // image filename or URL
    },
    votes: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Resolved"],
      default: "Pending", // When user reports issue → default status
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    voters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // fallback counter if you don't want to use voters array
    votesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const IssueModel = mongoose.model("Issue", issueSchema);
module.exports = IssueModel;
