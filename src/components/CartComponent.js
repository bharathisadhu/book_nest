"use client";

import Image from "next/image";
import { Minus, Plus, X, ShoppingCart } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

export default function CartComponent({ cartBook, setCartBook }) {
  // Function to update the quantity of a specific item
  const updateQuantity = (id, newQuantity) => {
    // Update only the item that matches the ID
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
        // Make the DELETE request to your API
        await axios.delete(`/api/cart?id=${id}`);

        // Remove the item from the local state
        const updatedCart = cartBook.cart.filter((item) => item._id !== id);
        setCartBook({ cart: updatedCart });

        // Show success message
        Swal.fire({
          title: "Deleted!",
          text: "Your item has been removed from the wishlist.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error removing item from wishlist:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to remove item from wishlist!",
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        {cartBook?.cart?.length > 0 ? (
          cartBook.cart.map((item) => (
            <div
              key={item.id}
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
                <h3 className="font-semibold">{item.category}</h3>
                <p className="text-sm text-gray-600">{item.author}</p>
                <p className="font-bold mt-2">${item.price?.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)} // Decrease quantity
                  className="p-1 border rounded"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  min="0" // Prevent negative values
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value);
                    if (!isNaN(newQuantity)) {
                      updateQuantity(item._id, newQuantity); // Update the specific item
                    }
                  }}
                  className="w-16 text-center border rounded p-1"
                />
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)} // Increase quantity
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
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
          <ShoppingCart className="inline-block mr-2 h-4 w-4" /> Proceed to
          Checkout
        </button>
      </div>
    </div>
  );
}
