import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be atleast 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be atleast 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    lowercase:true, 
    unique: true,
    minlength: [5, "Email must be atleast 3 characters long"],
  },
  password: {
    type: String,
    required: true,
    select:false
  },
  socketId: {
    type: String,
  },
},{
  timestamps:true,
});

userSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRETE_KEY, {
    expiresIn: "1d",
  });
  return token;
};

userSchema.statics.hashedPassword = async function (password){
  const hashedPassword = await bcrypt.hash(password,10)
  return hashedPassword;
}

userSchema.methods.comparePassword = async function (password){
  const passwordVerify = await bcrypt.compare(password,this.password);
  return passwordVerify;
}

export const User = mongoose.model("User", userSchema);
