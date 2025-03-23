//src/components/Navbar.js
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="bg-primary-dark text-text-light p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => router.push("/home")}>
        MyShop
      </h1>

      <div>
        {user ? (
          <>
            <span className="mr-4" onClick={() => router.push("/dashboard")}>Welcome, {user.name}!</span>
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded-lg text-text-light hover:opacity-80 transition duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push("/auth/login")}
            className="bg-accent px-4 py-2 rounded-lg text-text-light hover:opacity-80 transition duration-300"
          >
            Login| Signup
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
