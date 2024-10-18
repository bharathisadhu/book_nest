import connectToDatabase from "@/lib/mongodb";
import { WishList } from "../../../../../models/Book";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { email } = params;

  await connectToDatabase();

  try {
    const individualWishList = await WishList.find({ email: email });
    if (!individualWishList) {
      return NextResponse.json(
        { message: " individualCart not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(individualWishList, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
