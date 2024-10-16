import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/config/db'; 
import { userModel } from '@/models/userModel';


export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const {username, email, password}= await request.json();
        
        if (!username || !email || !password) {
            return NextResponse.json({message:"all fields are required"}, {status: 400})
        }
        const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return NextResponse.json({Message:"Username or Email already exists!"}, {status: 400})
        }
        
        const newUser = new userModel({
            username,email, password
        })
        await newUser.save();

        return NextResponse.json({message:"User registered successfully!"})
    } catch (error:any) {
        console.log('something go went wrong')
        return NextResponse.json({error: error.message},{status:500})
    }
}