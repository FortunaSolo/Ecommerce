"use client"; 
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login"); // Redirect to login if not authenticated
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>; // Show loading state

  return user ? children : null;
};

export default ProtectedRoute;
