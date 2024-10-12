"use client"; // Make sure this is a client component
import { useEffect, useState } from "react";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Swal from "sweetalert2";
import Loading from "../app/loading";
import Image from "next/image";

export default function UsersList() {
  const [users, setUsers] = useState([]); // State to hold users
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isUpdating, setIsUpdating] = useState(false); // Updating state
  const [selectedUser, setSelectedUser] = useState(null); // Selected user for update
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [selectedImage, setSelectedImage] = useState(null); // Store the image file

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
          {
            cache: "no-store",
          }
        );

        if (res.ok) {
          const data = await res.json();
          setUsers(Array.isArray(data) ? data : []); // Use data directly as it's already an array
        } else {
          setUsers([]);
        }
      } catch (error) {
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers(); // Fetch users on mount
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setSelectedImage(null); // Reset image selection on close
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]); // Store selected image
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMAGE_UPLOAD_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (res.ok) {
      const data = await res.json();
      console.log("Image Upload Response: ", data); // Log image upload response
      return data.data.url; // Return the uploaded image URL
    } else {
      const errorData = await res.text(); // Log the image upload error details
      console.error("Image Upload Error: ", errorData);
      throw new Error("Image upload failed");
    }
  };

  const updateUser = async (userData) => {
    const previousUser = users.find((user) => user._id === userData._id); // Store previous user data

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userData._id ? { ...user, ...userData } : user
      )
    ); // Optimistic update

    setIsUpdating(true); // Set loading state for update operation

    try {
      let imageUrl = selectedUser.image || ""; // Default to the current image or empty string

      // Upload the new image if a file is selected
      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

      const updatedUserData = { ...userData, image: imageUrl };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
        }
      );

      if (res.ok) {
        await Swal.fire({
          title: "Updated!",
          text: "The user has been updated.",
          icon: "success",
        });
        setIsModalOpen(false);
        setSelectedUser(null);
      } else {
        // Revert optimistic update on failure
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === previousUser._id ? previousUser : user
          )
        );
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while updating the user.",
        icon: "error",
      });
    } finally {
      setIsUpdating(false); // Reset loading state after operation
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

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
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-4 py-4 text-sm text-gray-800">{user.name}</td>
              <td className="px-4 py-4 text-sm text-gray-800">{user.email}</td>
              <td className="px-4 py-4 text-sm text-gray-800">
                {user.role || "Not assigned"} {/* Use actual role */}
              </td>
              <td className="flex px-4 py-4 text-sm text-gray-800 space-x-4">
                <HiPencilAlt
                  size={24}
                  onClick={() => handleEditClick(user)} // Trigger modal on click
                  className="cursor-pointer"
                />
                <RemoveBtn id={user._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold">Update User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateUser(selectedUser);
              }}
            >
              <div className="mt-4">
                <label className="block text-sm">Name</label>
                <input
                  type="text"
                  name="name"
                  value={selectedUser.name}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={selectedUser.email}
                  onChange={handleInputChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm">Current Image</label>
                {selectedUser.image ? ( // Conditional rendering for image
                  <Image
                    src={selectedUser.image}
                    alt="User"
                    className="mb-4 w-32 h-32 object-cover"
                    width={128}
                    height={128}
                  />
                ) : (
                  <div className="mb-4 w-32 h-32 bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  type="submit"
                  className="bg-[#F65D4E] text-black px-4 py-2 rounded"
                >
                  {isUpdating ? "Updating..." : "Update User"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded ml-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
