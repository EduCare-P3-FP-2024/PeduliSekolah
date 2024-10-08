import { NextResponse } from "next/server";
import { getPayeeByUserId } from "@/db/models/payee"; // Adjust import path

export async function GET(req: Request) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ exists: false, message: "No userId provided" }, { status: 400 });
  }

  try {
    const payee = await getPayeeByUserId(userId);
    if (payee) {
      return NextResponse.json({ exists: true });
    } else {
      return NextResponse.json({ exists: false });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
