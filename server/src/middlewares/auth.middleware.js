import { Blacklist } from "../models/blacklist.models.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"

export const isAuthenticate = async (req,res,next) =>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(400).json({
                success: false,
        message: "not Authorized",
            })
            
        }
        const isBlacklist = await Blacklist.findOne({token})
        if(isBlacklist){
            return res.status(400).json({
                success:false,
                message:"blacklisted user !!!"
            })
        }
        const decode = jwt.verify(token,process.env.JWT_SECRETE_KEY);
        if(!decode){
            return res.status(400).json({
                success:false,
                message:"invalid token!!!"
            })
        }
        const user = await User.findById(decode._id)
        req.user = user
        return next()
    } catch (error) {
        return res.status(500).json({
                success: false,
        message: "please login !!!",
            })
    }
}