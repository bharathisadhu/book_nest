// /api/create-payment-intent/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectDB from "@/lib/connectDB";
import Payment from "../../../../models/Payment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  console.log("hit payment intent route");
  try {
    await connectDB();

    const { price, email, _id, name } = await req.json();
    const amount = parseInt(price * 100); // Convert to cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    // Save payment with "pending" status
    const payment = new Payment({
      email,
      price,
      transactionId: paymentIntent.id,
      bookId: _id,
      bookName: name,
      status: "pending", // Initially "pending"
      // Add the required field here
      name, // Include the name field
    });

    await payment.save();

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
