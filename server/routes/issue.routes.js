const express = require("express");
const router = express.Router();
const issueController = require("../controllers/issue.controller");
const { authUser } = require("../middlewares/authmiddle");

// 🟢 Public routes
router.get("/", issueController.getAllIssues);
router.get("/:id", issueController.getIssueById);

// 🔐 Protected routes
router.post("/create", authUser, issueController.createIssue);
router.put("/:id", authUser, issueController.updateIssue);
router.delete("/:id", authUser, issueController.deleteIssue);

// 🔵 Upvote/downvote (optional auth)
router.post("/:id/upvote", issueController.upvoteIssue);
router.post("/:id/downvote", issueController.downvoteIssue);

module.exports = router;
