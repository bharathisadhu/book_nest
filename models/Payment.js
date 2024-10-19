const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  books: [
    {
      bookId: { type: String, required: true },
      bookName: { type: String, required: true },
      price: { type: Number, required: true },
      cardCount: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  transactionId: { type: String, required: true },
  status: { type: String, default: "pending" },
  date: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
