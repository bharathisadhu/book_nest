import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Payment from "../../../../models/Payment";

// POST: Create a new payment (Stripe or COD)
export async function POST(req) {
  try {
    await connectDB(); // Connect to your database

    const body = await req.json(); // Parse the request body
    console.log("Request Body:", body); // Log the request body to verify the data

    const {
      name,
      email,
      address,
      city,
      country,
      postalCode,
      books,
      totalAmount,
      transactionId,
    } = body;

    // Validate required fields
    const requiredFields = [
      "name",
      "email",
      "address",
      "city",
      "country",
      "postalCode",
      "books",
      "totalAmount",
      "transactionId",
    ];

    // Ensure all required fields are present
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Round totalAmount to avoid floating-point precision issues
    const roundedTotalAmount = Math.round(totalAmount * 100) / 100;

    // Create a new payment object
    const newPayment = new Payment({
      name,
      email,
      address,
      city,
      country,
      postalCode,
      books,
      totalAmount: roundedTotalAmount,
      transactionId,
      status: "pending", // Default status is "pending"
      date: new Date(), // Current date
    });

    // Log the new payment before saving to verify all fields
    console.log("New Payment Object:", newPayment);

    // Save the payment to the database
    await newPayment.save();

    // Log and return success response
    console.log("Payment created successfully:", newPayment);
    return NextResponse.json(
      {
        message: "Payment created successfully",
        payment: {
          email: newPayment.email,
          name: newPayment.name,
          address: newPayment.address,
          city: newPayment.city,
          country: newPayment.country,
          postalCode: newPayment.postalCode,
          transactionId: newPayment.transactionId,
          date: newPayment.date,
          books: newPayment.books,
          totalAmount: newPayment.totalAmount,
          status: newPayment.status,
          _id: newPayment._id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    );
  }
}
