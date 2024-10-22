"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "../app/loading";
import Image from "next/image";

export default function Cart() {
  const { data: session } = useSession();
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/carts/${session?.user?.email}`, {
          cache: "no-store",
        });

        if (res.status === 200) {
          // In Axios, the response data is already parsed as JSON
          const data = res.data;
          setCarts(data);
        } else {
          console.error("Failed to fetch carts: ", res.status);
          setCarts([]);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error loading carts:", error.message); // Log the error message
        setCarts([]); // Set carts to empty array in case of error
        setIsLoading(false); // Ensure loading state is set to false even in case of error
      }
    };

    fetchData();
  }, [session?.user?.email]);

  console.log(carts);
  if (isLoading && carts.length === 0) {
    return <Loading />; // Use your existing loading component
  }

  if (carts.length === 0) {
    return <div>No cart found or failed to load cart.</div>;
  }
  return (
    <div className="font-sans lg:max-h-[580px] overflow-x-auto overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Book Image
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Book Name
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Ratings
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {Array.isArray(carts) &&
            carts.map((cart) => {
              return (
                <tr key={cart._id}>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    <Image
                      src={cart.image}
                      alt={cart.name}
                      width={40}
                      height={60}
                    />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {cart?.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {cart?.category}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {cart.author}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    ${cart.price.toFixed(2)} {/* Formatting price */}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {cart.rating}
                  </td>
                  {/* <td className="flex px-4 py-4 text-sm text-gray-800">
                      <Link href={`/dashboard/editbooks/${book._id}`}>
                        <HiPencilAlt size={24} />
                      </Link>
                      <RemoveBtn id={book._id} />
                    </td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
