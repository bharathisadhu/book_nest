import connectToDatabase from "@/lib/mongodb";
import { Book } from "../../../../models/Book";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectToDatabase();
 
  try {
    // Fetch all books
    const books = await Book.find({});
    return NextResponse.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { success: false, message: "Unable to fetch books" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await connectToDatabase(); // Ensure DB is connected

  try {
    const body = await req.json(); // Parse the request body
    const book = await Book.create(body); // Create a new book
    return new Response(JSON.stringify({ success: true, data: book }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Failed to add book" }),
      {
        status: 400,
      }
    );
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await Book.findByIdAndDelete(id);
  return NextResponse.json({ message: "Book deleted" }, { status: 200 });
}
