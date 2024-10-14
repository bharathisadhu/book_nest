// pages/api/users/[email].js
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/connectToDatabase'; // Adjust the path as necessary
import Users from '../../../models/Users'; // Adjust the path as necessary

export async function GET(request, { params }) {
  const { email } = params; // Get the email from the URL params
  const sanitizedEmail = email.trim().toLowerCase(); // Sanitize the email

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
