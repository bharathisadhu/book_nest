"use client"; // Add this line to mark this component as a client component

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import axios from "axios"; // Adjust the import path as needed

const CheckoutForm = ({ cartItems }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { data: session } = useSession();

  // Calculate total price from cart items
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        if (totalPrice > 0) {
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

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
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
          title: "Thank you for the Payment",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error processing payment:", error.message);
      setError(error.message || "Payment failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
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
      <button
        className="btn btn-sm btn-primary my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay ${totalPrice.toFixed(2)} {/* Format price for display */}
      </button>
      {error && <p className="text-red-600">{error}</p>}
      {transactionId && (
        <p className="text-green-600">Your transaction ID: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
