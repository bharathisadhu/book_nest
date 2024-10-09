

import connectToDatabase from "@/lib/mongodb";
import Users from "../../../../../models/Users";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params; // Make sure this is correctly extracted
  const {
    newName: name,
    newEmail: email,
    newPassword: password,
    newImage: image,
  } = await request.json();

  await connectToDatabase();

  // Ensure you're updating with an object
  await Users.findByIdAndUpdate(id, { name, email, password, image });

  return NextResponse.json({ message: "User Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params; // Make sure this is correctly extracted
  await connectToDatabase();

  // Ensure you're using the correct ID format
  const user = await Users.findOne({ _id: id });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}
