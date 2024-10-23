import { useSession } from "next-auth/react";

const PrivateRoute = ({ children }) => {
  const { data: session, status } = useSession();

  // Handle loading state
  if (status === "loading") {
    return <div>Loading...</div>; // Show loading state
  }

  // Render children if session exists
  return session ? <>{children}</> : null;
};

export default PrivateRoute;
