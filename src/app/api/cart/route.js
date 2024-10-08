// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/mongodb';

// export async function GET() {
//   try {
//     const client = await connectToDatabase();
//     const db = client.db();

//     const cart = await db.collection('cart').find({}).toArray();

//     return NextResponse.json({ cart });
//   } catch (error) {
//     console.error('Error fetching cart:', error);
//     return NextResponse.json(
//       { message: 'Failed to fetch cart' },
//       { status: 500 }
//     );
//   }
// }

import connectToDatabase from "@/lib/mongodb"
import { Cart } from "../../../../models/Book"
import { NextResponse } from "next/server"


export async function GET() {
    await connectToDatabase()
    const cart = await Cart.find()
    return NextResponse.json(cart)
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id")
    await connectToDatabase()
    await Cart.findByIdAndDelete(id)
    return NextResponse.json({ message: "Book deleted" }, { status: 200 })
}
