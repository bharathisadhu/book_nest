import connectDB from "@/lib/connectDB";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id"); // Get the book ID from the query parameters

  const db = await connectDB();
  const reviewsCollection = db.collection("reviews"); // Replace with your collection name

  try {
    const review = await reviewsCollection.findOne({ bookId: id }); // Fetch the review for the specific book
    if (!review) {
      return new Response(JSON.stringify({ message: "Review not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ review }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching review", error }),
      { status: 500 }
    );
  }
}
