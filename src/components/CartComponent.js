"use client";

import Image from "next/image";
import { Minus, Plus, X, ShoppingCart } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CartComponent({ cartBook, setCartBook }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateQuantity = (id, newQuantity) => {
    setCartBook((prevState) => ({
      cart: prevState.cart.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      ),
    }));
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
        const updatedCart = cartBook.cart.filter((item) => item._id !== id);
        setCartBook({ cart: updatedCart });

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

  const subtotal = Array.isArray(cartBook.cart)
    ? cartBook.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
      <div className="md:col-span-2 space-y-4">
        <div className="max-h-96 overflow-y-auto pr-2">
          {/* Scrollable cart section */}
          {cartBook?.cart?.length > 0 ? (
            cartBook.cart.map((item) => (
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
                  <h3 className="font-semibold">{item.category}</h3>
                  <p className="text-sm text-gray-600">{item.author}</p>
                  <p className="font-bold mt-2">${item.price?.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="p-1 border rounded"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    min="0"
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (!isNaN(newQuantity)) {
                        updateQuantity(item._id, newQuantity);
                      }
                    }}
                    className="w-16 text-center border rounded p-1"
                  />
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="p-1 border rounded"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-2xl text-gray-500 p-4">
              No items in your cart....
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg h-fit">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2 mb-4">
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
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-400 transition duration-200"
          disabled={cartBook.cart.length === 0} // Disable button if cart is empty
        >
          <ShoppingCart className="inline-block mr-2 h-4 w-4" />
          Proceed to Checkout
        </button>
      </div>

      {/* Modal for Stripe Checkout Form */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-4xl mt-20">
            {/* Increased modal width */}
            <h2 className="text-xl font-semibold mb-4">Checkout</h2>
            <Elements stripe={stripePromise}>
              <CheckoutForm cartItems={cartBook.cart} />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
}
