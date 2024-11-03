import connectDB from "@/lib/connectDB";

export async function POST(request) {
  const { bookId, userEmail, review } = await request.json(); // Get data from the request body

  const db = await connectDB();
  const reviewsCollection = db.collection("reviews"); // Replace with your collection name

  try {
    // Check if a review already exists for this book by this user
    const existingReview = await reviewsCollection.findOne({
      bookId,
      userId: userEmail,
    });
    if (existingReview) {
      // Update the existing review
      await reviewsCollection.updateOne(
        { bookId, userEmail },
        { $set: { review } }
      );
      return new Response(
        JSON.stringify({ message: "Review updated successfully" }),
        { status: 200 }
      );
    }

    // Create a new review
    const newReview = { bookId, userEmail, review };
    await reviewsCollection.insertOne(newReview);
    return new Response(
      JSON.stringify({ message: "Review created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error submitting review", error }),
      { status: 500 }
    );
  }
}
