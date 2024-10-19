"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CartComponent({ cartBook, setCartBook }) {
  // const [isDiscountSectionHidden, setIsDiscountSectionHidden] = useState(false);
  // const [discount, setDiscount] = useState(0);
  // const [couponInput, setCouponInput] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [clientSecret, setClientSecret] = useState("");
  // const [transactionId, setTransactionId] = useState("");
  // const [error, setError] = useState("");
  // const stripe = useStripe();
  // const elements = useElements();
  // const { data: session } = useSession();
  // const router = useRouter();
  const updatecardCount = (id, newcardCount) => {
    setCartBook((prevState) =>
      prevState.map((item) =>
        item._id === id
          ? { ...item, cardCount: Math.max(0, newcardCount) }
          : item
      )
    );
  };

  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/cart?id=${id}`);
        const updatedCart = cartBook.filter((item) => item._id !== id);
        setCartBook(updatedCart);

        Swal.fire({
          title: "Deleted!",
          text: "Your item has been removed from the cart.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error removing item from cart:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to remove item from cart!",
        });
      }
    }
  };

  const subtotal = Array.isArray(cartBook)
    ? cartBook.reduce((sum, item) => sum + item.price * item.cardCount, 0)
    : 0;

  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  // const handleCouponApply = () => {
  //   if (cartBook.length > 0 && couponInput === "BookNest10") {
  //     const discountAmount = (total * 10) / 100;
  //     setDiscount(discountAmount);
  //     setIsDiscountSectionHidden(true);
  //     Swal.fire({
  //       title: "Coupon Applied!",
  //       text: `You have received a discount of $${discountAmount.toFixed(2)}.`,
  //       icon: "success",
  //     });
  //   } else if (cartBook.length > 3 && couponInput === "BookNest20") {
  //     const discountAmount = (total * 20) / 100;
  //     setDiscount(discountAmount);
  //     setIsDiscountSectionHidden(true);
  //     Swal.fire({
  //       title: "Coupon Applied!",
  //       text: `You have received a discount of $${discountAmount.toFixed(2)}.`,
  //       icon: "success",
  //     });
  //   } else {
  //     let errorMessage = "The coupon code you entered is not valid.";
  //     if (cartBook.length < 1) {
  //       errorMessage = "Please select a book to apply the coupon.";
  //     } else if (cartBook.length < 3 && couponInput === "BookNest20") {
  //       errorMessage = "Please select more than 3 books to apply the coupon.";
  //     }
  //     Swal.fire({
  //       icon: "error",
  //       title: "Invalid Coupon",
  //       text: errorMessage,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   const fetchClientSecret = async () => {
  //     try {
  //       if (total > 0) {
  //         const booksArray = cartBook.map((item) => ({
  //           bookId: item._id,
  //           bookName: item.name,
  //           price: item.price,
  //           cardCount: item.cardCount,
  //         }));

  //         const response = await axios.post("/api/create-payment-intent", {
  //           price: total - discount,
  //           email: session?.user?.email || "anonymous",
  //           name: session?.user?.name || "anonymous",
  //           books: booksArray, // Include the books array here
  //         });
  //         setClientSecret(response.data.clientSecret);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching client secret:", error);
  //     }
  //   };

  //   if (session) {
  //     fetchClientSecret();
  //   }
  // }, [cartBook, session, total, discount]);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (!stripe || !elements || loading) return; // Prevent further submissions

  //   setLoading(true);
  //   const card = elements.getElement(CardElement);

  //   if (!card) {
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const { paymentMethod, error: paymentMethodError } =
  //       await stripe.createPaymentMethod({
  //         type: "card",
  //         card,
  //         billing_details: {
  //           email: session?.user?.email || "anonymous",
  //           name: session?.user?.name || "anonymous",
  //         },
  //       });

  //     if (paymentMethodError) {
  //       setError(paymentMethodError.message);
  //       setLoading(false);
  //       return;
  //     }

  //     // Confirm payment with client secret and payment method
  //     const { paymentIntent, error: confirmError } =
  //       await stripe.confirmCardPayment(clientSecret, {
  //         payment_method: paymentMethod.id,
  //       });

  //     if (confirmError) {
  //       setError(confirmError.message);
  //       setLoading(false);
  //       return;
  //     }

  //     // Ensure cartBook is defined and is an array
  //     const booksArray = Array.isArray(cartBook)
  //       ? cartBook.map((item) => ({
  //           bookId: item._id,
  //           bookName: item.name,
  //           price: item.price,
  //           cardCount: item.cardCount,
  //         }))
  //       : []; // Fallback in case cartBook is undefined or not an array

  //     console.log("Books Array being sent for payment:", booksArray);

  //     if (paymentIntent.status === "succeeded") {
  //       const payment = {
  //         email: session?.user?.email,
  //         name: session?.user?.name || "anonymous",
  //         transactionId: paymentIntent.id,
  //         date: new Date(),
  //         books: booksArray,
  //         totalAmount: total - discount,
  //         status: "pending",
  //       };

  //       // Save payment to your backend
  //       await axios.post("/api/payments", payment);

  //       Swal.fire({
  //         position: "center",
  //         icon: "success",
  //         title:
  //           "Thank you for your payment! Your order will be on its way soon! 🚚",
  //         showConfirmButton: false,
  //         timer: 2000,
  //       });

  //       setTimeout(() => {
  //         router.push("/");
  //       }, 500);
  //     } else if (paymentIntent.status === "requires_action") {
  //       Swal.fire({
  //         icon: "info",
  //         title: "Authentication Required",
  //         text: "Please complete the additional authentication steps.",
  //       });
  //     } else {
  //       setError("Payment failed. Please try again.");
  //     }
  //   } catch (error) {
  //     setError(`Error processing payment: ${error.message}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
      {/* Cart Items Section */}
      <div className="md:col-span-2 space-y-4">
        {/* Cart items display */}
        <div className="max-h-[400px] md:max-h-[500px] overflow-y-auto pr-2">
          {cartBook?.length > 0 ? (
            cartBook.map((item) => (
              <div
                key={item._id}
                className="flex items-center space-x-4 border-b pb-4"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={120}
                  className="object-cover"
                />
                <div className="flex-grow">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">{item.author}</p>
                  <p className="font-bold mt-2">${item.price?.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      updatecardCount(item._id, item.cardCount - 1)
                    }
                    className="p-1 border rounded"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    value={item.cardCount}
                    min="0"
                    onChange={(e) => {
                      const newcardCount = parseInt(e.target.value);
                      if (!isNaN(newcardCount))
                        updatecardCount(item._id, newcardCount);
                    }}
                    className="w-16 text-center border rounded p-1"
                  />
                  <button
                    onClick={() =>
                      updatecardCount(item._id, item.cardCount + 1)
                    }
                    className="p-1 border rounded"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="p-1 border rounded text-[#F65D4E]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>
      </div>

      {/* Payment Section */}
      <div className="border p-4 rounded-lg shadow-lg">
        <h2 className="font-semibold text-xl mb-4">Cart Summary</h2>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div>
            <Link href="/checkout">
              <button className="btn btn-block">Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
