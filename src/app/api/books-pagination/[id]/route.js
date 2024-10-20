import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";

let db;

export async function GET(request, { params }) {
  const { id } = params;

  db = await connectDB();

  const book = await db.collection("books").findOne({ _id: id });
  return NextResponse.json(book);
}

// POST method to create a new book
export async function POST(request) {
  db = await connectDB();
  const newBook = await request.json();

  // Insert the new book into the database
  const result = await db.collection("books").insertOne(newBook);

  return NextResponse.json(
    { message: "Book created successfully", bookId: result.insertedId },
    { status: 201 }
  );
}

// PUT method to update an existing book
export async function PUT(request, { params }) {
  const { id } = params;
  db = await connectDB();
  const updatedBook = await request.json();

  // Update the book in the database
  const result = await db
    .collection("books")
    .updateOne({ _id: id }, { $set: updatedBook });

  if (result.matchedCount === 0) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Book updated successfully" });
}

// DELETE method to remove a book
export async function DELETE(request, { params }) {
  const { id } = params;
  db = await connectDB();

  // Delete the book from the database
  const result = await db.collection("books").deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Book deleted successfully" });
}
