import connectToDatabase from "@/lib/mongodb";
import Users from "../../../../../models/Users";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const  {id}  = params;
  const {
    newName: name,
    newEmail: email,
    newPassword: password,
    newImage: image,
  } = await request.json();
  await connectToDatabase();
  await Users.findByIdAndUpdate(id,  name, email, password, image );
  return NextResponse.json({ message: "User Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectToDatabase()
  const users = await Users.findOne({_id: id})
  return NextResponse.json(users, {status: 200})
}
