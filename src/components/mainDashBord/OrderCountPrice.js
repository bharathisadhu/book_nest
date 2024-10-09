'use client'
import { useState,useEffect } from 'react';

const OrderCount = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  
 

  
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

   // Fetch comments from the backend
   useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`${baseUrl}/api/cart-count`);
      const data = await response.json();
      
      setTotalPrice(data.totalPrice);
      setTotalQuantity(data.totalQuantity);
          };
    fetchBook();
  }, [baseUrl]);

  

  
  



  return (
    <>
  
  
  <div className="flex gap-10"><p>Total Price</p><p>{parseFloat(totalPrice).toFixed(2)}$</p></div>
  <div className="flex gap-10"><p>Total Quantity</p><p>{totalQuantity}</p></div>
      
      

      
      
      </>
     
  );
};

export default OrderCount;