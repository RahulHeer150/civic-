const userModel = require("../models/user.model");
const userService = require("../services/auth.service");
const blackTokenModel = require("../models/blackToken.model");
const { validationResult } = require("express-validator");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

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
    const { username, city, state, email, password, phone, role } = req.body;

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
      role: role || "user",
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

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res, next) => {
  try {
    // Check if req.user exists
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Get user data without password
    const userData = await userModel.findById(req.user._id).select("+password");

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ userData });
  } catch (error) {
    console.error(`Error fetching user profile:`, error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

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
};

module.exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User with this email does not exist" });
    }

    // 2. Generate reset token and hash it
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // valid for 10 minutes
    await user.save();

    // 3. Generate reset URL
    // 3. Generate reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    console.log("🔗 Reset URL generated:", resetUrl);

    // 4. Email HTML
    const message = `
      <h3>Password Reset Request</h3>
      <p>Click below to reset your password:</p>
      <a href="${resetUrl}" style="padding:10px;background:#007bff;color:#fff;border-radius:5px;text-decoration:none">
        Reset Password
      </a>
      <p>This link expires in 10 minutes.</p>
    `;

    // 5. Email sender
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: email,
      from: `"CrowdFix Support" <${process.env.EMAIL_USER}>`,
      subject: "Password Reset Request",
      html: message,
    });

    return res
      .status(200)
      .json({ message: "Reset password link sent to email" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Hash token to compare with DB
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await userModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // Valid token only
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Update password (model hashes automatically via pre-save hook)
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
