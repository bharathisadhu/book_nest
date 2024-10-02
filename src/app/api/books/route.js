//....................Main code....................

import connectToDatabase from "@/lib/mongodb";
import { Book,} from "../../../../models/Book";


export async function GET(req) {
  await connectToDatabase();

  try {
    const books = await Book.find({});
    return new Response(JSON.stringify(books), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Unable to fetch books" }),
      {
        status: 500,
      }
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
