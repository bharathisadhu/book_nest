import connectDB from "../../../utils/connectDB";

export default async function handler(req, res) {
  const client = await connectDB();
  const db = client.db();

  const {
    category,
    author,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
    sort,
  } = req.query;

  const query = {};

  // Handle multiple categories
  if (category) {
    const categoriesArray = category.split(",");
    query.category = { $in: categoriesArray };
  }

  // Handle multiple authors
  if (author) {
    const authorsArray = author.split(",");
    query.author = { $in: authorsArray };
  }

  // Handle price range filtering
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) {
      query.price.$gte = Number(minPrice); // Greater than or equal to minPrice
    }
    if (maxPrice) {
      query.price.$lte = Number(maxPrice); // Less than or equal to maxPrice
    }
  }

  console.log("Query:", query);

  // Determine the sorting criteria
  let sortCriteria = {};
  if (sort === "LowToHigh") {
    sortCriteria.price = 1; // Ascending
  } else if (sort === "HighToLow") {
    sortCriteria.price = -1; // Descending
  } else if (sort === "topRatings") {
    sortCriteria.ratings = -1; // Descending
  } else if (sort === "lowRatings") {
    sortCriteria.ratings = 1; // Ascending
  }

  try {
    // Fetching books with filtering, sorting, and pagination
    const books = await db
      .collection("books") // Replace with your actual collection name
      .find(query)
      .sort(sortCriteria)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .toArray();

    const totalBooks = await db.collection("books").countDocuments(query);

    res.status(200).json({
      books,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  } finally {
    // await client.close(); // Close the MongoDB connection
  }
}
