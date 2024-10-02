import { useEffect } from "react";
import { useSession } from "next-auth/react";

const PrivateRoute = ({ children }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      window.location.href = "/login";
    }
  }, [session, status]);

  if (session) {
    return <>{children}</>;
  }

  return <div>Loading...</div>;
};

export default PrivateRoute;
