import connectToDatabase from "@/lib/mongodb";
import { Cart } from "../../../../models/Book";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDatabase();

  try {
    const body = await req.json();

    if (!body.email) {
      return new Response(
        JSON.stringify({ success: false, message: "Please Login" }),
        { status: 400 }
      );
    }

    // Check if the book with the same _id and email already exists in the cart
    const existingCartItem = await Cart.findOne({
      email: body.email,
      bookId: body._id, // Ensure you are passing the bookId
    });

    // if (existingCartItem) {
    //   return new Response(
    //     JSON.stringify({ success: false, message: "Book already in cart" }),
    //     { status: 409 } // Conflict if already exists
    //   );
    // }

    // Create a new cart item using the existing book _id
    const cartItem = await Cart.create(body);
    return new Response(JSON.stringify({ success: true, data: cartItem }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to add book to cart" }),
      { status: 400 }
    );
  }
}

export async function GET() {
  await connectToDatabase();
  const cart = await Cart.find();
  return NextResponse.json({ cart });
}
