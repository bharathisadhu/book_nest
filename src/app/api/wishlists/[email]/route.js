import connectToDatabase from "@/lib/mongodb";
import { WishList } from "../../../../../models/Book";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { email } = params;

  await connectToDatabase();

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const wishlists = await WishList.find({ email: email })
       .skip(skip)
      .limit(limit);
      
      const totalWishList = await WishList.countDocuments({ email: email });

    if (!wishlists) {
      return NextResponse.json(
        { message: " individualCart not found" },
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({
      success: true,
      data:wishlists,
      email: email,
      total: totalWishList,
      page,
      totalPages: Math.ceil(totalWishList / limit),
      
    }), {
      status: 200,
    });



    // return NextResponse.json(individualWishList, { status: 200 });


  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}