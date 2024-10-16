import { connectDB } from '@/config/db';
import { userModel } from '@/models/userModel';
import { error } from 'console';
import {NextRequest, NextResponse} from 'next/server'

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const { email, password } = await request.json();
        const isUserPresent = await userModel.findOne({ email });
        if (!isUserPresent) {
            return NextResponse.json({ message: "Email is not registered!" }, { status: 400 });
        }
        if (isUserPresent.password === password) {
            return NextResponse.json({message:"login successful!"}, {status: 200})
        }
        else {
            return NextResponse.json({message: "Password doesnot matched!"}, {status: 400})
        }
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({error: error.message})
    }
}