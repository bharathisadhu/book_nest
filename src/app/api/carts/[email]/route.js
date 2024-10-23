import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { Cart } from "../../../../../models/Book";
import connectToDatabase from "@/lib/mongodb";

let db;

// Handle POST requests
// Handle POST requests
export async function POST(request) {
  db = await connectDB();

  const newCartItem = await request.json();
  const { BookId, email, name } = newCartItem;

  // Check if the book is already in the cart for the given user (email and BookId)
  const existingItem = await db.collection("carts").findOne({
    email,
    BookId: new ObjectId(BookId),
  });

  if (existingItem) {
    return NextResponse.json(
      { message: `${name} already in cart` },
      { status: 409 }
    );
  }

  // Insert the new cart item into the 'carts' collection
  const result = await db.collection("carts").insertOne({
    ...newCartItem,
    BookId: new ObjectId(BookId),
  });

  // Return the inserted cart item in the response
  return NextResponse.json(
    { success: true, data: { ...newCartItem, id: result.insertedId } },
    { status: 201 }
  );
}

// Handle GET requests
export async function GET(request, { params }) {
  const { email } = params;

  await connectToDatabase();

  try {
    const individualCart = await Cart.find({ email: email });
    if (!individualCart) {
      return NextResponse.json(
        { message: " individualCart not found" },
        { status: 404 }
      );
    }

    


    // console.log(individualCart);
    return NextResponse.json(individualCart, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
