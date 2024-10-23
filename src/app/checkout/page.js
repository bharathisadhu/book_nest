"use client";

import CheckoutForm from "@/components/CheckoutForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Banner from "@/components/share/banner";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "../../app/loading";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import axios from "axios";
import PrivateRoute from "@/services/PrivateRoute";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CheckoutPage() {
  const [cartBook, setCartBook] = useState({ cart: [] });
  const [loading, setLoading] = useState(true); // Loading state
  const { data: session } = useSession();

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true); // Start loading

      try {
        const response = await axios.get(`/api/carts/${session?.user?.email}`);
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
  }, [session?.user?.email]);

  return (
    <>
      <PrivateRoute>
        <Navbar />
        <div>
          <Banner linkName={"Home"} title={"Checkout"} />
          {loading ? (
            <Loading />
          ) : (
            <Elements stripe={stripePromise}>
              <CheckoutForm cartBook={cartBook} setCartBook={setCartBook} />
            </Elements>
          )}
        </div>
        <Footer />
      </PrivateRoute>
    </>
  );
}
