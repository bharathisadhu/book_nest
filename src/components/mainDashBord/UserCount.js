"use client";
import { useState, useEffect } from "react";
import { FaUserFriends } from "react-icons/fa";
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
    <>
      <div className="card bg-base-100 h-32 shadow-xl border-2 flex flex-col items-center justify-center">
        <div className="flex items-center gap-8">
          {/* <p className="font-bold text-[red]">User Information</p> */}
          <div className="border border-solid rounded-full bg-slate-100 p-4">
          <FaUserFriends className="text-5xl text-blue-500"/>
          </div>
          <div className=" border-t-slate-700">
            <div className="text-lg font-medium">Total Users</div>
            <div className="text-3xl font-bold">{users.length}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCount;
