const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issue.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// all routes below require authentication

// list all issues
router.get('/',authMiddleware.authUser, issueController.getIssues);

// create an issue
router.post('/create',authMiddleware.authUser, issueController.createIssue);

// vote (increment)
router.post('/:id/vote',authMiddleware.authUser, issueController.voteIssue);

// optional: update/delete/downvote endpoints
router.put('/:id',authMiddleware.authUser, issueController.updateIssue);
router.delete('/:id',authMiddleware.authUser, issueController.deleteIssue);
router.post('/:id/downvote',authMiddleware.authUser, issueController.downvoteIssue);

module.exports = router;