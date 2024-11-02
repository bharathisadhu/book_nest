// "use client";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import { useEffect, useState, useRef } from "react";
// import Loading from "../app/loading";
// //view
// import { useReactToPrint } from "react-to-print";
// import InvoiceDetail from "./InvoiceDetail";

// export default function PaymentHistory() {
//   const { data: session } = useSession();
//   const [carts, setCarts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Invoice state and ref
//   const [currentInvoice, setCurrentInvoice] = useState(null);
//   const invoiceRef = useRef(null);

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const limit = 10;

//   // Handle print functionality
//   const handlePrint = useReactToPrint({
//     content: () => invoiceRef.current || null,
//     documentTitle: `Invoice_${currentInvoice?._id}`,
//     onAfterPrint: () => setCurrentInvoice(null), // Reset invoice after print
//   });

//   const print = (invoice) => {
//     setCurrentInvoice(invoice);
//   };

//   const handleButtonClick = () => {
//     setCurrentInvoice(null); // Set currentInvoice to null on button click
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `/api/payments/${session?.user?.email}?page=${page}&limit=${limit}`,
//           { cache: "no-store" }
//         );
//         setCarts(response?.data?.data);
//         setTotalPages(response?.data?.totalPages);
//       } catch (error) {
//         console.error("Failed to fetch users:", error);
//       }
//       setIsLoading(false);
//     };

//     fetchData();
//   }, [session?.user?.email, page, limit]);

//   const handlePageClick = (pageNum) => {
//     setPage(pageNum);
//   };

//   if (isLoading && carts.length === 0) {
//     return <Loading />;
//   }

//   if (carts.length === 0) {
//     return (
//       <div className="flex justify-center items-center">
//         You have No payment History, Make a Payment First
//       </div>
//     );
//   }

//   return (
//     <div className="font-sans lg:max-h-[580px] overflow-x-auto overflow-y-auto">
//       <div>
//         {currentInvoice != null ? (
//           <>
//             {/* Hidden component for printing */}
//             {currentInvoice && (
//               <div>
//                 <InvoiceDetail ref={invoiceRef} invoice={currentInvoice} />
//               </div>
//             )}

//             <button
//               onClick={handleButtonClick}
//               className="btn bg-[#F65D4E] text-white rounded px-3 py-1 hover:bg-red-400 transition"
//             >
//               Invoice List
//             </button>
//           </>
//         ) : (
//           <>
//             <div className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-100 whitespace-nowrap">
//                 <tr>
//                   <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                     Shipping address
//                   </th>
//                   <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                     Email
//                   </th>
//                   <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                     Payment status
//                   </th>
//                   <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                     Delivery status
//                   </th>
//                   <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
//                 {Array.isArray(carts) &&
//                   carts.map((cart) => (
//                     <tr key={cart._id}>
//                       <td className="px-4 py-4 text-sm text-gray-800">
//                         {cart?.name}, {cart?.address}, {cart?.city},{" "}
//                         {cart?.country}
//                       </td>
//                       <td className="px-4 py-4 text-sm text-gray-800">
//                         {cart?.email}
//                       </td>
//                       <td className="px-4 py-4 text-sm text-gray-800">
//                         {cart?.transactionId}
//                       </td>
//                       <td className="px-4 py-4 text-sm text-gray-800">
//                         {cart?.status}
//                       </td>
//                       <td className="px-4 py-4 text-sm text-gray-800">
//                         ${cart?.totalAmount.toFixed(2)}
//                       </td>
//                       <td className="px-4 py-4 text-sm text-gray-800">
//                         {new Date(cart?.date).toLocaleDateString("en-GB")}
//                       </td>
//                       <td className="px-4 py-4 text-sm text-gray-800">
//                         <button
//                           onClick={() => print(cart)}
//                           className="btn bg-[#F65D4E] text-white rounded px-3 py-1 hover:bg-red-400 transition"
//                         >
//                           view
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center items-center mt-4 space-x-2">
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                 (pageNum) => (
//                   <button
//                     key={pageNum}
//                     className={`px-3 py-1 rounded ${
//                       page === pageNum
//                         ? "bg-[#F65D4E] text-white"
//                         : "bg-gray-200 text-gray-700"
//                     }`}
//                     onClick={() => handlePageClick(pageNum)}
//                   >
//                     {pageNum}
//                   </button>
//                 )
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Printer, ArrowLeft } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import Loader from "@/app/loading";

export default function PaymentHistory() {
  const { data: session } = useSession();
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  const printRef = useRef(null);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await axios.get(
          `/api/payments/${session?.user?.email}?page=${page}&limit=${limit}`,
          { cache: "no-store" }
        );
        setCarts(response?.data?.data);
        setTotalPages(response?.data?.totalPages);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [session?.user?.email, page]);

  const printInvoice = useReactToPrint({
    content: () => {
      console.log("Current print ref:", printRef.current); // Debug log
      return printRef.current; 
    },
    documentTitle: `Invoice_${selectedInvoice?._id}`,
    onAfterPrint: () => setSelectedInvoice(null),
  });
  
  const handlePrint = () => {
    if (!selectedInvoice) {
      alert("There is nothing to print");
      return;
    }
    console.log("Preparing to print..."); // Debug log
    printInvoice();
  };
  

  if (isLoading) return <Loader />;

  if (!carts?.length) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="text-lg text-gray-600">
            No payment history available. Make a purchase to see your
            transactions.
          </p>
        </div>
      </div>
    );
  }

  console.log(selectedInvoice);

  return (
    <div className="container mx-auto p-4 space-y-6">
      {selectedInvoice ? (
        <div className="space-y-4">
          {/* Invoice Actions */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow flex items-center gap-2 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to History
            </button>
            <button
              onClick={handlePrint}
              className="bg-[#F65D4E] text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 hover:bg-red-400"
            >
              <Printer className="h-4 w-4" />
              Print Invoice
            </button>
          </div>

          {/* Invoice Content */}
          <div ref={printRef} className="bg-white p-8 rounded-lg shadow">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">INVOICE</h2>
                  <p className="text-gray-600">#{selectedInvoice._id}</p>
                </div>
                <div className="text-right">
                  <h3 className="font-semibold">BookNest</h3>
                  <p className="text-gray-600">Your Digital Bookstore</p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-2">Bill To:</h3>
                  <div className="text-gray-600">
                    <p>{selectedInvoice.name}</p>
                    <p>{selectedInvoice.address}</p>
                    <p>
                      {selectedInvoice.city}, {selectedInvoice.country}
                    </p>
                    <p>{selectedInvoice.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <h3 className="font-semibold mb-2">Invoice Details:</h3>
                  <div className="text-gray-600">
                    <p>
                      Date:{" "}
                      {new Date(selectedInvoice.date).toLocaleDateString()}
                    </p>
                    <p>Transaction ID: {selectedInvoice.transactionId}</p>
                    <p>Status: {selectedInvoice.status}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-4">Order Items:</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">
                        Item
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500 uppercase">
                        Quantity
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500 uppercase">
                        Price
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500 uppercase">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedInvoice.items?.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2">{item.title}</td>
                        <td className="px-4 py-2 text-right">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-2 text-right">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 text-right">
                          ${(item.quantity * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total */}
              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between py-2 font-semibold">
                    <span>Total Amount:</span>
                    <span>${selectedInvoice.totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t pt-6 text-center text-gray-600">
                <p>Thank you for shopping with BookNest!</p>
                <p>For any questions, please contact booknest21@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Payment History Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Shipping Address
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Payment Status
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Delivery Status
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {carts.map((cart) => (
                  <tr key={cart._id}>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {cart.name}, {cart.address}, {cart.city}, {cart.country}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {cart.email}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {cart.paymentStatus}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {cart.deliveryStatus}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      ${cart.totalAmount}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {new Date(cart.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <button
                        onClick={() => setSelectedInvoice(cart)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                      >
                        View Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-lg shadow ${
                  page === i + 1
                    ? "bg-[#F65D4E] text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
