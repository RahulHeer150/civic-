const mongoose=require('mongoose')

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
    category: {
      type: String,
      enum: ["Road", "Garbage", "Water", "Electricity", "Other"],
      default: "Other",
    },
    image: {
      type: String, // image filename or URL
    },
    votes: {
      type: Number,
      default: 0,
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const IssueModel = mongoose.model("Issue", issueSchema);
module.exports=IssueModel