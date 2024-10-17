"use client";
import { useState,useEffect } from "react";


const Stock = ({ _id,quantity }) => {

    const [stock, setStock] = useState(null);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
      const fetchTotalQuantity = async () => {
        const response = await fetch(`${baseUrl}/api/payments-total-quantity?blogId=${_id}`);
        const data = await response.json();
        const status = (quantity-data) > 0 ? "Stock In" : "Stock Out";
        setStock(status);
      };
      fetchTotalQuantity();
    }, [baseUrl, _id]);
  
    console.log("dddddddddddddddddd------",stock)
   
  return (
   <>{stock}</>
  );
  
};



export default Stock;