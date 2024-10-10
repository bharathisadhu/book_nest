//....................Main code....................

import connectToDatabase from "@/lib/mongodb";
import { Book} from "../../../../models/Book";
import { NextResponse } from "next/server";


export async function GET(request) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      // Fetch a single book by ID
      const book = await Book.findById(id);
      if (!book) {
        return NextResponse.json({ success: false, message: "Book not found" }, { status: 404 });
      }
      return NextResponse.json(book);
    } else {
      // Fetch all books
      const books = await Book.find({});
      return NextResponse.json(books);
    }
  } catch (error) {
    console.error('Error fetching books:', error);
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
