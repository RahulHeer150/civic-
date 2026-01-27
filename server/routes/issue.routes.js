const express = require("express");
const router = express.Router();

const issueController = require("../controllers/issue.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const uploadMiddleware = require("../middlewares/upload.middleware");

// 🔓 Public
router.get("/", issueController.getIssues);

// 🔐 User (STATIC ROUTES FIRST)
router.get("/myissue", authMiddleware.authUser, issueController.getMyIssues);

router.post(
  "/create",
  authMiddleware.authUser,
  uploadMiddleware.single("media"),
  issueController.createIssue,
);

router.post("/:id/vote", authMiddleware.authUser, issueController.voteIssue);
router.post(
  "/:id/downvote",
  authMiddleware.authUser,
  issueController.downvoteIssue,
);

// 🛡️ Admin only
router.delete(
  "/:id",
  authMiddleware.authUser,
  authMiddleware.isAdmin,
  issueController.deleteIssue,
);

router.put(
  "/:id/resolve",
  authMiddleware.authUser,
  authMiddleware.isAdmin,
  issueController.resolveIssue,
);

// 🔓 Public (DYNAMIC ROUTES LAST)
router.get("/:id", issueController.getIssueById);

module.exports = router;
