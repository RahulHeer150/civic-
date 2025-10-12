const express = require('express');
const router = express.Router();
// Assuming userController handles the registration logic
const userController = require('../controllers/user.controller');
// Assuming you have an authentication middleware
const authMiddleware = require('../middlewares/auth.middleware');

const { body } = require('express-validator');

/**
 * Route: POST /api/auth/register
 * Description: Handles new user registration. Includes validation for all required fields.
 */
router.post('/register', [
    // Basic validation for core fields
    body('Username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    // Validation for additional fields from the form
    body('City').trim().notEmpty().withMessage('City is required'),
    body('State').trim().notEmpty().withMessage('State is required'),
    
    // Validate phone number format
    body('phone').isMobilePhone('any').withMessage('Invalid phone number format'),

    // Validate OTP (assuming it's a numeric code between 4-8 digits)
    body('otp').isNumeric().isLength({ min: 4, max: 8 }).withMessage('OTP must be a 4-8 digit number'),

],
    userController.registerUser
);

/**
 * Route: POST /api/auth/login
 * Description: Handles user login.
 */
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginUser
);

/**
 * Route: GET /api/auth/profile
 * Description: Retrieves the authenticated user's profile. Requires authMiddleware.
 */
router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

/**
 * Route: GET /api/auth/logout
 * Description: Logs out the authenticated user. Requires authMiddleware.
 */
router.get('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;
    res.send('API is running...');
