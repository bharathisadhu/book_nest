"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "./DashboardLayout";


export default function EditUserForm({ id, name, email, password, image }) {
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newPassword, setNewPassword] = useState(password);
  const [newImage, setNewImage] = useState(image);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ newName, newEmail, newPassword, newImage }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update user");
      }

      router.push("/dashboard/users");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setNewName(e.target.value)}
          value={newName}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="User Name"
        />

        <input
          onChange={(e) => setNewEmail(e.target.value)}
          value={newEmail}
          className="border border-slate-500 px-8 py-2"
          type="email"
          placeholder="User Email"
        />

        <input
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          className="border border-slate-500 px-8 py-2"
          type="password"
          placeholder="User Password"
        />

        <input
          onChange={(e) => setNewImage(e.target.value)}
          value={newImage}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="User Password"
        />

        <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
          Update User
        </button>
      </form>
    </DashboardLayout>
  );
}
