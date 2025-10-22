const userModel=require("../models/user.model")

module.exports.createUser=async({
    username, city, state, email,  phone, password
}) =>{
    if(!username || !city || !state || !email || !phone ||!password){
        throw new Error("All fields are required");
    }
    const user=userModel.create({
       username,
       city,
       state,
       email,
       phone, 
       password
    })
    return user;
}
// const userModel = require("../models/user.model");

// module.exports.createUser = async ({ username, city, state, email, phone, password, otp }) => {
//   if (!username || !city || !state || !email || !phone || !password || !otp) {
//     throw new Error("All fields are required");
//   }

//   // Check duplicates (optional but good)
//   const existingUser = await userModel.findOne({ $or: [{ email }, { phone }] });
//   if (existingUser) {
//     throw new Error("User already exists with this email or phone");
//   }

//   const user = await userModel.create({
//     username,
//     city,
//     state,
//     email,
//     phone,
//     password,
//     otp
//   });

//   return user;
// };
