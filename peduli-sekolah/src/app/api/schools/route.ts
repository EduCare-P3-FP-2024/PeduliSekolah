import { getDocuments } from "@/db/models/schoolDocument";
import { SchoolProfile } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

type Response = SchoolProfile[];

export async function GET(request: NextRequest) {
  try {
    // Fetch school documents from the database
    const schools = await getDocuments();

    // Log detailed info to debug
    if (!schools || schools.length === 0) {
      console.warn("No schools found.");
    } else {
      console.log(`Fetched ${schools.length} schools`, schools);
    }

    // Return the fetched school data
    return NextResponse.json<Response>(schools);
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching schools:", error);

    // Return an error response
    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        message: "Failed to fetch schools",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
