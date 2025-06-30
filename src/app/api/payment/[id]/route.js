import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
 
let db;

export async function PUT(request, { params }) {
  db = await connectDB();
  const { id } = params; // Extract the ID from the parameters
  const updatedData = await request.json(); // Get the updated data from the request body

  try {
    // Update the payment in the database by ID
    const result = await db.collection("payments").updateOne(
      { _id: new ObjectId(id) }, // Use ObjectId to find the correct payment
      { $set: updatedData } // Set the updated data
    );

    // Check if the payment was found and updated
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Payment not found" },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json(
      { success: true, message: "Payment updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating payment:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update payment" },
      { status: 500 }
    );
  }
}
