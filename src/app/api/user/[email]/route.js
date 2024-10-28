import { NextResponse } from "next/server";
import Users from "../../../../../models/Users";
import connectToDatabase from "@/lib/mongodb";
import connectDB from "@/lib/connectDB";

export async function GET(request, { params }) {
  const { email } = params;
  const sanitizedEmail = email.trim().toLowerCase();

  await connectToDatabase();

  try {
    const user = await Users.findOne({ email: sanitizedEmail });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// export async function PUT(request, { params }) {
//   const { email } = params;
//   const sanitizedEmail = email.trim().toLowerCase();
//   const { name, image } = await request.json(); // Get the updated name and image from the request body

//   await connectToDatabase();

//   try {
//     // Check if the user exists before updating
//     const user = await Users.findOne({ email: sanitizedEmail });
//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     // Update user data
//     const updatedUser = await Users.findOneAndUpdate(
//       { email: sanitizedEmail },
//       { name, image }, // Ensure these fields match your database
//       { new: true } // Return the updated document
//     );

//     return NextResponse.json(updatedUser, { status: 200 });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

let db;

export async function PATCH(request, { params }) {
  const { email } = params;
  const sanitizedEmail = email.trim().toLowerCase();
db = await connectDB()
  const updateData = await request.json();
  console.log("Update data received in PATCH request:", updateData); // Log updateData

  try {
      const user = await db.collection("users").findOne({ email: sanitizedEmail });
      if (!user) {
          return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      const updatedUser = await db.collection("users").findOneAndUpdate(
          { email: sanitizedEmail },
          { $set: updateData },
          { returnDocument: 'after' } // This will return the updated document
      );

      console.log("Updated user data:", updatedUser); // Log updated user data
      return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
      console.error("Error updating user:", error);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
}

}



