const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,

    },
    state:{
        type:String,
        required:true,


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
    otp:{
        type:String,
        required:true,
        unique:true,

    },
    isVerified:{
        type:Boolean,
        default:false
    }
})

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:'24h'})
    return token
}

userSchema.methods.comaprePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10)
}

const userModel=mongoose.model('user',userSchema);
module.exports=userModel;
