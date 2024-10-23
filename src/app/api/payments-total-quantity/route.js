// import { NextResponse } from "next/server";
// import connectDB from "@/lib/connectDB";
// import Payment from "../../../../models/Payment";



// // GET: Retrieve all payments
// export async function GET(req) {
//   try {
//     await connectDB();

   
//     const response = await fetch('https://booknest-self.vercel.app/api/payments');
//     const data = await response.json();


    

//   //   const data = [
//   //   {
//   //     "_id": "670ed8238e81d91c9096962b",
//   //     "email": "monsur286512@gmail.com",
//   //     "name": "Abul Monsur Mohammad Kachru",
//   //     "books": [
//   //       {
//   //         "bookId": "66f2b86492d389553d55b00e",
//   //         "bookName": "1984",
//   //         "quantity": 5,
//   //         "price": 9.99
//   //       },
//   //       {
//   //         "bookId": "66f2b86492d389553d55b00f",
//   //         "bookName": "The Glass Castle",
//   //         "quantity": 1,
//   //         "price": 10.99
//   //       },
//   //       {
//   //         "bookId": "66f2b86492d389553d55b010",
//   //         "bookName": "1984",
//   //         "quantity": 110,
//   //         "price": 9.99
//   //       }
//   //     ],
//   //     "totalAmount": 12876.479,
//   //     "transactionId": "pi_3QAHrqP0DlsQZQqr1Jq3AvQs",
//   //     "status": "completed"
//   //   },
//   //   {
//   //     "_id": "670f2021753edc8433963a6e",
//   //     "email": "jrazad10@gmail.com",
//   //     "name": "Mohammad Azad",
//   //     "books": [
//   //       {
//   //         "bookId": "66f2b86492d389553d55b00e",
//   //         "bookName": "1984",
//   //         "quantity": 5,
//   //         "price": 9.99
//   //       },
//   //       {
//   //         "bookId": "66f2b86492d389553d55b00f",
//   //         "bookName": "The Glass Castle",
//   //         "quantity": 1,
//   //         "price": 10.99
//   //       },
//   //       {
//   //         "bookId": "66f2b86492d389553d55b010",
//   //         "bookName": "1984",
//   //         "quantity": 90,
//   //         "price": 9.99
//   //       }
//   //     ],
//   //     "totalAmount": 11705.89,
//   //     "transactionId": "pi_3QAMf7P0DlsQZQqr1z9OVtxJ",
//   //     "status": "pending"
//   //   }
//   // ];


    // // Get the query parameters
    // const url = new URL(req.url);
    // const bookId = url.searchParams.get('blogId');

    //  // Calculate the total quantity for the spec 
    //   let totalQuantity = 0;
    //   data.forEach(order => {
    //     order.books.forEach(book => {
    //       if (book.bookId === bookId) {
    //         totalQuantity += book.quantity;
    //       }
    //     });
    // });



//     return NextResponse.json(totalQuantity);



  


//   } catch (error) {
//     console.error("Error fetching payments:", error);
//     return NextResponse.json(
//       { error: "Failed to retrieve payments" },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";
// import connectDB from "@/lib/connectDB"; // Adjust import to your actual file

// export async function GET(req) {
//   try {
//     // Connect to the database
//     const db = await connectDB();

//     // Parse query parameters from the request URL
//     const { searchParams } = new URL(req.url);
//     const bookId = searchParams.get('bookId'); // Get the 'bookId' from the query string

//     if (!bookId) {
//       return NextResponse.json({ error: "bookId not provided" }, { status: 400 });
//     }

//     // Find all documents where the `bookId` exists in the books array
//     const payments = await db.collection("payments").find({
//       books: {
//         $elemMatch: { bookId }
//       }
//     }).toArray(); // Convert the cursor to an array

//     if (payments.length === 0) {
//       return NextResponse.json({ error: "No purchases found for the given bookId" }, { status: 404 });
//     }

//     // Return all the payments where this bookId was purchased
//     return NextResponse.json(payments);
//   } catch (error) {
//     console.error("Error fetching payments:", error);
//     return NextResponse.json(
//       { error: "Failed to retrieve payments" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";// Adjust import to your actual file

export async function GET(req) {
  try {
    // Connect to the database
    const db = await connectDB();

    // Get the query parameters
    const url = new URL(req.url);
    const bookId = url.searchParams.get('bookId'); // Corrected the parameter name to `bookId`

    if (!bookId) {
      return NextResponse.json({ error: "bookId not provided" }, { status: 400 });
    }

    // Find all documents where the `bookId` exists in the books array
    const payments = await db.collection("payments").find({
      books: {
        $elemMatch: { bookId }
      }
    }).toArray(); // Convert the cursor to an array

    // if (payments.length === 0) {
    //   return NextResponse.json({ error: "No purchases found for the given bookId" },  { status: 404 });
    // }

    // Calculate the total quantity for the specified bookId
    let totalQuantity = 0;
    payments.forEach(order => {
      order.books.forEach(book => {
        if (book.bookId === bookId) {
          totalQuantity += book.cardCount;
        }
      });
    });

    // Return the total quantity as a JSON response
    return NextResponse.json( totalQuantity );
  } catch (error) {
    console.error("Error fetching total quantity:", error);
    return NextResponse.json(
      { error: "Failed to calculate total quantity" },
      { status: 500 }
    );
  }
}