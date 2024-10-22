import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Payment from "../../../../models/Payment";




// GET: Retrieve all payments
export async function GET(req) {
  try {
    await connectDB();

   
    // const response = await fetch('https://booknest-self.vercel.app/api/payments');
    // const data = await response.json();

    //http://localhost:3000/api/payments-total-quantity?blogId=66f2b86492d389553d55b018
    

    const data = [
    {
      "_id": "670ed8238e81d91c9096962b",
      "email": "monsur286512@gmail.com",
      "name": "Abul Monsur Mohammad Kachru",
      "books": [
        {
          "bookId": "66f2b86492d389553d55b00e",
          "bookName": "1984",
          "quantity": 5,
          "price": 9.99
        },
        {
          "bookId": "66f2b86492d389553d55b00f",
          "bookName": "The Glass Castle",
          "quantity": 1,
          "price": 10.99
        },
        {
          "bookId": "66f2b86492d389553d55b010",
          "bookName": "1984",
          "quantity": 110,
          "price": 9.99
        }
      ],
      "totalAmount": 12876.479,
      "transactionId": "pi_3QAHrqP0DlsQZQqr1Jq3AvQs",
      "status": "completed"
    },
   
  ];


    // Get the query parameters
    const url = new URL(req.url);
    const bookId = url.searchParams.get('blogId');

     // Calculate the total quantity for the spec 
      let totalQuantity = 0;
      data.forEach(order => {
        order.books.forEach(book => {
          if (book.bookId === bookId) {
            totalQuantity += book.quantity;
          }
        });
    });



    return NextResponse.json(bookId);



  


  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Failed to retrieve payments" },
      { status: 500 }
    );
  }
}
