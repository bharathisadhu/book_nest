// /api/payments/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Payment from "../../../../models/Payment";

// POST: Create or update payment
export async function POST(req) {
  try {
    await connectDB();

    const {
      email,
      name,
      books, // Expecting an array of books
      totalAmount, // Total amount for the payment
      transactionId, // Transaction ID from Stripe
    } = await req.json();

    // Update the payment status to "completed" in the database
    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId }, // Find the payment by transaction ID
      {
        email,
        name,
        books, // Include the books array
        totalAmount, // Update the total amount
        status: "completed", // Mark payment as completed
        date: new Date(), // Update the date to the current date
      },
      { new: true } // Return the updated payment record
    );

    if (!updatedPayment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Payment updated successfully",
      payment: updatedPayment, // Return the updated payment details
    });
  } catch (error) {
    console.error("Error updating payment:", error);
    return NextResponse.json(
      { error: "Failed to update payment" },
      { status: 500 }
    );
  }
}

// GET: Retrieve all payments
export async function GET(req) {
  try {
    await connectDB();

    // Fetch all payments from the database
    const payments = await Payment.find();

    return NextResponse.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Failed to retrieve payments" },
      { status: 500 }
    );
  }
}
