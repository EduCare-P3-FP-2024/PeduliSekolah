import { NextResponse } from "next/server";
import { createPayee } from "@/db/models/payee";
import { PayeeInput } from "@/utils/types";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";

// POST handler for creating a payee
async function getUserIdFromHeaderOrCookies(headers: Headers): Promise<ObjectId> {
    let userId: string | undefined = headers.get('x-userid') as string;
  
    if (!userId) {
      const userIdCookie = cookies().get("userId");
      if (userIdCookie) {
        userId = userIdCookie.value; // Access the value from the cookie object
      }
    }
  
    if (!userId) {
      throw new Error("Unauthorized: userId is missing from headers or cookies.");
    }
  
    return new ObjectId(userId);
  }

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromHeaderOrCookies(req.headers);
    const { name, email, bankAccount, walletId } = await req.json();

    const payeeInfo: PayeeInput = {
      name,
      email,
      bank_account: bankAccount,
      wallet_id: walletId,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId,
    };

    const result = await createPayee(payeeInfo);

    return NextResponse.json({ success: true, message: "Payee created successfully", result });
  } catch (error) { 
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }
}
