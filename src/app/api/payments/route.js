import { NextResponse } from "next/server";
import { Payment } from "../../../../models/Payment";
import connectDB from "@/lib/connectDB";

let db;
export async function POST(request) {
  db = await connectDB();
  const newPayment = await request.json();

  // Insert the new book into the database
  const result = await db.collection("payments").insertOne(newPayment);

  return NextResponse.json(result);
}

export async function GET(request) {
  db = await connectDB();

  try {
    // Fetch all payments
    const payments = await Payment.find({});
    return NextResponse.json(payments);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { success: false, message: "Unable to fetch payment" },
      { status: 500 }
    );
  }
}
