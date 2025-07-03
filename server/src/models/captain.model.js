import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const captainSchema = new mongoose.Schema(
  {
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
        lowercase: true,
        unique: true,
        minlength: [5, "Email must be atleast 3 characters long"],
      },
      password: {
        type: String,
        required: true,
        select: false,
      },
      socketId: {
        type: String,
      },
      status :{
        type:String,
        enum:['active','inactive'],
        default:'active'
      },
      vehical:{
        color:{
            type:String,
            required:true,
            minlength:[3,'Color must be atleast 3 characters long']
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'Plate must be atleast 3 characters long']
        },
        capacity:{
            type:Number,
            reqired:true,
            min :[1,"Capacity must be atleast 1"]
        },
        vehicalType:{
            type:String,
            required:true,
            enum:["car","motorcycle","auto"]
        }
      },
      location :{
        lat:{
            type:Number,
        },
        lng:{
            type:Number,
        }
      }
  },
  { timestamps: true }
);

captainSchema.methods.genrateAuthToken = function(){
    const token = jwt.sign({_id : this._id},process.env.JWT_SECRETE_KEY,{
        expiresIn:"1d"
    })
    return token
}

captainSchema.statics.hashedPassword = async function(password){
    const hashedPassword = await bcrypt.hash(password,10)
    return hashedPassword
}

captainSchema.methods.comparePassword = async function (password) {
    const passwordVerify = await bcrypt.compare(password , this.password)
    return passwordVerify;
}
export const Captain = mongoose.model("Captain", captainSchema);
