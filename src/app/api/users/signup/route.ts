import { connectDB } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDB();

const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        if (username === "" || email === "" || password === "") {
            return NextResponse.json({ error: "All fields required" }, { status: 400 });
        }
        //check if email already registered
        const userwithEmail = await User.findOne({ email });
        if (userwithEmail) {
            return NextResponse.json({ error: "Email already registered!" }, { status: 400 });
        }

        //check if username already taken
        const userwithUsername = await User.findOne({ username });
        if (userwithUsername) {
            return NextResponse.json({ error: "Username already taken!" }, { status: 400 });
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();

        const tokenData = {
            id: savedUser._id,
            email: savedUser.email,
            username: savedUser.username
        };
        const token = jwt.sign(tokenData, process.env.SECRET_TOKEN!, { expiresIn: "1d" });

        const response = NextResponse.json({ success: true, message: "Account Created Successfully." });
        response.cookies.set("token", token, { httpOnly: true });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.status })
    }
}

export { POST };