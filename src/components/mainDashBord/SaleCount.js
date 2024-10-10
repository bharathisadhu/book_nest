'use client'
import { useState,useEffect } from 'react';

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
    
      <div className="card bg-base-100 w-96 shadow-xl border-2">
  
  <div className="card-body font-bold uppercase text-center">
    <p className="font-bold text-[red]">Sale</p>
    <div className="card-actions justify-between border-t-slate-700 font-bold uppercase">
      <div className="p-5">Total Sale</div>
      <div className="p-5">{parseFloat(totalPrice).toFixed(2)}$</div>
    </div>
  </div>
</div>
      
      
      </>
     
  );
};

export default SaleCount;