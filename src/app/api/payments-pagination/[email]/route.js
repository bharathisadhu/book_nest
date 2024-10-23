import { NextResponse } from "next/server";
import { Payment } from '../../../../../models/Payment';

import connectToDatabase from "@/lib/mongodb";

// Handle GET requests
export async function GET(request, { params }) {
  const { email } = params;

  await connectToDatabase();

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const payments = await Payment.find({ email: email });
    

    const totalPayment = await Payment.countDocuments({ email: email });


    if (!totalPayment) {
      return NextResponse.json(
        { message: "Payment not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      data:payments,
      email: email,
      
      page,
      total:totalPayment,
      totalPages: Math.ceil(totalPayment / limit),
    }, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}