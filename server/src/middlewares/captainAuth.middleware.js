import { Blacklist } from "../models/blacklist.models.js"
import { Captain } from "../models/captain.model.js";
import jwt from "jsonwebtoken"

export const isCaptainAuthenticate = async (req,res,next) =>{
   try {
     const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Not Authorized"
        })
    }
    const checkToken = await Blacklist.findOne({token});
    if(checkToken){
        return res.status(401).json({
            success:false,
            message:"Token are blacklist !!!"
        })
    }

    const decode = jwt.verify(token,process.env.JWT_SECRETE_KEY)
    const captain = await Captain.findById(decode._id)
    req.captain = captain
    next();
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:"Unauthrized access !!!"
    })
   }
}