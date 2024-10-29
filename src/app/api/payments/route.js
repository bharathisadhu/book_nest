import { NextResponse } from "next/server";
import { Payment } from "../../../../models/Payment"; // Ensure this imports correctly
import connectDB from "@/lib/connectDB";

let db;

export async function POST(request) {
  db = await connectDB();
  const newPayment = await request.json();

  // Insert the new payment into the database
  const result = await db.collection("payments").insertOne(newPayment);

  return NextResponse.json(result);
}

export async function GET(request) {
  db = await connectDB();

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page")) || 1; // Default to page 1
  const limit = parseInt(url.searchParams.get("limit")) || 10; // Default to 10 items per page
  const skip = (page - 1) * limit; // Calculate how many documents to skip

  try {
    // Fetch payments with pagination
    const payments = await Payment.find({})
      .skip(skip) // Skip the documents based on the current page
      .limit(limit); // Limit the number of documents returned

    const totalPayments = await Payment.countDocuments(); // Count total payments for pagination
    const totalPages = Math.ceil(totalPayments / limit); // Calculate total pages

    return NextResponse.json({
      data: payments,
      totalPages, // Return total pages for frontend pagination
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { success: false, message: "Unable to fetch payments" },
      { status: 500 }
    );
  }
}
