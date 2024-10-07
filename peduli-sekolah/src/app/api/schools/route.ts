"use server";

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
    const schools = await getDocuments();

    return NextResponse.json<Response>(schools);
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        message: "Failed to fetch schools",
      },
      {
        status: 500,
      },
    );
  }
}
