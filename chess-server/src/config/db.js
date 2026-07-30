import mongoose from "mongoose"
import { MONGO_URI } from "./env.js"

export async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("mongoDB connected");
        
    } catch (error) {
        console.error("mongoDB connection failed");
        console.error(error);

        process.exit(1)
        
    }
}