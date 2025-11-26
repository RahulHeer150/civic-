const userModel=require("../models/user.model")
const userService=require("../services/auth.service")
const blackTokenModel=require('../models/blackToken.model')
const {validationResult} = require('express-validator')
 

// module.exports.register = async (req, res) => {
//     try {
//         const { username, city, state,  email, password, phone } = req.body;

//         const userExist = await userModel.findOne({ email });
       

//         if (userExist) {
//             return res.status(400).json({ message: "Email already exists" });
//         }
       

        

//         const hashedPassword = await userModel.hashPassword(password);

//     const user = await userService.createUser({
//         username,
//         city, 
//         state,
//         email,
//         phone,
//         password: hashedPassword
//     });
//     console.log(user)

//     const token = user.generateAuthToken();

//     res.status(201).json({ token, user });

//         await newUser.save();
//         //await sendOTPEmail(email, otp);

//         res.status(201).json({
//             msg: "Registration Successful. Please verify your OTP.",
//             userId: newUser._id.toString()
//         });
//     } catch (err) {
//         console.error("Registration error:", err);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };


module.exports.register = async (req, res) => {
  try {
    console.log("📥 Request body:", req.body);
    const { username, city, state, email, password, phone,role } = req.body;

    if (!username || !city || !state || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isUserAlready = await userModel.findOne({ email });
    if (isUserAlready) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await userModel.hashPassword(password);
   
    // Create user without OTP
    const user = await userService.createUser({
      username,
      city,
      state,
      email,
      phone,
      password: hashedPassword,
      role:role||"user"
      // Don't include OTP here
    });

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
  } catch (error) {
    console.error("❌ Error in registerUser:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.loginUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, user });
}

module.exports.getUserProfile = async (req, res, next) => {

    try {
        // Check if req.user exists
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Get user data without password
        const userData = await userModel.findById(req.user._id).select('+password');
        
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ userData });
    } catch (error) {
        console.error(`Error fetching user profile:`, error);
        return res.status(500).json({ 
            message: "Internal Server Error",
            error: error.message 
        });
    }

}


module.exports.logoutUser = async (req, res, next) => {
     try {
    // safe optional chaining for cookies and headers
    const tokenFromCookie = req.cookies?.token || null;
    const authHeader = req.headers?.authorization;
    const tokenFromHeader =
      typeof authHeader === "string" && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    const token = tokenFromCookie || tokenFromHeader || null;

     // clear cookie regardless (use same options you set when creating it)
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // only attempt to blacklist if token exists
    if (token) {
      try {
        await blackTokenModel.create({ token });
      } catch (err) {
        // Don't fail logout if blacklist write fails
        console.warn("Failed to record blacklisted token:", err.message || err);
      }
    }

    return res.status(200).json({ success: true, message: "Logged out" });
    console.log("User logged out successfully");

  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}