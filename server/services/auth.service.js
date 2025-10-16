const userModel=require("../models/user.model")

module.exports.createUser=async({
    username, city, state, email,  phone
}) =>{
    if(!username || !city || !state || !email || !phone){
        throw new Error("All fields are required");
    }
    const user=userModel.create({
       username,
       city,
       state,
       email,
       phone
    })
    return user;
}