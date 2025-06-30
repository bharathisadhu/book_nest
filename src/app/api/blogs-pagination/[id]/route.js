import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Blog } from "../../../../../models/Book";
 





export async function GET(request, { params }) {
  const { id } = params;
  await connectToDatabase();


  try {
    const topic = await Blog.findOne({ _id: id });
    return NextResponse.json({ topic }, { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Unable to fetch blogs" }),
      {
        status: 500,
      }
    );
  }




}

