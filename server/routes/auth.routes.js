const express = require('express');
const router = express.Router();
const userController=require("../controllers/auth.controller")
const authMiddleware = require('../middlewares/auth.middleware');

// ✅ Register User (POST)
router.post('/register', userController.register);

router.post('/login', userController.loginUser)

// ✅ Get Profile (GET)
router.get('/profile',authMiddleware.authUser, userController.getUserProfile);

router.get('/logout',authMiddleware.authUser,userController.logoutUser)


router.post("/forgot-password",userController.forgotPassword);
router.post("/reset-password/:token", userController.resetPassword);

module.exports = router;
