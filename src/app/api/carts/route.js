import connectToDatabase from "@/lib/mongodb";
import { Cart } from "../../../../models/Book";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDatabase(); // Ensure DB is connected

  try {
    const body = await req.json(); // Parse the request body
    console.log(body);
    // Ensure email exists in the body
    if (!body.email) {
      return new Response(
        JSON.stringify({ success: false, message: "Email is required" }),
        { status: 400 }
      );
    }

    // Create a new cart item including the email field
    const cartItem = await Cart.create(body); // The email field will be saved automatically
    console.log(cartItem);
    return new Response(JSON.stringify({ success: true, data: cartItem }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to add book" }),
      {
        status: 400,
      }
    );
  }
}

export async function GET() {
  await connectToDatabase();
  const cart = await Cart.find();
  return NextResponse.json({ cart });
}
