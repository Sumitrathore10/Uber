import dotenv from 'dotenv';
dotenv.config()

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from "./database/db.js";

connectDB();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())
app.use(cors({
    origin:'',
    credentials:true
}))

app.get("/",(req,res)=>{
    res.send("Welcome to the Uber Server");
})

export default app;