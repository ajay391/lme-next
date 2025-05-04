// hoc/withAuth.tsx
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithAuth(props: P) {
    const authState = useSelector((state: any) => state.auth);
    const router = useRouter();

    useEffect(() => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token || !authState.isAuthenticated) {
        router.push("/login"); // redirect to login if no token
      }
    }, [authState.isAuthenticated, router]);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // If not authenticated, you can also return null or a loader
    if (!token || !authState.isAuthenticated) {
      return <div>Loading...</div>; 
    }

    return <WrappedComponent {...props} />;
  };
}
