"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import Link from "next/link";

export default function CartComponent({ cartBook, setCartBook }) {
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
