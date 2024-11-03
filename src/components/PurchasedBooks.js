"use client"; // Indicates that this component uses client-side rendering
import { useSession } from "next-auth/react"; // For authentication session
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation

export default function PurchasedBooks({ email }) {
  const [purchasedBooks, setPurchasedBooks] = useState([]); // State to store purchased books
  const [paymentStatus, setPaymentStatus] = useState({}); // State to store payment status
  const { data: session } = useSession(); // Get user session
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false); // Modal state
  const [selectedBook, setSelectedBook] = useState(null); // Selected book for review
  const [review, setReview] = useState(""); // Review text
  const [existingReview, setExistingReview] = useState(""); // Existing review state

  // Fetch purchased books and payment status when the component mounts or session changes
  useEffect(() => {
    const fetchPurchasedBooks = async () => {
      try {
        const response = await fetch(
          `/api/purchaseBooks/${session?.user.email}`
        );
        const data = await response.json();
        setPurchasedBooks(data);

        // Fetch payment status for the user
        const paymentResponse = await fetch(
          `/api/payments/${session?.user.email}`
        );
        const paymentData = await paymentResponse.json();
        setPaymentStatus(paymentData.data[0]);
      } catch (error) {
        console.error("Error fetching purchased books:", error);
      }
    };

    fetchPurchasedBooks();
  }, [session?.user.email]); // Fetch data when the user email changes

  // Function to download book details as a PDF
  const handleDownload = (book) => {
    const doc = new jsPDF();
    doc.text(`Book Name: ${book.bookName}`, 10, 10);
    doc.text(`Author: ${book.author}`, 10, 20);
    doc.text(`Category: ${book.category}`, 10, 30);
    doc.text(`Price: $${book.price.toFixed(2)}`, 10, 40);
    doc.save(`${book.bookName}.pdf`); // Save the PDF with the book name
  };

  // Function to handle review submission
  const handleSubmitReview = async () => {
    try {
      await fetch(`/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: selectedBook._id,
          userEmail: session.user.email,
          review,
        }),
      });
      setIsReviewModalOpen(false); // Close the review modal
      setReview(""); // Clear the review input
      setExistingReview(review); // Update existing review to the newly submitted one
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  // Function to open the review modal and fetch existing reviews
  const handleReview = async (book) => {
    setSelectedBook(book);
    setIsReviewModalOpen(true);

    // Fetch existing review for the selected book
    try {
      const reviewResponse = await fetch(`/api/reviews/${book._id}`); // Fetch review by book ID
      const reviewData = await reviewResponse.json();
      if (reviewData.review) {
        setExistingReview(reviewData.review.review); // Set existing review if available
        setReview(reviewData.review.review); // Pre-fill the review textarea with existing review
      } else {
        setExistingReview(""); // Clear if no review exists
        setReview(""); // Clear review textarea
      }
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  };

  return (
    <div>
      {purchasedBooks.length === 0 ? (
        <p>No purchased books found. Make a purchase first</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Book Name</th>
              <th className="py-2 px-4 text-left">Book Author</th>
              <th className="py-2 px-4 text-left">Book Category</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchasedBooks.map((book, index) => {
              const currentPaymentStatus = paymentStatus.status; // Get current payment status
              const isDisabled = currentPaymentStatus === "pending"; // Disable actions if payment is pending

              return (
                <tr key={book._id} className="border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="py-2 px-4">{book.bookName}</td>
                  <td className="py-2 px-4">{book.author}</td>
                  <td className="py-2 px-4">{book.category}</td>
                  <td className="py-2 px-4">${book.price.toFixed(2)}</td>
                  <td className="py-2 px-4">{currentPaymentStatus}</td>
                  <td className="py-2 px-4">
                    <button
                      className={`bg-[#F65D4E] hover:bg-[#e07c73] text-white font-bold py-2 px-4 rounded mr-2 ${
                        isDisabled ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() => handleDownload(book)} // Download book details as PDF
                      disabled={isDisabled} // Disable download if payment is pending
                    >
                      Download
                    </button>
                    <button
                      className={`bg-[#F65D4E] hover:bg-[#e07c73] text-white font-bold py-2 px-4 rounded ${
                        isDisabled ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() => handleReview(book)} // Open review modal
                      disabled={isDisabled} // Disable review button if payment is pending
                    >
                      Review
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Modal for Review */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
            {existingReview && (
              <p className="mb-2">Existing Review: {existingReview}</p>
            )}
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)} // Update review text
              className="w-full h-32 border border-gray-300 rounded p-2"
              placeholder="Write your review here..."
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsReviewModalOpen(false)} // Close the modal
                className="mr-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview} // Submit review
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
