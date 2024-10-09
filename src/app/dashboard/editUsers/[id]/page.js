


import EditUserForm from "@/components/EditUserForm";

const getUsersById = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; // Return null on error
  }
};

export default async function EditUser({ params }) {
  const { id } = params;

  console.log("ID from params:", id); // Log the ID to check its value

  if (!id) {
    return <div>Invalid user ID</div>; // Handle invalid ID case
  }

  const user = await getUsersById(id); // Call the function here

  if (!user) {
    return <div>User not found</div>; // Handle case where user is not found
  }

  // Assuming the user object structure is correct
  const { name, email, password, image } = user;

  return (
    <EditUserForm
      id={id}
      name={name}
      email={email}
      password={password}
      image={image}
    />
  );
}
