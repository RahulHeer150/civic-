const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const blackToken = require("../models/blackToken.model");

module.exports.authUser = async (req, res, next) => {
  try {
    let token = null;

    // 1️⃣ Check authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    
    // 2️⃣ Check cookies
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    // 3️⃣ If still no token → unauthorized
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided."
      });
    }

    // 4️⃣ Check blacklist (logout tokens)
    const isBlacklisted = await blackToken.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: "Token has been invalidated."
      });
    }

    // 5️⃣ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 6️⃣ Fetch user from DB
    const user = await userModel.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found."
      });
    }

    // 7️⃣ Attach user to request
    req.user = {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.username
    };

    next();

  } catch (error) {
    console.error("Auth Middleware Error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired." });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token."
    });
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access only",
    });
  }
  next();
};


// const userModel = require("../models/user.model")
// const jwt = require('jsonwebtoken')
// const blackToken = require("../models/blackToken.model")

// module.exports.authUser = async (req, res, next) => {
//     try {
//         // Check authorization header first
//         const authHeader = req.headers.authorization;
//         let token;

//         if (authHeader && authHeader.startsWith('Bearer ')) {
//             // Extract token from Bearer header
//             token = authHeader.split(' ')[1];
//         } else if (req.cookies && req.cookies.token) {
//             // Try to get token from cookies
//             token = req.cookies.token;
//         }

//         // If no token found in either place
//         if (!token) {
//             return res.status(401).json({ 
//                 success: false, 
//                 message: 'Access denied. No token provided.' 
//             });
//         }

//         // Check if token is blacklisted
//         const isBlacklisted = await blackToken.findOne({ token });
//         if (isBlacklisted) {
//             return res.status(401).json({ 
//                 success: false, 
//                 message: 'Token has been invalidated' 
//             });
//         }

//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (!decoded) {
//             return res.status(401).json({ 
//                 success: false, 
//                 message: 'Invalid token' 
//             });
//         }

//         // Get user data
//         const user = await userModel.findById(decoded._id).select('-password');
//         if (!user) {
//             return res.status(401).json({ 
//                 success: false, 
//                 message: 'User not found' 
//             });
//         }

//         // Attach user to request
//         req.user ={
//           _id:user.id,
//           email:user.email,
//           role:user.role,
//           name:user.username
//         };
//         next();

//     } catch (error) {
//         console.error('Auth Middleware Error:', error);
//         return res.status(401).json({ 
//             success: false, 
//             message: 'Invalid token' 
//         });
//     }
// }

// const jwt = require("jsonwebtoken");
// const userModel = require("../models/user-model");

// const authMiddleware = async (req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized, Token not provided" });
//   }

//   const jwtToken = token.replace("Bearer ", "").trim();
//   try {
//     const isVerified = jwt.verify(jwtToken, process.env.JWT_KEY);
//     const userData = await User.findById(isVerified.userId).select({ password: 0 });

//     if (!userData) {
//       return res.status(401).json({ message: "Unauthorized. User not found." });
//     }

//     req.token = token;
//     req.user = userData;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized. Invalid token." });
//   }
// };

// module.exports = authMiddleware;
