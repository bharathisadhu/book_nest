import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";
 
let db;

export async function GET(request, { params }) {
  const { id } = params;

  db = await connectDB();

  const payments = await db.collection("payments").findOne({ _id: new ObjectId(id) }); // Convert id to ObjectId
  if (!payments) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(payments);
}


