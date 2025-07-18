import mongoose from "mongoose";

const connectDB = async () =>{
    try {
       const connect = await mongoose.connect(process.env.MONGO_URL);
       console.log(`mongodb connected on ${mongoose.connection.host}`)
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
    }
}

export default connectDB;