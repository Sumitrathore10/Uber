import { Blacklist } from "../models/blacklist.models.js";
import { User } from "../models/user.models.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
  try {
    const { fullname, email, password } = req.body;
    if (!fullname.firstname || !fullname.lastname || !email || !password) {
      return res.status(400).json({
        success: false,
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
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password: hashedPassword,
    });
    const token = await user.generateAuthToken();
    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        user,
        message: "User created successfully !!!",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({
      success: false,
      message: errors.array(),
    });
  }
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All field are required !!! ",
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not registered ",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = await user.generateAuthToken()

    return res.status(200).cookie("token",token,{
      httpOnly:true,
      sameSite:"strict",
      maxAge:24*60*60*1000
    }).json({
      success: true,
      user,
      message: "User login successfully !!!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
    console.log(error)
  }
};

export const logoutUSer = async (req,res) => {
  try {
    const token = req.cookies.token
   await Blacklist.create({token})
  return res.clearCookie('token').json({
    
      success:true,
      message:"Logout successfully !!"
    
  })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

export const userProfile = async (req,res) =>{
  try {
    res.status(201).json(req.user)
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
    console.log(error)
  }
}