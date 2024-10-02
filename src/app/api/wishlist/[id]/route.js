import { NextResponse } from "next/server";
import { WishList } from "../../../../../models/Book";
import connectToDatabase from "@/lib/mongodb";





export async function POST(request, {params}) {
  const { id } = params; 
  const { name, description, image, author, price, rating, category } = await request.json();
  
  await connectToDatabase();
  
  const newItem = await WishList.create({
    name,
    description,
    image,
    author,
    price,
    rating,
    category
  });
  
  return NextResponse.json({ message: "Book add to wishlist", item: newItem }, { status: 201 });
}


