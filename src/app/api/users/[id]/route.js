import connectToDatabase from "@/lib/mongodb";
import Users from "../../../../../models/Users";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params; // Extract the user ID from the request params
  const { newName, newEmail, newImage, newPhoto, newRole } =
    await request.json(); // Extract data from the request body
  await connectToDatabase();
  // Create an object to update only the fields that are passed
  const updateFields = {
    ...(newName && { name: newName }), // Update name only if provided
    ...(newEmail && { email: newEmail }), // Update email only if provided
    ...(newImage && { image: newImage }), // Update image if provided
    ...(newPhoto && { photo: newPhoto }), // Update photo if provided
    ...(newRole && { role: newRole }), // Update photo if provided
  };

  // Ensure you're updating with the fields that exist
  const updatedUser = await Users.findByIdAndUpdate(id, updateFields, {
    new: true,
  });

  if (!updatedUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "User Updated", user: updatedUser },
    { status: 200 }
  );
}

export async function GET(request, { params }) {
  const { id } = params; // Extract the user ID from the request params
  await connectToDatabase();

  // Ensure you're using the correct ID format
  const user = await Users.findOne({ _id: id });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}
