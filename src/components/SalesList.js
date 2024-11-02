"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Loader from "@/app/loading";

export default function SalesList() {
  const { data: session } = useSession();
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const fetchPayments = async () => {
    if (!session?.user?.email) {
      console.warn("User is not logged in or email is unavailable.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `/api/payments?page=${page}&limit=${limit}`
      );
      setPayments(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [session?.user?.email, page]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(`/api/payment/${id}`, {
        status: newStatus,
      });
      fetchPayments(); // Optionally refresh the payment list
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return pages.map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => setPage(pageNumber)}
        className={`px-3 py-1 rounded ${
          pageNumber === page ? "bg-[#F65D4E] text-white font-poppins font-semibold" : "bg-gray-200 font-poppins font-semibold"
        }`}
      >
        {pageNumber}
      </button>
    ));
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="font-sans lg:max-h-screen border">
      <table className="divide-y divide-gray-200 border w-full">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left">Name</th>
            <th className="px-4 py-4 text-left">Email</th>
            <th className="px-4 py-4 text-left">Date</th>
            <th className="px-4 py-4 text-left">Transaction ID</th>
            <th className="px-4 py-4 text-left">Total Amount</th>
            <th className="px-4 py-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {payments.map((pay) => (
            <tr key={pay._id}>
              <td className="px-4 py-4">{pay.name}</td>
              <td className="px-4 py-4">{pay.email}</td>
              <td className="px-4 py-4">
                {new Date(pay.date).toLocaleDateString("en-GB")}
              </td>
              <td className="px-4 py-4">{pay.transactionId}</td>
              <td className="px-4 py-4 text-start">
                ${Number(pay.totalAmount).toFixed(2)}
              </td>
              <td className="px-4 py-4">
                {pay.transactionId === "Cash on Delivery" ? (
                  <select
                    value={pay.status || "Pending"}
                    onChange={(e) =>
                      handleStatusChange(pay._id, e.target.value)
                    }
                    className="border rounded p-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                ) : (
                  <span>{pay.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="flex justify-center space-x-2 mt-4">
        {renderPagination()}
      </div>
    </div>
  );
}
