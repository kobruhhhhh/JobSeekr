import { connectDB } from "@/config/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import Job from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const userId = await validateJWT(request);
    const reqBody = await request.json();
    const job = await Job.create({ ...reqBody, user: userId });
    return NextResponse.json({
      message: "Job created successfully",
      data: job,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  await connectDB();
  try {
    // Don't validate JWT for GET jobs - allow public access to view jobs
    // Only validate JWT for specific user's jobs (when user param is present)
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user");
    const searchText = searchParams.get("searchText");
    const location = searchParams.get("location");

    console.log("GET /api/jobs - Query params:", { user, searchText, location });

    // If fetching specific user's jobs, validate JWT
    if (user) {
      await validateJWT(request);
    }

    const filtersObject: any = {};
    if (user) {
      filtersObject["user"] = user;
    }

    if (searchText && searchText !== "") {
      filtersObject["title"] = { $regex: searchText, $options: "i" };
    }

    if (location && location !== "") {
      filtersObject["location"] = { $regex: location, $options: "i" };
    }

    console.log("GET /api/jobs - Filters:", filtersObject);

    const jobs = await Job.find(filtersObject).populate("user");
    console.log("GET /api/jobs - Found jobs:", jobs.length);


    const response = NextResponse.json({
      message: "Jobs fetched successfully",
      data: jobs,
    });

    // Add caching headers for better performance
    // Cache for 60 seconds, stale content valid for 300 seconds while revalidating
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');

    return response;
  } catch (error: any) {
    console.error("GET /api/jobs - Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
