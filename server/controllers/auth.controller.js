const User=require('../models/user.model');



const home=async(req,res)=>{
    res.status(200).send('hello world')
};
//user Registration Logic

const register=async(req,res)=>{
    try{
        const { username, city , state , email , phone, password }=req.body;
        
        const userExist=await User.findOne({email})

        if(userExist){
            return res.status(400).json({message:"Email Already exists."})
        }

        const newUser=new User({
            username,
            city,
            email, 
            state,
            phone,
            password
        })

        await newUser.save();

        res.status(201).json({
            message:"Registration Successful.",
            userId:newUser._id.toString()
        })
        console.log('New User Registered:', newUser);
        

    }catch(error){
        console.error('Registration error',error);
        res.status(500).json({message:"internal Server Error"});
    }
}

const user = async (req, res) => {
    try {
        const userData = req.user;
        return res.status(200).json({ userData });
    } catch (error) {
        console.error(`Error from user route ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports={
    home, register, user
}