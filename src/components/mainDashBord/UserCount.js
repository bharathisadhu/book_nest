'use client'
import { useState,useEffect } from 'react';

const UserCount = () => {
  const [users, setUsers] = useState([]);
  
 

  
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

   // Fetch comments from the backend
   useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${baseUrl}/api/users`);
      const data = await response.json();
      
      setUsers(data);
          };
    fetchUser();
  }, [baseUrl]);

  

  
  



  return (
    
  

      <div className="flex gap-10 ml-10 py-[20px] font-bold uppercase"><p>Total User</p><p>{users.length}</p></div>
      
      
      
     
  );
};

export default UserCount;