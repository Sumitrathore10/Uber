import mongoose from "mongoose";

const blackListSchema = new mongoose.Schema({
    token:{
        type:String,
        require:true
    },
    expiresAt: {
      type: Date,
      default:Date.now,
      expires: 86400,
    },

},{timestamps:true})

export const Blacklist = mongoose.model('Blacklist',blackListSchema)