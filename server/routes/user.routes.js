const express=require('express');
const router=express.Router();
const userController=require('../controllers/user.controller')
const authMiddleware=require('../middlewares/auth.middleware')

const { body }=require('express-validator')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email Format'),
    body('username').isLength({min:8}).withMessage('invalid Username'),
    body('password').isLength({min:8}),withMessage('Password must be atleast 8 characters long')
],
userController.registerUser
)