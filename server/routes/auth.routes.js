const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// ✅ Register User (POST)
router.post('/register', userController.registerUser);

// ✅ Get Profile (GET)
router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

module.exports = router;
