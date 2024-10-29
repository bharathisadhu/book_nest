"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { HiPencilAlt } from "react-icons/hi";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineMarkEmailRead } from "react-icons/md";

export default function Component() {
  const { data: session } = useSession();
  const [user, setUsers] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    occupation: "",
    location: "",
    bio: "",
    image: "",
  });

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/user/${session?.user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
          setFormData({
            name: data.name || "",
            email: data.email || "",
            occupation: data.occupation || "",
            location: data.location || "",
            bio: data.bio || "",
            image: data.image || "",
          });
        });
    }
  }, [session?.user?.email]);

  const handleInputChange = async (e) => {
    const { name, value, files } = e.target;
    // Check if the input is a file upload (i.e., for the photo)
    if (name === "image" && files && files[0]) {
      const file = files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        setLoading(true);
        const imgbbResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_KEY}`,
          formData
        );
        // Get the image URL from the response
        const uploadedImageUrl = imgbbResponse.data.data.url;
        setFormData((prev) => ({ ...prev, [name]: uploadedImageUrl })); // Update the image URL in formData
        setUploadedImage(uploadedImageUrl);
        setLoading(false);
      } catch (error) {
        console.error("Error uploading image:", error);
        setLoading(false);
      }
    } else {
      // Handle regular input change
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        `/api/user/${session?.user?.email}`,
        formData
      ); // Directly pass formData

      if (response.status === 200) {
        // Check for 200 on successful update
        setUsers(response?.data);
        console.log(response?.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${formData.name} added to user!`, // Use formData.name here
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }

    console.log("Form submitted:", formData);
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <div className="lg:h-[80vh] font-sans flex flex-col justify-center items-center antialiased leading-normal tracking-wider">
      <div className="absolute inset-0 bg-userProfileBG opacity-20"></div>
      <div className="max-w-4xl flex items-center flex-wrap mx-auto my-32 lg:my-0 justify-center z-30 ">
        <div
          id="profile"
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none bg-white shadow-2xl opacity-100 mx-6 lg:mx-0 z-30 relative"
        >
          <div
            onClick={() => setIsOpen(true)}
            className="absolute right-2 top-12 cursor-pointer"
          >
            <HiPencilAlt size={32} />
          </div>
          <div className="px-12 lg:p-12 text-center lg:text-left z-30">
            <div className="z-50">
              <Image
                src={user?.image}
                width={500}
                height={500}
                alt="Profile"
                className="h-48 w-48 object-cover bg-center block lg:hidden rounded-full shadow-xl mx-auto -mt-16 z-50 border-[10px]"
              />
            </div>

            <h1 className="text-3xl font-bold pt-8 lg:pt-0 font-poppins">
              {user?.name}
            </h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-[#F65D4E] opacity-25"></div>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start font-poppins">
              <svg
                className="h-4 fill-current text-[#F65D4E] pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
              </svg>{" "}
              {user?.occupation || "What you do"}
            </p>
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start font-semibold font-poppins">
              <MdOutlineMarkEmailRead className="text-lg mr-4 text-[#F65D4E]" />
              {user.email || "Your Email"}
            </p>
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start font-semibold font-poppins">
              <svg
                className="h-4 fill-current text-[#F65D4E] pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
              </svg>{" "}
              {user.location || "Your Location - 25.0000° N, 71.0000° W"}
            </p>

            <h6 className="py-8 text-sm font-poppins">
              <p className="mb-2 font-bold font-poppins">About me</p>
              {user?.bio.slice(0, 350) ||
                "Totally optional short description about yourself, what you do and so on."}
              ...
            </h6>
          </div>
        </div>
        <div className="w-full lg:w-2/5 h-[537px] bg-white shadow-2xl hidden lg:block">
          <Image
            src={user?.image}
            width={500}
            height={500}
            alt="Profile"
            className="rounded-none lg:rounded-lg h-full w-full   "
          />
        </div>
      </div>
      {/* editing profile modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Edit profile</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 font-poppins font-medium"
            >
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              {/* photo upload input field  */}
              <div>
                <label
                  htmlFor="type2-2"
                  className="flex w-full max-w-[380px] md:w-[380px]"
                >
                  <div className="w-fit whitespace-nowrap bg-[#F65D4E] px-3 py-2 text-white">
                    Choose File
                  </div>
                  <div className="flex w-full max-w-[380px] items-center border-b-[2px] border-[#F65D4E] px-2 font-medium text-gray-400">
                    {uploadedImage
                      ? uploadedImage.split("/").pop()
                      : "No File Chosen"}
                  </div>
                </label>
                <input
                  onChange={handleInputChange}
                  className="hidden"
                  type="file"
                  name="image"
                  id="type2-2"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="occupation" className="text-sm font-medium">
                  Occupation
                </label>
                <input
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium">
                  Bio
                </label>

                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#F65D4E] text-white py-2 px-4 rounded hover:bg-red-500 transition duration-200 font-poppins font-semibold"
              >
                Save changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
