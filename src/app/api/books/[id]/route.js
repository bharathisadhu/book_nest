import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";

let db;

export async function GET(request, { params }) {
  const { id } = params;

  db = await connectDB();
  let book = await db.collection("books").findOne({ _id: id });
  return NextResponse.json(book);
}
