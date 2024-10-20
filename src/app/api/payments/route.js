// import { NextResponse } from "next/server";
// import connectDB from "@/lib/connectDB";
// import { Payment } from "../../../../models/Payment";

// let db;

// // POST: Create a new payment (Stripe or COD)
// export async function POST(req) {
//   try {
//     db = await connectDB();
//     // await connectDB(); // Connect to your database

//     const body = await req.json(); // Parse the request body
//     console.log("Request Body:", body); // Log the request body to verify the data

//     // Round totalAmount to avoid floating-point precision issues
//     const roundedTotalAmount = Math.round(totalAmount * 100) / 100;

//     // Create a new payment object

//     const newPayment = await db.collection("payments").insertOne(body);

//     // Log the new payment before saving to verify all fields
//     console.log("New Payment Object:", newPayment);

//     // Save the payment to the database
//     // await newPayment.save();

//     // Log and return success response
//     console.log("Payment created successfully:", newPayment);
//     return NextResponse.json(newPayment);
//   } catch (error) {
//     console.error("Error creating payment:", error);
//     return NextResponse.json(
//       { error: "Failed to create payment" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { Payment } from "../../../../models/Payment";

let db;
export async function POST(request) {
  db = await connectDB();
  const newPayment = await request.json();
  console.log("new Payments: ", newPayment);

  // Insert the new book into the database
  const result = await db.collection("payments").insertOne(newPayment);
  console.log("from payments:", result);

  return NextResponse.json(result);
}

export async function GET(request) {
  db = await connectDB();

  try {
    // Fetch all payments
    const payments = await Payment.find({});
    return NextResponse.json(payments);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { success: false, message: "Unable to fetch payment" },
      { status: 500 }
    );
  }
}
