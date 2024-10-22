import connectToDatabase from "@/lib/mongodb";
import { Payment } from "../../../../models/Payment";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectToDatabase();

  try {
     const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const payments = await Payment.find({})
    .skip(skip)
    .limit(limit);
    const totalPayment = await Payment.countDocuments();

       return new Response(JSON.stringify({
      success: true,
      data: payments,
      total: totalPayment,
      page,
      totalPages: Math.ceil(totalPayment / limit),
     
      }), {
      status: 200,
    });

    
    
    
  
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Unable to fetch Books" }),
      {
        status: 500,
      }
    );
  }
}


