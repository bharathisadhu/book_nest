import connectToDatabase from "@/lib/mongodb";
import { Cart } from "../../../../../models/Book";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { email } = params;

  await connectToDatabase();

  try {
    const individualCart = await Cart.find({ email: email });
    if (!individualCart) {
      return NextResponse.json(
        { message: " individualCart not found" },
        { status: 404 }
      );
    }
    // console.log(individualCart);
    return NextResponse.json(individualCart, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
