import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Authorization function (replace with actual logic)
function isAuthorized(userId: string): boolean {
    // Example logic: Allow all users
    return true;
}

export async function POST(req: NextRequest) {
    try {
        const body: any = await req.json(); // Parse the JSON body
        const { userId } = body;

        // Check if the user is authorized to watch this video
        if (!userId || !isAuthorized(userId)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const expiresInSeconds = 100; // Token expires in 10 seconds

        const drmToken = jwt.sign(
            { userId, videoID: "674e49eadeed8d45e9f92b72" },
            process.env.SECRET_KEY!,
            { expiresIn: expiresInSeconds } // Token expires in 1 hour
        );

        return NextResponse.json({
            drmToken,
            expires: Date.now() + expiresInSeconds * 1000, // Expiry in milliseconds
        });
    } catch (error) {
        console.error("Error generating DRM token:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
