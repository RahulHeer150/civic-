const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issue.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const uploadMiddleware = require('../middlewares/upload.middleware');

// all routes below require authentication

// list all issues
router.get('/', issueController.getIssues);
router.get('/:id', issueController.getIssueById);


// create an issue
router.post('/create',uploadMiddleware.single('media'), issueController.createIssue);

// vote (increment)
router.post('/:id/vote', issueController.voteIssue);

// optional: update/delete/downvote endpoints
router.put('/:id', issueController.updateIssue);
router.delete('/:id', issueController.deleteIssue);
router.post('/:id/downvote', issueController.downvoteIssue);

module.exports = router;