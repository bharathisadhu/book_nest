import connectToDatabase from "@/lib/mongodb";
import { Blog } from "../../../../models/Book";

export async function GET(req) {
  await connectToDatabase();

  try {
   
    
    const blogs = await Blog.find({});
    return new Response(JSON.stringify(blogs), {
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

export async function POST(req) {
  await connectToDatabase(); // Ensure DB is connected

  try {
    const body = await req.json(); // Parse the request body
    const blog = await Blog.create(body); // Create a new book
    return new Response(JSON.stringify({ success: true, data: blog }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Failed to add Blog" }),
      {
        status: 400,
      }
    );
  }
}



