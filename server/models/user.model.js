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

    },
    email:{

    },
    Phone_no:{

    },
    Password:{

    },
    Otp:{

    }
})

