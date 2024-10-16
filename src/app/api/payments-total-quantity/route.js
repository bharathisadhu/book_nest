import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Payment from "../../../../models/Payment";



// GET: Retrieve all payments
export async function GET(req) {
  try {
    await connectDB();

   
    const response = await fetch('https://booknest-self.vercel.app/api/payments');
    const data = await response.json();
    // Get the query parameters
    const url = new URL(req.url);
    const bookId = url.searchParams.get('blogId');

     // Calculate the total quantity for the specified bookId
      let totalQuantity = 0;
    data.forEach(order => {
      order.books.forEach(book => {
        if (book.bookId === bookId) {
          totalQuantity += book.quantity;
        }
      });
    });

    return NextResponse.json(totalQuantity);



  


  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Failed to retrieve payments" },
      { status: 500 }
    );
  }
}
