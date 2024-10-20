import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";

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
