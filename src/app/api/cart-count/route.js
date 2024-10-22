

import connectToDatabase from "@/lib/mongodb"
import { Cart } from "../../../../models/Book"
import { NextResponse } from "next/server"


export async function GET() {
    await connectToDatabase()
    const cart = await Cart.find()
    const total = cart.reduce(
        (acc, book) => {
          acc.totalPrice += book.price * book.cardCount;
          acc.totalcardCount += book.cardCount;
          return acc;
        },
        { totalPrice: 0, totalcardCount: 0 }
      )




      return NextResponse.json({
        
        totalPrice: total.totalPrice,    // Total price of all books
        totalcardCount: total.totalcardCount,  // Total cardCount of all books
      });
    
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id")
    await connectToDatabase()
    await Cart.findByIdAndDelete(id)
    return NextResponse.json({ message: "Book deleted" }, { status: 200 })
}
