import { User } from "../models/user.models.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.staus(400).json({
            errors: errors.array()
        })
    }
    const { fullname,email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({
        success: flase,
        message: "All fields are required !!!",
      });
    }
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }
    const hashedPassword = await User.hashedPassword(password);
    const user = await User.create({
        fullname:{
            firstname:fullname.firstname,
            lastname:fullname.lastname
        },
        email,
        password:hashedPassword,
    })
    const token = await user.generateAuthToken();
    return res.status(201).cookie("token",token,{
        httpOnly:true,
        sameSite:"strict",
        maxAge: 24 * 60 * 60 * 1000,
    }).json({
        success:true,
        message:"User created successfully !!!",
        
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};
