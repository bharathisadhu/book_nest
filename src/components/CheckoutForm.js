"use client"; // Add this line to mark this component as a client component

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import axios from "axios"; // Adjust the import path as needed
import { useRouter } from "next/navigation"; // Import useRouter for redirection

const CheckoutForm = ({ cartItems, discount }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const [isVisible, setIsVisible] = useState(true); // Manage visibility
  const stripe = useStripe();
  const elements = useElements();
  const { data: session } = useSession();
  const router = useRouter(); // Initialize useRouter

  // Calculate subtotal from cart items
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate 10% tax based on subtotal
  const tax = subtotal * 0.1;

  // Calculate total price including tax
  const total = subtotal + tax;
  const totalPrice = total - discount;
  // console.log(totalPrice);
  // console.log(discount);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        if (totaltorice > 0) {
          const response = await axios.post("/api/create-payment-intent", {
            price: totalPrice,
            email: session?.user?.email || "anonymous",
            // Send the first item's name (or you can aggregate names if needed)
            name: cartItems[0]?.name,
            _id: cartItems[0]?._id,
          });
          console.log("Client secret response:", response.data);
          setClientSecret(response.data.clientSecret);
        }
      } catch (error) {
        console.error(
          "Error fetching client secret:",
          error.response || error.message || error
        );
        setError("Failed to fetch payment details. Please try again later.");
      }
    };

    fetchClientSecret();
  }, [totalPrice, session, cartItems]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Show loader when the payment starts

    if (!stripe || !elements) {
      setLoading(false); // Hide loader if there's an issue
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      setLoading(false); // Hide loader if card element is not found
      return;
    }

    try {
      // Create payment method
      const { error } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Confirm payment
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: session?.user?.email || "anonymous",
              name: session?.user?.name || "anonymous",
            },
          },
        });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent.status === "succeeded") {
        console.log("Payment intent:", paymentIntent);
        setTransactionId(paymentIntent.id);

        // Save payment details in the database for each book
        for (const item of cartItems) {
          const payment = {
            email: session?.user?.email, // Use session data for the email
            price: item.price,
            transactionId: paymentIntent.id,
            date: new Date(),
            bookId: item._id,
            bookName: item.name,
            status: "pending",
            name: session?.user?.name || "anonymous", // Include the name here if needed
          };

          await axios.post("/api/payments", payment); // Save payment for each item
        }

        // Show success message
        Swal.fire({
          position: "center",
          icon: "success",
          title:
            "Thank you for the Payment, Your Order will be on their way soon! 🚚",
          showConfirmButton: false,
          timer: 1500,
        });

        // Redirect to the homepage after the success message
        setTimeout(() => {
          router.push("/"); // Redirect to the homepage after the payment
        }, 500);
      }
    } catch (error) {
      console.error("Error processing payment:", error.message);
      setError(error.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false); // Hide loader when payment completes
    }
  };

  return (
    <div className="font-[sans-serif] bg-white p-4 relative">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      )}

      {isVisible && (
        <div className="md:max-w-5xl max-w-xl mx-auto overflow-y-auto max-h-screen touch-auto relative">
          {/* Mobile close button */}
          <button
            className="absolute top-4 left-4 text-red-500 text-lg md:hidden" // Hide on larger screens
            onClick={() => setIsVisible(false)} // Close button functionality
          >
            &times;
          </button>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 max-md:order-1">
              <h2 className="text-3xl font-extrabold text-gray-800">
                Make a payment
              </h2>
              <p className="text-gray-800 text-sm mt-4">
                Complete your transaction swiftly and securely with our
                easy-to-use payment process.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 max-w-lg">
                <div className="grid gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Cardholder's Name"
                      className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                      required
                    />
                  </div>
                  <div className="flex bg-gray-100 border rounded-md focus-within:border-purple-500 focus-within:bg-transparent overflow-hidden">
                    <CardElement
                      className="px-4 py-3.5 text-gray-800 w-full text-sm outline-none bg-transparent"
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                              color: "#aab7c4",
                            },
                          },
                          invalid: {
                            color: "#9e2146",
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                <button
                  className="my-8 w-40 py-3.5 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600 tracking-wide"
                  type="submit"
                  disabled={!stripe || !clientSecret || loading}
                >
                  Pay ${totalPrice.toFixed(2)}
                </button>
              </form>

              {error && <p className="text-red-600">{error}</p>}
              {transactionId && (
                <p className="text-green-600">
                  Your transaction ID: {transactionId}
                </p>
              )}
            </div>

            <div className="bg-red-300 p-6 rounded-md">
              <h2 className="text-3xl font-extrabold text-gray-800">
                ${totalPrice.toFixed(2)}
              </h2>

              <ul className="text-gray-800 mt-8 space-y-4 max-h-48 overflow-y-auto touch-auto">
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    title={item.name}
                    className="flex flex-wrap gap-4 text-sm"
                  >
                    {item.name.length > 20
                      ? item.name.slice(0, 16) + "..."
                      : item.name}
                    <span className="ml-auto font-bold">
                      ${item.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>

              <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 border-dashed border-gray-600 mt-6 pt-4">
                <span>Total</span>
                <span className="ml-auto">${totalPrice.toFixed(2)}</span>
              </li>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
