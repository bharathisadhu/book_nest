// /api/payments/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Payment from "../../../../models/Payment";

export async function POST(req) {
  try {
    await connectDB();

    const { email, price, transactionId, bookId, bookName } = await req.json();

    // Update the payment status to "completed" in the database
    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId }, // Find the payment by transaction ID
      {
        email,
        price,
        bookId,
        bookName,
        status: "completed", // Mark payment as completed
      },
      { new: true } // Return the updated payment record
    );

    if (!updatedPayment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Payment updated successfully" });
  } catch (error) {
    console.error("Error updating payment:", error);
    return NextResponse.json(
      { error: "Failed to update payment" },
      { status: 500 }
    );
  }
}
