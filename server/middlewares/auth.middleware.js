const jwt = require('jsonwebtoken'); // You would use a library like 'jsonwebtoken' in a real app

// Mock Secret Key (REPLACE THIS WITH A SECURE ENVIRONMENT VARIABLE!)
const JWT_SECRET = 'YOUR_SUPER_SECURE_MOCK_SECRET_KEY';

/**
 * Middleware function to authenticate users based on JWT.
 * Assumes the token is passed in the Authorization header as 'Bearer <token>'.
 */
const authUser = async (req, res, next) => {
    try {
        // 1. Get the Authorization header
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            return res.status(401).json({ 
                message: "Access denied. No token provided." 
            });
        }

        // 2. Extract the token (Remove 'Bearer ' prefix)
        const token = authHeader.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ 
                message: "Access denied. Token format is invalid." 
            });
        }

        // --- REAL JWT VERIFICATION LOGIC GOES HERE ---
        // const decoded = jwt.verify(token, JWT_SECRET);
        // req.user = { id: decoded.userId };
        // next();
        // ---------------------------------------------
        
        // 3. Mock: Verify the token
        // Mock verification: check if the token looks like one we generated in user.controller.js
        if (!token.startsWith('mock_jwt_token_for_user_')) {
            return res.status(401).json({ 
                message: "Invalid token structure or signature." 
            });
        }
        
        // Mock: Decode user ID from the mock token string
        // Assuming mock token format: mock_jwt_token_for_user_123456
        const userId = token.split('_').pop(); 
        
        const decoded = { userId: userId }; 
        
        // 4. Attach the user payload to the request object
        // req.user will contain the user data decoded from the token (e.g., { userId: '123456' })
        req.user = { id: decoded.userId }; 

        // 5. Proceed to the next middleware or controller function
        next();

    } catch (error) {
        console.error('Authentication Error:', error.message);
        
        // Handle specific errors like expired tokens if using 'jsonwebtoken'
        let errorMessage = "Invalid token or token is expired.";
        if (error.name === 'TokenExpiredError') {
            errorMessage = "Token expired. Please log in again.";
        }

        return res.status(401).json({ 
            message: errorMessage
        });
    }
};

module.exports = {
    authUser
};
