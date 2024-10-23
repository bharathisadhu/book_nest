import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import connectDB from "@/lib/connectDB";
import { WishList } from "../../../../../models/Book";

let db;

// Handle POST requests
export async function POST(request, { params }) {
  const wishlistData = await request.json();
  const { email } = wishlistData;

  db = await connectDB();

  try {
    // Check if the book is already in the wishlist for the given user (email and BookId)
    const existingItem = await db.collection("wishlists").findOne({
      email,
      BookId: new ObjectId(wishlistData.BookId), // Assuming BookId is part of wishlistData
    });

    if (existingItem) {
      return NextResponse.json(
        { message: `${wishlistData.name} is already in the wishlist` },
        { status: 409 }
      );
    }

    // Insert the new wishlist item into the 'wishlists' collection
    const result = await db.collection("wishlists").insertOne({
      email,
      ...wishlistData,
      BookId: new ObjectId(wishlistData.BookId),
    });

    // Return the inserted wishlist item in the response
    return NextResponse.json(
      { success: true, data: { ...wishlistData, id: result.insertedId } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// Handle GET requests
export async function GET(request, { params }) {
  const { email } = params;

  await connectDB();

  try {
    const individualWishList = await WishList.find({ email: email });
    return NextResponse.json(individualWishList, { status: 200 });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
