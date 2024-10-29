import connectDB from "@/lib/connectDB";
import { Payment } from "../../../../../models/Payment";
import { NextResponse } from "next/server"; // Import NextResponse for response handling

export async function GET(request, { params }) {
  const { email } = params;

  await connectDB();

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Fetch payments with pagination
    const payments = await Payment.find({ email: email })
      .skip(skip)
      .limit(limit);

    const totalPayment = await Payment.countDocuments({ email: email });

    if (totalPayment === 0) {
      return NextResponse.json(
        { message: "No payments found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: payments,
        email: email,
        page,
        total: totalPayment,
        totalPages: Math.ceil(totalPayment / limit),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
