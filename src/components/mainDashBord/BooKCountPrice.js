'use client'
import { useState,useEffect } from 'react';

const BookCount = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  
 

  
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

   // Fetch comments from the backend
   useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`${baseUrl}/api/books-count`);
      const data = await response.json();
      
      setTotalPrice(data.totalPrice);
      setTotalQuantity(data.totalQuantity);
          };
    fetchBook();
  }, [baseUrl]);

  

  
  



  return (
    <>
  
     
      
       <div className="card bg-base-100 w-96 shadow-xl border-2">
  
  <div className="card-body font-bold uppercase text-center">
  
   
    <p className="font-bold text-[red]">BooK Summary</p>
    <div className="card-actions justify-between border-t-slate-700 pt-5">
      <div className="">Total Price</div>
      <div className="">{parseFloat(totalPrice).toFixed(2)}$</div>
    </div>
    <div className="card-actions justify-between border-t-slate-700">
      <div className="">Total Quantity</div>
      <div className="">{totalQuantity}</div>
    </div>
  </div>
</div>

      
      
      </>
     
  );
};

export default BookCount;