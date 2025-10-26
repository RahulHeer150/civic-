const express = require("express");
const router = express.Router();
const issueController = require("../controllers/issue.controller");
//const { authUser } = require("../middlewares/authmiddle");

// 🟢 Public routes
router.get("/", issueController.getAllIssues);
router.get("/:id", issueController.getIssueById);

// 🔐 Protected routes
router.post("/create",  issueController.createIssue);
router.put("/:id",  issueController.updateIssue);
router.delete("/:id", issueController.deleteIssue);

// 🔵 Upvote/downvote (optional auth)
router.post("/:id/upvote", issueController.upvoteIssue);
router.post("/:id/downvote", issueController.downvoteIssue);

module.exports = router;
