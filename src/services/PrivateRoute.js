import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PrivateRoute = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Wait for session loading to finish
    if (status === "loading") return;

    // If not authenticated, redirect to login page
    if (!session) {
      // Check if router.query is defined before accessing redirect
      const redirect = router?.query?.redirect ? router?.query?.redirect : '/'; // Use '/' as a default if redirect is not available
      console.log("Redirecting to login. Current redirect:", redirect);

      // Redirect to login with the current path as a query parameter
      router.push(`/login?redirect=${encodeURIComponent(redirect)}`);
    }
  }, [session, status, router]);

  // Handle loading state
  if (status === "loading") {
    return <div>Loading...</div>; // Show loading state
  }

  // Render children if session exists
  return session ? <>{children}</> : null;
};

export default PrivateRoute;
