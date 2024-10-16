import mongoose from "mongoose";

export const connectDB = async () => {
    
    try {

        const connection = await mongoose.connect(process.env.MONGO_URL || "");
        console.log('connection is successful!');
        
    } catch (error) {
        console.log('failed to connect db')
        process.exit();
    }
}