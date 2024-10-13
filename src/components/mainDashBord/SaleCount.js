"use client";
import { useState, useEffect } from "react";
import { FcSalesPerformance } from "react-icons/fc";

const SaleCount = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch comments from the backend
  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`${baseUrl}/api/payments-price`);
      const data = await response.json();

      setTotalPrice(data.totalPrice);
    };
    fetchBook();
  }, [baseUrl]);

  return (
    <>
      <div className="card bg-base-100 h-32 shadow-xl border-2 flex flex-col items-center justify-center px-4">
        <div className="flex items-center gap-8 lg:gap-4">
          {/* <p className="font-bold text-[red]">User Information</p> */}
          <div className="border border-solid rounded-full p-4 bg-slate-100">
            <FcSalesPerformance className="text-5xl text-green-400" />
          </div>
          <div className=" border-t-slate-700">
            <div className="text-lg font-medium">Total Sales</div>
            <div className="text-4xl lg:text-2xl font-bold">
              {parseFloat(totalPrice).toFixed(2)}$
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleCount;
