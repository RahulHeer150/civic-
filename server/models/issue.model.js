const mongoose = require("mongoose");

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
    },
    media: {
      type: String, // image filename or URL
    },
    votes: {
      type: Number,
      default: 0,
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    voters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // fallback counter if you don't want to use voters array
    votesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const IssueModel = mongoose.model("Issue", issueSchema);
module.exports = IssueModel;
