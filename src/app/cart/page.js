"use client";
import CartComponent from "@/components/CartComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Banner from "@/components/share/banner";
import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CartPage() {
  const [cartBook, setCartBook] = useState({ cart: [] });
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true); // Start loading

      try {
        const response = await axios.get("/api/cart");
        setCartBook(response.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load wishlist!",
        });
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchWishlist();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <Banner title="Shopping Cart" linkName="Home" />

      {/* Loader inside the cart section */}
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      ) : (
        <Elements stripe={stripePromise}>
          <CartComponent cartBook={cartBook} setCartBook={setCartBook} />
        </Elements>
      )}
    </main>
  );
}
