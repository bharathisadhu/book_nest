"use client"
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(null); // Initialize as null for loading state
  const [loading, setLoading] = useState(true); // Loading state
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const { data: session } = useSession();

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (session?.user?.email) {
        try {
          const response = await axios.get(`${baseURL}/api/user/${session.user.email}`);
          setIsAdmin(response?.data?.role === "admin"); // Set admin status based on the response
        } catch (error) {
          console.error("Error fetching admin status:", error);
          setIsAdmin(null); // Handle error (or set to false if you prefer)
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      } else {
        setLoading(false); // If there's no session, just stop loading
      }
    };

    fetchAdminStatus();
  }, [session, baseURL]); // Dependencies: session and baseURL

  return { isAdmin, loading }; // Return both isAdmin and loading
}
