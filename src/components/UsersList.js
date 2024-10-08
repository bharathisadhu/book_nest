

// import Link from "next/link";
// import RemoveBtn from "./RemoveBtn";
// import { HiPencilAlt } from "react-icons/hi";

// const getUsers = async () => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
//       cache: "no-store",
//     });

//     console.log("Response Status:", res.status); // Log the response status

//     if (!res.ok) {
//       throw new Error("Failed to fetch users");
//     }

//     const data = await res.json();
//     console.log("API Data:", data); // Check the full data structure
//     return data.users || []; // Adjust according to your API response structure
//   } catch (error) {
//     console.error("Error loading users:", error.message); // Log the error message
//     return []; // Return an empty array in case of error
//   }
// };

// export default async function UsersList() {
//   const users = await getUsers();
//   console.log("Users Array Length:", users.length); // Check if users array is populated

//   if (users.length === 0) {
//     return <div>No users found or failed to load users.</div>; // Show a message if no users
//   }

//   return (
//     <div className="font-sans overflow-x-auto">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-100 whitespace-nowrap">
//           <tr>
//             <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//               Name
//             </th>
//             <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//               Email
//             </th>
//             <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//               Role
//             </th>
//             <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//               Joined At
//             </th>
//             <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
//           {Array.isArray(users) &&
//             users.map((user) => (
//               <tr key={user.id}>
//                 <td className="px-4 py-4 text-sm text-gray-800">
//                   {user?.name}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-800">
//                   {user.email}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-800">
//                   Yet to be done
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-800">2022-05-15</td>
//                 <td className="flex px-4 py-4 text-sm text-gray-800">
//                   <Link href={`/dashboard/editUsers/${user._id}`}>
//                     <HiPencilAlt size={24} />
//                   </Link>
//                   <RemoveBtn id={user._id} />
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getUsers = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      cache: "no-store",
    });

    console.log("Response Status:", res.status); // Log the response status

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await res.json();
    console.log("API Data:", JSON.stringify(data, null, 2)); // Log the entire data structure
    return Array.isArray(data.users) ? data.users : data || []; // Adjust according to your API response structure
    
  } catch (error) {
    console.error("Error loading users:", error.message); // Log the error message
    return []; // Return an empty array in case of error
  }
};

export default async function UsersList() {
  const users = await getUsers();
  console.log("Users Array Length:", users.length); // Check if users array is populated
  console.log("Users List:", users); // Check the users list

  if (users.length === 0) {
    return <div>No users found or failed to load users.</div>; // Show a message if no users
  }

  return (
    <div className="font-sans overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Joined At
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {Array.isArray(users) &&
            users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {user?.name}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {user.email}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  Yet to be done
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">2022-05-15</td>
                <td className="flex px-4 py-4 text-sm text-gray-800">
                  <Link href={`/dashboard/users/editUsers/${user._id}`}>
                    <HiPencilAlt size={24} />
                  </Link>
                  <RemoveBtn id={user._id} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
