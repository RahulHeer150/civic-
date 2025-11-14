const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issue.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// all routes below require authentication

// list all issues
router.get('/', issueController.getIssues);

// create an issue
router.post('/create', issueController.createIssue);

// vote (increment)
router.post('/:id/vote', issueController.voteIssue);

// optional: update/delete/downvote endpoints
router.put('/:id', issueController.updateIssue);
router.delete('/:id', issueController.deleteIssue);
router.post('/:id/downvote', issueController.downvoteIssue);

module.exports = router;