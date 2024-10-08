import EditUserForm from "@/components/EditUserForm";


const getUsersById = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditUser({ params }) {
  const { id } = params;
  const { users } = await getUsersById(id);
  const { name, email, password, image } = users;

  return <EditUserForm id={id} name={name} email={email} password={password} image={image}/>;
}