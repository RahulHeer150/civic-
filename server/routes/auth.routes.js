const express=require('express')
const router =express.Router();
const authMiddleware=require('../middlewares/auth.middleware')
const authController=require('../controllers/auth.controller');
const validate=require('../middlewares/validate.middleware')
const { SignupSchema, loginSchema } = require('../services/auth.service');

router.route('/').get(authController.home)
//router.route('/register').post(validate(SignupSchema),authController.register)
router.route("/user").get(authMiddleware, authController.user);

module.exports=router;