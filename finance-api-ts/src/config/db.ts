// Connect to MongoDB 
import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDB() {
    try{
        await mongoose.connect(env.mongoUri)
        console.log("MongoDB Connected")
    } catch(err) {
        console.error(err)
        process.exit(1)
    }
}