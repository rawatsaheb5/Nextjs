import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,

    },
    email: {
        type: String,
        unique: true,
        required:true,
    },
    password: {
        type:String,
    }
})

export const userModel = mongoose.models.users || mongoose.model("users", userSchema)
