"use client";
import CartComponent from "@/components/CartComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function CartPage() {
  const [cartBook, setCartBook] = useState({ cart: [] });

  useEffect(() => {
    const fetchWishlist = async () => {
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
      }
    };

    fetchWishlist();
  }, []);
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      <CartComponent cartBook={cartBook} setCartBook={setCartBook} />
    </main>
  );
}
