import { NextRequest, NextResponse } from "next/server";
import _ from 'lodash';
import { MidtransClient } from "midtrans-node-client";
import { Transaction, TransactionInput } from "@/utils/types";
import { AddTransaction } from "@/db/models/transaction";  // Import your DB handler
import { ObjectId } from "mongodb";
let snap = new MidtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (!data || data.length === 0) {
    throw new Error("Data not found");
  }

  const itemDetails = data.map((item: Transaction) => ({
    id: item._id,
    price: _.ceil(parseFloat(item.amount.toString())),
    quantity: 1, 
    name: item.userId || "Orang Baik"
  }));

  const grossAmount = _.sumBy(itemDetails, 'price');
  const orderId = _.random(100000, 999999).toString();  // Generate order ID

  // Set Midtrans parameters
  const parameter = {
    item_details: itemDetails, 
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount 
    }
  };

  const token = await snap.createTransactionToken(parameter);

  console.log(data[0].userId);
  

  const payeeId = new ObjectId(data[0].userId)
  console.log(payeeId);
  
  // Prepare transaction data to store in DB
  const transactionData: TransactionInput = {
    userId: data[0].userId,
    orderId: orderId,
    amount: grossAmount,
    payeeId: payeeId, // Set payeeId accordingly
    payment_method: "", // Set after payment
    payment_status: "pending", // Initial status is pending
    payment_token: token,
    payment_date: new Date(), // Set the current date
    payer_notes: "", // Optional field
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  console.log('UserId:', data[0].userId);
console.log('PayeeId:', data[0].payeeId); // Replace with actual dynamic value if applicable

  // Save the transaction to the database
  await AddTransaction(transactionData);

  return NextResponse.json({
    token,
    orderId
  });
}
