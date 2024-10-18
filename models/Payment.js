import mongoose from "mongoose";

// Define the schema for individual books
const bookSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, required: false },
  bookName: { type: String, required: true },
  cardCount: { type: Number, required: true },
  price: { type: Number, required: true },
});

// Define the schema for payments
const paymentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  books: { type: [bookSchema], required: true },
  totalAmount: { type: Number, required: true }, // Use totalAmount to reflect the total cost
  transactionId: { type: String, required: true },
  status: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Export the Payment model
export default mongoose.models.Payment ||
  mongoose.model("Payment", paymentSchema);
