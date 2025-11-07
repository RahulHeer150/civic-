// const userModel=require("../models/user.model")
// const userService=require("../services/auth.service")

// const {validationResult} = require('express-validator')


// module.exports.registerUser=async(req, res , next) =>{
//     console.log("working well");
      
//     const errors=validationResult(req);
//      if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { username, city, state,  email, password, phone } = req.body;

//     const isUserAlready = await userModel.findOne({ email });

//     if (isUserAlready) {
//         return res.status(400).json({ message: 'User already exist' });
//     }

//     const hashedPassword = await userModel.hashPassword(password);

//     const user = await userService.createUser({
//         username,
//         city, 
//         state,
//         email,
//         phone,
//         password: hashedPassword
//     });
//     console.log(req.body);

//     const token = userModel.generateAuthToken();

//     res.status(201).json({ token, user });


// }


 
// module.exports.getUserProfile = async (req, res, next) => {

//     res.status(200).json(req.user);

// }

// // module.exports.register = async (req, res) => {
// //     try {
// //         const { username, city, state,  email, password, phone } = req.body;

// //         const userExist = await User.findOne({ email });
       

// //         if (userExist) {
// //             return res.status(400).json({ message: "Email already exists" });
// //         }
       

        

// //         const hashedPassword = await userModel.hashPassword(password);

// //     const user = await userService.createUser({
// //         username,
// //         city, 
// //         state,
// //         email,
// //         phone,
// //         password: hashedPassword
// //     });
// //     console.log(user)

// //     const token = user.generateAuthToken();

// //     res.status(201).json({ token, user });

// //         await newUser.save();
// //         //await sendOTPEmail(email, otp);

// //         res.status(201).json({
// //             msg: "Registration Successful. Please verify your OTP.",
// //             userId: newUser._id.toString()
// //         });
// //     } catch (err) {
// //         console.error("Registration error:", err);
// //         res.status(500).json({ message: "Internal Server Error" });
// //     }
// // };

// // module.exports.userp = async (req, res) => {
// //     try {
// //         const userData = req.user;
// //         return res.status(200).json({ userData });
// //     } catch (error) {
// //         console.error(`Error from user route ${error}`);
// //         res.status(500).json({ message: "Internal Server Error" });
// //     }
// // };

const userModel = require("../models/user.model");
const userService = require("../services/auth.service");
const { validationResult } = require("express-validator");
const blackTokenModel=require('../models/blackToken.model')

module.exports.registerUser = async (req, res) => {
  try {
    console.log("📥 Request body:", req.body);
    const { username, city, state, email, password, phone } = req.body;

    if (!username || !city || !state || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isUserAlready = await userModel.findOne({ email });
    if (isUserAlready) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await userModel.hashPassword(password);
   
    const user = await userService.createUser({
      username,
      city,
      state,
      email,
      phone,
      password:hashedPassword,
      otp:null,
    });
     console.log("Hashed Password Check:", password);

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

    res.status(200).json(req.user);

}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

    await blackTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out' });

}