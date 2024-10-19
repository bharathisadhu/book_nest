import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectDB from "@/lib/connectDB";
import Payment from "../../../../models/Payment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  try {
    await connectDB();

    // Parse the request body
    const data = await req.json();
    const { books, email, name } = data;

    // Log request data for debugging
    console.log("Request data:", data);

    if (!Array.isArray(books)) {
      throw new Error("Books must be an array");
    }

    // Calculate the total amount
    const totalAmount = books.reduce((total, book) => {
      return total + book.price * book.cardCount;
    }, 0);

    // Convert the totalAmount to cents for Stripe
    const amountInCents = Math.round(totalAmount * 100);

    // Log the amount in cents for debugging
    console.log("Total amount in cents:", amountInCents);

    // Check if the total amount meets the minimum charge amount
    if (amountInCents < 50) {
      // Assuming the minimum is 50 cents (0.50 USD)
      return NextResponse.json(
        { error: "The total amount must be at least $0.50 USD" },
        { status: 400 }
      );
    }

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents, // Amount in cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    // Log the payment intent response for debugging
    console.log("Payment intent created:", paymentIntent);

    // Save payment with "pending" status
    const payment = new Payment({
      email,
      name,
      books,
      totalAmount,
      transactionId: paymentIntent.id,
      status: "pending",
      date: new Date(),
    });

    await payment.save();

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    // Log detailed error response for debugging
    console.error("Error creating payment intent:", error);

    return NextResponse.json(
      { error: "Failed to create payment intent", details: error.message },
      { status: 500 }
    );
  }
}
