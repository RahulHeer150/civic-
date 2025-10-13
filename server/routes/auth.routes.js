const express=require('express')
const router =express.Router();
const authMiddleware=require('../middlewares/auth.middleware')
const authController=require('../controllers/auth.controller')

router.route('/').get(authController.home)
router.route('/register').post(validate())