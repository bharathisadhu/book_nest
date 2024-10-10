import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectDB from "@/lib/mongodb"; // Adjust the path based on your project structure
import Users from "../../../../models/Users"; // Ensure the path to your Users model is correct

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { email, plan } = await request.json();

    // Define price IDs for the plans
    const priceId =
      plan === "pro"
        ? process.env.STRIPE_PRO_PLAN_ID
        : process.env.STRIPE_FREE_PLAN_ID;

    // Create a new Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer_email: email,
      success_url: `${request.headers.get(
        "origin"
      )}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/cancel`,
    });

    console.log("Stripe session created:", session);

    // Connect to the database
    const db = await connectDB(); // Make sure to await the DB connection

    // Update user subscription in the database if the session is created successfully
    if (plan === "pro") {
      const userUpdateResult = await Users.updateOne(
        { email: email },
        { $set: { subscriptionPlan: "Pro" } }
      );

      // Check if the user was found and updated
      if (userUpdateResult.matchedCount === 0) {
        console.warn("No user found with the specified email.");
      } else {
        console.log("User subscription updated to Pro");
      }
    }

    // Fetch the updated user subscription status
    const user = await Users.findOne({ email });

    // Log the user data for verification
    console.log("User retrieved:", user);

    // Create the response and set CORS headers
    const response = NextResponse.json({
      url: session.url,
      subscriptionStatus: user ? user.subscriptionPlan : "Not found",
    });

    // Set CORS headers
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://booknest-self.vercel.app" // Ensure no trailing slash
    );
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  const response = NextResponse.json({});
  
  // Set CORS headers
  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://booknest-self.vercel.app" // Ensure no trailing slash
  );
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  
  return response;
}
