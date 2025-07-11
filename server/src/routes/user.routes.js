import express from "express"
import { registerUser,loginUser, logoutUSer, userProfile } from "../controllers/user.controller.js"
import {body} from "express-validator"
import { isAuthenticate } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.route('/register').post([
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3,}).withMessage('First name must be atleast 3 characters long'),
    body('fullname.lastname').isLength({min:3}).withMessage('First name must be atleast 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 3 characters long')
],registerUser)
router.route('/login').post([
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 3 characters long')
],loginUser)
router.route('/logout').get(logoutUSer)
router.route('/profile').get(isAuthenticate,userProfile)
export default router