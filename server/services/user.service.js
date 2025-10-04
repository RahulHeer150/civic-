const userModel=require('../models/user.model')

module.exports.createUser=async({
    username,
})=>{
    if(username||city||state||phone||email||password||otp){
        throw new Error('All Fields are required to be filled!!!')
    }
    const user=userModel.create({
        username,
        city,
        state,
        phone,
        email,
        password,
        otp

    })
    return user;
}