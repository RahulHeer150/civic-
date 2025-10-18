const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
       
    },
    city:{
        type:String,
       

    },
    state:{
        type:String,
        


    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minlength:[5,'email must be at least 5 characters long'],


    },
    phone:{
        type:String,
        required:true,
        unique:true,
        
    },
    password:{
        type:String,
        required:true,
        unique:true,
        minlength:[8,'password must be at least 8 characters long'],

    },
    isVerified: { type: Boolean, default: false }, // New field
    // otp:{
    //     type:String,
    //     required:true,
    //     unique:true,

    // }
})

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token
}

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10)
}

const userModel=mongoose.model('user',userSchema);
module.exports=userModel;
