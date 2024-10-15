import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Users from "../../../../models/Users";

export async function GET() {
  await connectToDatabase();
  const users = await Users.find();
  return NextResponse.json( users );
}