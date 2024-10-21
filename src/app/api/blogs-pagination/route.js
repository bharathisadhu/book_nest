import connectToDatabase from "@/lib/mongodb";
import { Blog } from "../../../../models/Book";

export async function GET(req) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;
    const blogs = await Blog.find({})
    .skip(skip)
    .limit(limit);

    const totalBlogs = await Blog.countDocuments();

    // const blogs = await Blog.find({});
    return new Response(JSON.stringify({
      success: true,
      data: blogs,
      total: totalBlogs,
      page,
      totalPages: Math.ceil(totalBlogs / limit),
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



