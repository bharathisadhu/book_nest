import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Users from "../../../../models/Users";

export async function GET(req) {
  await connectToDatabase();
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const users = await Users.find({})
    .skip(skip)
    .limit(limit);

    const totalUsers = await Users.countDocuments();
 

   
    return new Response(JSON.stringify({
      success: true,
      data: users,
      total: totalUsers,
      page,
      totalPages: Math.ceil(totalUsers / limit),
    
  }), {
      status: 200,
    });




  }catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Unable to fetch users" }),
      {
        status: 500,
      }
    );

  }



}

