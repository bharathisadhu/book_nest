import connectToDatabase from "@/lib/mongodb";
import { Book } from "../../../../models/Book";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;
    const Books = await Book.find({})
    .skip(skip)
    .limit(limit);

    const totalBooks = await Book.countDocuments();

    // const blogs = await Blog.find({});
    return new Response(JSON.stringify({
      success: true,
      data: Books,
      total: totalBooks,
      page,
      totalPages: Math.ceil(totalBooks / limit),
  }), {
      status: 200,
    });

    
    
    
  
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Unable to fetch blogs" }),
      {
        status: 500,
      }
    );
  }
}


