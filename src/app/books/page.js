'use client'

import BooksCard from "@/components/BooksCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";

export default function Books() {

  const [books, setBooks] = useState([])
  


  useEffect(()=>{
    fetch('/popular-data.json')
    .then((res)=> res.json())
    .then((data) => setBooks(data))
    
  },[])


  

  
  // let listOfBooks = [];

  

  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  // https://booknest-server-one.vercel.app/api/books

  // try {
  //   const response = await axios.get(`/popular-data.json`);
  //   listOfBooks = response.data;

  //   // console.log(listOfBooks);
    
  // } catch (error) {
  //   console.error("Error fetching books:", error);
  // }


  const sorting = ( data) =>{

    if(data === 'LowToHigh'){
      const priceLowToHigh = [...books].sort((a, b) => a.price - b.price);
    setBooks(priceLowToHigh)
    }
   if(data === 'HighToLow'){
      const priceHighToLow = [...books].sort((a,b) => b.price - a.price)
      setBooks(priceHighToLow)
    }

    if(data === 'topRatings'){
      const TopRatings = [...books].sort((a, b) => b.ratings - a.ratings)
      setBooks(TopRatings)
     }

     if(data === 'lowRatings'){
      const LowRatings = [...books].sort((a, b) => a.ratings - b.ratings)
      setBooks(LowRatings)
     }
  }

  
  return (
    <>
      <Navbar />

      <div className="flex justify-end pr-10"><div className="dropdown">
  <div tabIndex={0}  className="m-1"><div className="flex justify-center items-center gap-4 border-2  p-2 rounded-lg">Sort  <GoChevronDown /></div></div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow">
    <button onClick={() =>{ sorting('LowToHigh')}}   ><li><a>Sort by price: low to high</a></li></button>

    <button onClick={() =>{ sorting('HighToLow')}}   ><li><a>Sort by price: high to low</a></li></button>

    <button onClick={() =>{ sorting('topRatings')}}   ><li><a>Sort by popularity: high to low</a></li></button>


    <button onClick={() =>{ sorting('lowRatings')}}   ><li><a>Sort by popularity: low to high</a></li></button>

  </ul>
</div></div>

<hr></hr>





      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-2 mb-2 gap-6">
        {books?.map((book) => (
          <BooksCard key={book.id} book={book} />
        ))}
      </div>
      <Footer />
    </>
  );
}
