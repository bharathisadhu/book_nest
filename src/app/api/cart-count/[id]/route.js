// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/mongodb';
 
// export async function POST(request, { params }) {
//   const { id } = params;
//   const bookData = await request.json();

//   try {
//     const client = await connectToDatabase();
//     const db = client.db();

//     // Check if the book is already in the cart
//     const existingCartItem = await db.collection('cart').findOne({ bookId: id });

//     if (existingCartItem) {
//       return NextResponse.json(
//         { message: 'This book is already in your cart' },
//         { status: 409 }
//       );
//     }

//     // Add the book to the cart
//     const result = await db.collection('cart').insertOne({
//       bookId: id,
//       ...bookData,
//       addedAt: new Date(),
//     });

//     return NextResponse.json(
//       { message: 'Book added to cart successfully', id: result.insertedId },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Error adding book to cart:', error);
//     return NextResponse.json(
//       { message: 'Failed to add book to cart' },
//       { status: 500 }
//     );
//   }
// }

import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Cart } from "../../../../../models/Book";

export async function POST(request, { params }) {
  const { id } = params;
  const {
    name,
    description,
    image,
    author,
    price,
    rating,
    category,
    cardCount,
    email,
  } = await request.json();

  await connectToDatabase();

  const existingItem = await Cart.findOne({ _id: id });
  if (existingItem) {
    return NextResponse.json(
      { message: "Book is already in your Cart" },
      { status: 409 }
    );
  }

  const newItem = await Cart.create({
    name,
    description,
    image,
    author,
    price,
    rating,
    category,
    cardCount,
    email,
  });

  return NextResponse.json(
    { message: "Book added to cart", item: newItem },
    { status: 201 }
  );
}
