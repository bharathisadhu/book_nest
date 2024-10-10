'use client'
import { useState,useEffect } from 'react';

const BlogCount = () => {
  const [Blog, setBlog] = useState([]);
  
 

  
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

   // Fetch comments from the backend
   useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${baseUrl}/api/blogs`);
      const data = await response.json();
      
      setBlog(data);
          };
    fetchUser();
  }, [baseUrl]);

  

  
  



  return (
    
  <>

        
<div className="card bg-base-100 w-96 shadow-xl border-2">
  
  <div className="card-body font-bold uppercase text-center">
  
   
    <p className="font-bold text-[red]">Blog Information</p>
    <div className="card-actions justify-between border-t-slate-700">
      <div className="p-5">Total BLog</div>
      <div className="p-5">{Blog.length}</div>
    </div>
  </div>
</div>

</>
     
  );
};

export default BlogCount;
