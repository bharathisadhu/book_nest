

"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';

export default function RemoveBtn({ id }) {
  const router = useRouter();

  const removeTopic = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (isConfirmed) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        router.refresh();
      } else {
        await Swal.fire({
          title: "Error!",
          text: "There was an error deleting the file.",
          icon: "error",
        });
      }
    }
  };

  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}
