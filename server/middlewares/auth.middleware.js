
const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')
const blackToken = require("../models/blackToken.model")

module.exports.authUser = async (req, res, next) => {
    try {
        // Check authorization header first
        const authHeader = req.headers.authorization;
        let token;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            // Extract token from Bearer header
            token = authHeader.split(' ')[1];
        } else if (req.cookies && req.cookies.token) {
            // Try to get token from cookies
            token = req.cookies.token;
        }

        // If no token found in either place
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Access denied. No token provided.' 
            });
        }

        // Check if token is blacklisted
        const isBlacklisted = await blackToken.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ 
                success: false, 
                message: 'Token has been invalidated' 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid token' 
            });
        }

        // Get user data
        const user = await userModel.findById(decoded._id).select('-password');
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        // Attach user to request
        req.user = user;
        next();

    } catch (error) {
        console.error('Auth Middleware Error:', error);
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid token' 
        });
    }
}