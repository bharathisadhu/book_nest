import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Users from "../../../../models/Users";

export async function GET() {
  await connectToDatabase();
  const users = await Users.find();
  return NextResponse.json( users );
}


export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
  
    if (!id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }
  
    await connectToDatabase();
  
    try {
      await Users.findByIdAndDelete(id);
      return NextResponse.json({ message: "User Deleted" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Failed to delete user", error: error.message }, { status: 500 });
    }
  }