import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db/models/user";

export async function POST(request: NextRequest) {
    const { orderId, payment_method, payment_status, payment_date } = await request.json();
  
    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }
  
    const db = await getDb();
  
    const result = await db.collection("transactions").updateOne(
      { orderId: orderId }, 
      {
        $set: {
          payment_method: payment_method,
          payment_status: payment_status,
          payment_date: new Date(payment_date),
          updatedAt: new Date(),
        },
      }
    );
  
    return NextResponse.json({ message: "Transaction status updated successfully" });
  }
  
