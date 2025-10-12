const express = require('express');
const userModel = require('../models/user.model');

const { validationResult } = require('express-validator');


// Mock function for password hashing (replace with bcrypt or similar)
const mockHashPassword = async (password) => {
    // In a real application, use a library like bcrypt to hash the password
    console.log(`Hashing password: ${password}`);
    return `hashed_${password}`; 
};

// Mock function for password comparison (replace with bcrypt or similar)
const mockComparePassword = async (inputPassword, storedHash) => {
    // In a real application, use a library like bcrypt.compare
    return storedHash === `hashed_${inputPassword}`;
};

// Mock function for JWT generation (replace with jsonwebtoken)
const mockGenerateToken = (userId) => {
    // In a real application, use jsonwebtoken.sign
    return `mock_jwt_token_for_user_${userId}`; 
};

// Mock database/user storage for demonstration
const mockUsers = [];

/**
 * Controller function to handle user registration.
 * Expects: Username, email, password, City, State, phone, otp
 */
const registerUser = async (req, res) => {
    // 1. Check for validation errors from express-validator middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { Username, email, password, City, State, phone, otp } = req.body;

    try {
        // 2. Mock: Check if user already exists
        const existingUser = mockUsers.find(u => u.email === email);
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists." });
        }
        
        // 3. Mock: Verify OTP (In a real app, you would check a database/cache for the pending OTP)
        if (otp !== '123456') { // Mock OTP check
            return res.status(400).json({ message: "Invalid OTP provided." });
        }

        // 4. Mock: Hash the password before saving
        const hashedPassword = await mockHashPassword(password);
        
        // 5. Mock: Create a new user object
        const newUser = {
            id: Date.now().toString(),
            Username,
            email,
            password: hashedPassword, // Store the hash
            City,
            State,
            phone,
            createdAt: new Date(),
        };

        // 6. Mock: Save user to the database
        mockUsers.push(newUser);
        
        // 7. Mock: Generate a token for immediate login after registration
        const token = mockGenerateToken(newUser.id);

        console.log(`User registered: ${Username} (${email})`);

        return res.status(201).json({ 
            message: "Registration successful", 
            token,
            userId: newUser.id,
            Username: newUser.Username,
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Internal server error during registration." });
    }
};

/**
 * Controller function to handle user login.
 * Expects: email, password
 */
const loginUser = async (req, res) => {
    // 1. Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // 2. Mock: Find user by email
        const user = mockUsers.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials (User not found)." });
        }

        // 3. Mock: Compare the provided password with the stored hash
        const isMatch = await mockComparePassword(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials (Password mismatch)." });
        }

        // 4. Mock: Generate a token
        const token = mockGenerateToken(user.id);

        console.log(`User logged in: ${user.Username} (${user.email})`);

        return res.status(200).json({ 
            message: "Login successful", 
            token,
            userId: user.id,
            Username: user.Username,
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error during login." });
    }
};

/**
 * Controller function to fetch the user's profile (requires authentication).
 */
const getUserProfile = async (req, res) => {
    try {
        // The authMiddleware should have attached the user object/ID to req.user
        const userId = req.user?.id || 'mock-user-id'; // Use real user ID from middleware
        
        // Mock: Find user data 
        const user = mockUsers.find(u => u.id === userId) || {
            id: userId,
            Username: "Mock User",
            email: "mock@example.com",
            City: "San Francisco",
            State: "California"
        };
        
        // Omit sensitive data like password hash
        const profile = {
            id: user.id,
            Username: user.Username,
            email: user.email,
            City: user.City,
            State: user.State,
            // ... other profile data
        };

        return res.status(200).json(profile);
    } catch (error) {
        console.error("Get Profile error:", error);
        return res.status(500).json({ message: "Could not retrieve user profile." });
    }
};

/**
 * Controller function to log out the user.
 */
const logoutUser = async (req, res) => {
    // In a stateless JWT-based system, logout is often handled client-side by deleting the token.
    // In a session-based system, this would destroy the server-side session.
    
    // For JWT, we just confirm success. If a token blacklist is used, it would go here.
    console.log(`User logged out: ${req.user?.id || 'Unknown ID'}`);

    return res.status(200).json({ message: "Logout successful" });
};


module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
};
