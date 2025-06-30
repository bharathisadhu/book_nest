import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectDB from "@/lib/connectDB";
 
let db;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  try {
    // db = await connectDB();
    // Parse the request body
    const data = await req.json();
    const { books } = data;
    // Log request data for debugging
    // Calculate the total amount
    const totalAmount = books.reduce((total, book) => {
      return total + book.price * book.quantity;
    }, 0);
    // Convert the totalAmount to cents for Stripe
    const amountInCents = Math.round(totalAmount * 100);
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
