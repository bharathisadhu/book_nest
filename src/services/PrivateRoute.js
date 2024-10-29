import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "../app/loading";

export default function PrivateRoute({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to login page
    }
  }, [status, router]); // Make sure this effect is always called
  // Handle loading state
  if (status === "loading") {
    return <Loading />; // Show loading state
  }

  // If not authenticated, redirect to the login page

  // Render children only if session exists
  return session ? <>{children}</> : null; // Ensure consistent rendering
}
