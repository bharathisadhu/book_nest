import connectToDatabase from "@/lib/mongodb"
import { WishList } from "../../../../models/Book"
import { NextResponse } from "next/server"


export async function GET() {
    await connectToDatabase()
    const wishList = await WishList.find()
    return NextResponse.json({ wishList })
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id")
    await connectToDatabase()
    await WishList.findByIdAndDelete(id)
    return NextResponse.json({ message: "Book deleted" }, { status: 200 })
}