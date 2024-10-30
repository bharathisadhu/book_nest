// api/payments/[email]/route.js
import { NextResponse } from "next/server";
import { Payment } from "../../../../../models/Payment";
import connectDB from "@/lib/connectDB";

// Handle GET requests
export async function GET(request, { params }) {
  const { email } = params;

  await connectDB();

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const payments = await Payment.find({ email: email })
      .skip(skip)
      .limit(limit);

    const totalPayment = await Payment.countDocuments({ email: email });

    if (!payments) {
      return NextResponse.json(
        { message: " individualPayment not found" },
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: payments,
        email: email,
        total: totalPayment,
        page,
        totalPages: Math.ceil(totalPayment / limit),
      }),
      {
        status: 200,
      }
    );

    // return NextResponse.json(individualWishList, { status: 200 });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
