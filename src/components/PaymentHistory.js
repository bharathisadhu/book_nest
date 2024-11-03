"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Printer, ArrowLeft } from "lucide-react";
import Loader from "@/app/loading";
import logo from "./../../public/BookNest.png";

export default function PaymentHistory() {
  const { data: session } = useSession();
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCharge, setTotalCharge] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchPayments = async () => {
      if (!session?.user?.email) return;
      try {
        const response = await axios.get(
          `/api/payments/${session.user.email}?page=${page}&limit=${limit}`,
          { cache: "no-store" }
        );
        setCarts(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [session?.user?.email, page]);

  useEffect(() => {
    if (selectedInvoice) {
      const subtotal = selectedInvoice.books.reduce((acc, item) => {
        return acc + item.quantity * item.price;
      }, 0);
      setTotalCharge(Number(subtotal.toFixed(2)));
    }
  }, [selectedInvoice]);

  // Calculate delivery charge and total with proper decimal handling
  const calculateTotals = () => {
    if (!selectedInvoice) return { subtotal: 0, deliveryCharge: 0, total: 0 };

    const subtotal = Number(totalCharge.toFixed(2));
    const total = Number(selectedInvoice.totalAmount.toFixed(2));
    const deliveryCharge = Number((total - subtotal).toFixed(2));

    return { subtotal, deliveryCharge, total };
  };

  const { subtotal, deliveryCharge, total } = calculateTotals();

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow pop-ups to print the invoice");
      return;
    }

    const invoiceContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice #${selectedInvoice._id}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
              position: relative;
            }
            .watermark {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              opacity: 0.1;
              z-index: -1;
              pointer-events: none;
            }
            .watermark img {
              width: 400px;
              height: auto;
            }
            .invoice-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 30px;
            }
            .logo-container {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .logo-container img {
              width: 150px;
              height: auto;
              margin-right: 20px;
            }
            .customer-info {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-bottom: 30px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
            }
            th, td {
              padding: 10px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            .totals {
              float: right;
              width: 300px;
            }
            .totals div {
              display: flex;
              justify-content: space-between;
              padding: 5px 0;
            }
            .footer {
              text-align: center;
              margin-top: 100px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
            }
            @media print {
              .invoice-content {
                page-break-inside: avoid;
              }
              .watermark {
                display: block !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="watermark">
            <img src="/BookNest.png" alt="BookNest Logo" />
          </div>
          
          <div class="invoice-content">
            <div class="invoice-header">
              <div class="logo-container">
                <img src='/BookNest.png' alt="BookNest Logo" />
                <div>
                  <h1>INVOICE</h1>
                  <p>#${selectedInvoice._id}</p>
                </div>
              </div>
            </div>

            <div class="customer-info">
              <div>
                <h3>Bill To:</h3>
                <p>${selectedInvoice.name}</p>
                <p>${selectedInvoice.address}</p>
                <p>${selectedInvoice.city}, ${selectedInvoice.country}</p>
                <p>${selectedInvoice.email}</p>
              </div>
              <div>
                <h3>Invoice Details:</h3>
                <p>Date: ${new Date(
                  selectedInvoice.date
                ).toLocaleDateString()}</p>
                <p>Transaction ID: ${selectedInvoice.transactionId}</p>
                <p>Status: ${selectedInvoice.status}</p>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th style="text-align: right">Quantity</th>
                  <th style="text-align: right">Price</th>
                  <th style="text-align: right">Total</th>
                </tr>
              </thead>
              <tbody>
                ${selectedInvoice.books
                  .map(
                    (item, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${item.bookName}</td>
                    <td style="text-align: right">${item.quantity}</td>
                    <td style="text-align: right">$${item.price.toFixed(2)}</td>
                    <td style="text-align: right">$${(
                      item.quantity * item.price
                    ).toFixed(2)}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>

            <div class="totals">
              <div>
                <strong>Subtotal:</strong>
                <span>$${subtotal.toFixed(2)}</span>
              </div>
              <div>
                <strong>Delivery Charge:</strong>
                <span>$${deliveryCharge.toFixed(2)}</span>
              </div>
              <div>
                <strong>Total Amount:</strong>
                <span>$${total.toFixed(2)}</span>
              </div>
            </div>

            <div class="footer">
              <p>Thank you for shopping with BookNest!</p>
              <p>For any questions, please contact booknest21@gmail.com</p>
            </div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(invoiceContent);
    printWindow.document.close();
    printWindow.onload = function () {
      printWindow.print();
    };
  };

  if (isLoading) return <Loader />;

  if (!carts.length) {
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

  return (
    <div className="container mx-auto p-4 space-y-6">
      {selectedInvoice ? (
        <div className="space-y-4">
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

          <div className="bg-white p-8 rounded-lg shadow">
            <div className="space-y-6">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">INVOICE</h2>
                  <p className="text-gray-600">#{selectedInvoice._id}</p>
                </div>
                <div className="text-right">
                  <h3 className="font-semibold">BookNest</h3>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
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
                <div className="text-left md:text-right">
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

              <div className="overflow-x-auto">
                <h3 className="font-semibold mb-4">Order Items:</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">
                        #
                      </th>
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
                    {selectedInvoice.books.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{item.bookName}</td>
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
              <div className="flex justify-end">
                <div className="w-full md:w-64 space-y-2">
                  <div className="flex justify-between py-2 text-gray-600">
                    <span className="font-semibold">Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 text-gray-600">
                    <span className="font-semibold">Delivery Charge:</span>
                    <span>${deliveryCharge.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 font-bold text-gray-800 border-t">
                    <span>Total Amount:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 mt-20 text-center text-gray-600">
                <p>Thank you for shopping with BookNest!</p>
                <p>For any questions, please contact booknest21@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
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
                        {cart.address}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800">
                        {cart.email}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800">
                        {cart.status}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800">
                        {cart.deliveryStatus}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800">
                        ${cart.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800">
                        {new Date(cart.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <button
                          onClick={() => setSelectedInvoice(cart)}
                          className="bg-[#F65D4E] text-white px-4 py-2 rounded-lg shadow hover:bg-red-400"
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
            <div className="flex justify-end mt-4 gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index + 1)}
                  className={`${
                    page === index + 1
                      ? "bg-[#F65D4E] text-white"
                      : "bg-gray-100 text-gray-700"
                  } px-3 py-1 rounded-md`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
