import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Cart, WishList } from "../../../../models/Book";


export async function POST(request, { params }) {
    const { id } = params;
    const { email, name, description, image, author, price, rating, category } = await request.json();

    await connectToDatabase();

    const existingItem = await WishList.findOne({ _id: id });
    if (existingItem) {
        return NextResponse.json({ message: "Book is already in your wishlist" }, { status: 409 });
    }

    const newItem = await WishList.create({
        email,
        name,
        description,
        image,
        author,
        price,
        rating,
        category
    });

    return NextResponse.json({ message: "Book added to wishlist", item: newItem }, { status: 201 });
}
