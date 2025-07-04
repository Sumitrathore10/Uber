import { validationResult } from "express-validator";
import { Captain } from "../models/captain.model.js";
import { Blacklist } from "../models/blacklist.models.js";

export const registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const { fullname, email, password, vehical } = req.body;
    const { firstname, lastname } = fullname;
    const { plate, capacity, color, vehicalType } = vehical;
    if (
      !fullname ||
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !vehical ||
      !plate ||
      !capacity ||
      !color ||
      !vehicalType
    ) {
      return res.status(401).json({
        success: false,
        message: "All fields are required !!!",
      });
    }
    const checkcaptain = await Captain.findOne({ email });
    if (checkcaptain) {
      return res.status(401).json({
        success: false,
        message: "Captain already exist !!!",
      });
    }
    const hashedPassword = await Captain.hashedPassword(password);
    const captain = await Captain.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password: hashedPassword,
      vehical: {
        color,
        plate,
        capacity,
        vehicalType,
      },
    });
    const token = await captain.genrateAuthToken();
    return res
      .status(201)
      .cookie("Token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        captain,
        message: "Captain registered successfully",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

export const loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const { email, password } = req.body;
    if ((!email, !password)) {
      return res.status(401).json({
        success: false,
        message: "All fields are required !!!",
      });
    }

    const captain = await Captain.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials !!!",
      });
    }
    const comparePassword = await captain.comparePassword(password);
    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password !!!",
      });
    }

    const token = await captain.genrateAuthToken();

    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "Captain login successfully !!!",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logoutCaptain = async (req, res) => {
  try {
    const token = req.cookies.token;
    await Blacklist.create({ token });
    return res
      .status(200)
      .clearCookie("token", null, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 0,
      })
      .json({
        success: true,
        message: "Logout successfully !!!",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const captainProfile = async (req, res) => {
  try {
    return res.status(200).json(req.captain);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
