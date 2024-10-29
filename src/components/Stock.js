"use client";
import { useState, useEffect } from "react";

const Stock = ({ _id, cardCount }) => {
  const [stock, setStock] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchTotalcardCount = async () => {
      const response = await fetch(
        `${baseUrl}/api/payments-total-cardCount?blogId=${_id}`
      );
      const data = await response.json();
      const status = cardCount - data > 0 ? "Stock In" : "Stock Out";
      setStock(status);
    };
    fetchTotalcardCount();
  }, [baseUrl, _id, cardCount]);

  return <>{stock}</>;
};

export default Stock;
