'use client'
import { useState,useEffect } from 'react';

const OrderCount = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalcardCount, setTotalcardCount] = useState(0);
  
 

  
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

   // Fetch comments from the backend
   useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`${baseUrl}/api/cart-count`);
      const data = await response.json();
      
      setTotalPrice(data.totalPrice);
      setTotalcardCount(data.totalcardCount);
          };
    fetchBook();
  }, [baseUrl]);

  

  
  



  return (
    <>
  
  
  <div className="flex gap-10 ml-10 pt-[20px] pb-[5px] font-bold uppercase"><p>Total Price</p><p>{parseFloat(totalPrice).toFixed(2)}$</p></div>
  <div className="flex gap-10 ml-10 pb-[20px] font-bold uppercase"><p>Total cardCount</p><p>{totalcardCount}</p></div>
      
      

      
      
      </>
     
  );
};

export default OrderCount;