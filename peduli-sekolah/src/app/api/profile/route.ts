import { NextResponse } from "next/server";
import * as jose from "jose";
import { verifyTokenJose } from "@/utils/jose";

export const GET = async (request: Request) => {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload: jose.JWTPayload = await verifyTokenJose(token);
    console.log(payload);
  } catch (error) {
    console.log(error);
  }
};
