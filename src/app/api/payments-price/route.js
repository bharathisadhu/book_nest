import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Payment from "../../../../models/Payment";
// import Payment from "../../../../models/Payment";

// POST: Create or update payment
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

// GET: Retrieve all payments
export async function GET(req) {
  try {
    await connectDB();

    // Fetch all payments from the database
    const payments = await Payment.find();
    const total = payments.reduce(
      (acc, book) => {
        acc.totalPrice += book.price;

        return acc;
      },
      { totalPrice: 0 }
    );

    return NextResponse.json({
      totalPrice: total.totalPrice, // Total price of all books
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Failed to retrieve payments" },
      { status: 500 }
    );
  }
}
