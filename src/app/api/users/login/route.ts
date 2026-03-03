import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const reqBody = await request.json();

    // check if user exists
    const user = await User.findOne({ email: reqBody.email });
    if (!user) {
      throw new Error("User does not exist");
    }

    // compare passwords
    const validPassword = await bcrypt.compare(reqBody.password, user.password);
    if (!validPassword) {
      throw new Error("Invalid password");
    }

    // create token
    const dataToBeSigned = {
      userId: user._id,
      email: user.email,
    };
    const token = jwt.sign(dataToBeSigned, process.env.jwt_secret!, {
      expiresIn: "30d",
    });

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    // set cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
