import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { Payment } from "../../../../../models/Payment";
import connectToDatabase from "@/lib/mongodb";

let db;

// Handle POST requests
// Handle POST requests


// Handle GET requests
export async function GET(request, { params }) {
  const { email } = params;

  await connectToDatabase();

  try {


    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const Payment = await Payment.find({ email: email })
      .skip(skip)
      .limit(limit);
      
      const totalPayment = await Payment.countDocuments({ email: email });

    if (!Payment) {
      return NextResponse.json(
        { message: " individualCart not found" },
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({
      success: true,
      data:Carts,
      email: email,
      total: totalPayment,
      page,
      totalPages: Math.ceil(totalPayment / limit),
      
    }), {
      status: 200,
    });






    


    // console.log(individualCart);
    return NextResponse.json(individualCart, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
