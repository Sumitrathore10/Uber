import express from "express"
import { captainProfile, loginCaptain, logoutCaptain, registerCaptain } from "../controllers/captain.controller.js"
import { body } from "express-validator";  
import { isCaptainAuthenticate } from "../middlewares/captainAuth.middleware.js";

const router = express.Router()

router.route('/register').post([
  // ---------- Basic info ----------
  body("email")
    .isEmail()
    .withMessage("Invalid email"),

  body("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long"),

  body("fullname.lastname")
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters long"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  // ---------- Captain status ----------
  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be either 'active' or 'inactive'"),

  // ---------- Vehicle details ----------
  body("vehical.color")
    .isLength({ min: 3 })
    .withMessage("Vehicle color must be at least 3 characters long"),

  body("vehical.plate")
    .isLength({ min: 3 })
    .withMessage("Vehicle plate must be at least 3 characters long"),

  body("vehical.capacity")
    .isInt({ min: 1 })
    .withMessage("Vehicle capacity must be at least 1"),

  body("vehical.vehicalType")
    .isIn(["car", "motorcycle", "auto"])
    .withMessage("Vehicle type must be 'car', 'motorcycle', or 'auto'"),

  // ---------- Location (optional) ----------
  body("location.lat")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be between -90 and 90"),

  body("location.lng")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be between -180 and 180"),
],registerCaptain)

router.route('/login').post([
     body("email")
    .isEmail()
    .withMessage("Invalid email"),
     body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

],loginCaptain)

router.route('/profile').get(isCaptainAuthenticate,captainProfile);
router.route('/logout').get(logoutCaptain)

export default router;