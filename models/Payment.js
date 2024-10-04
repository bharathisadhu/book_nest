import mongoose, { Schema } from "mongoose";

const PaymentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  transactionId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  bookName: { type: String, required: true },
  status: { type: String, default: "pending" },
});

// Ensure correct export for the Payment model
const Payment =
  mongoose.models.payment || mongoose.model("payment", PaymentSchema);

export default Payment; // Export default for ease of import
