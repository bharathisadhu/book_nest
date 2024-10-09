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
  
  
      <div className="flex gap-10"><p>Total Sale</p><p>{parseFloat(totalPrice).toFixed(2)}$</p></div>
      
     
      
      
      </>
     
  );
};

export default SaleCount;