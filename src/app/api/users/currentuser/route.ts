import { connectDB } from "@/config/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await connectDB();
  try {
    const userId = await validateJWT(request);
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("No user found");
    }

    const response = NextResponse.json({
      message: "User data fetched successfully",
      data: user,
    });

    // Cache user data for 30 seconds with revalidation
    response.headers.set('Cache-Control', 'private, s-maxage=30, stale-while-revalidate=60');

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
