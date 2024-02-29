import { connectDB } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

connectDB();

const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { username, password } = reqBody;
        if (username === "" || password === "") {
            return NextResponse.json({ error: "All fields required" }, { status: 400 });
        }

        //check if username already taken
        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        };
        const token = jwt.sign(tokenData, process.env.SECRET_TOKEN!, { expiresIn: "1d" });

        const response = NextResponse.json({ success: true, message: "Login Success" });
        response.cookies.set("token", token, { httpOnly: true });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.status })
    }
}

export { POST };