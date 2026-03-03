import { NextRequest, NextResponse } from "next/server";
import { validateJWT } from "@/helpers/validateJWT";
import User from "@/models/userModel";
import Job from "@/models/jobModel";

// GET: Fetch all saved jobs for the current user
export async function GET(request: NextRequest) {
    try {
        const userId = await validateJWT(request);

        const user = await User.findById(userId).populate({
            path: 'savedJobs',
            populate: {
                path: 'user',
                select: 'name email'
            }
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Saved jobs fetched successfully",
            data: user.savedJobs,
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// POST: Add a job to saved jobs
export async function POST(request: NextRequest) {
    try {
        const userId = await validateJWT(request);
        const { jobId } = await request.json();

        // Verify job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return NextResponse.json({ message: "Job not found" }, { status: 404 });
        }

        // Add job to savedJobs if not already saved
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (!user.savedJobs) {
            user.savedJobs = [];
        }

        if (user.savedJobs.includes(jobId)) {
            return NextResponse.json({ message: "Job already saved" }, { status: 400 });
        }

        user.savedJobs.push(jobId);
        await user.save();

        return NextResponse.json({
            message: "Job saved successfully",
            data: user.savedJobs,
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// DELETE: Remove a job from saved jobs
export async function DELETE(request: NextRequest) {
    try {
        const userId = await validateJWT(request);
        const { searchParams } = new URL(request.url);
        const jobId = searchParams.get("jobId");

        if (!jobId) {
            return NextResponse.json({ message: "Job ID is required" }, { status: 400 });
        }

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (!user.savedJobs) {
            user.savedJobs = [];
        }

        user.savedJobs = user.savedJobs.filter(
            (id: any) => id.toString() !== jobId
        );
        await user.save();

        return NextResponse.json({
            message: "Job removed from saved list",
            data: user.savedJobs,
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
