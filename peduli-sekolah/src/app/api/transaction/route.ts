import { NextRequest, NextResponse } from "next/server";
import _ from 'lodash';
import { MidtransClient } from "midtrans-node-client";
import { Transaction } from "@/utils/types";

let snap = new MidtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

export async function POST(request: NextRequest) {
  const data: Transaction[] = await request.json();

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

  const parameter = {
    item_details: itemDetails, 
    transaction_details: {
      order_id: _.random(100000, 999999), 
      gross_amount: grossAmount 
    }
  };

  const token = await snap.createTransactionToken(parameter);

  return NextResponse.json({
    token,
  });
}
