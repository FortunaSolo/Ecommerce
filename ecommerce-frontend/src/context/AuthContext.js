// src/context/AuthContext.js
"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Create authentication context
export const AuthContext = createContext(null);

// Custom hook to access auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser)); // Initialize user from localStorage
      setLoading(false); // Set loading false since user is already available
    } else if (token) {
      fetchUserProfile(token); // Fetch user profile from the API
    } else {
      setLoading(false); // No token, just stop loading
    }
  }, []);

  // Fetch user details from API
  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data); // Store user data
      localStorage.setItem("user", JSON.stringify(response.data)); // Store user in localStorage
    } catch (error) {
      console.error("Error fetching user profile:", error);
      logout(); // Logout if token is invalid
    } finally {
      setLoading(false); // Finished loading
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token } = response.data; // Get token from response
      localStorage.setItem("token", token); // Store token
      await fetchUserProfile(token); // Fetch user details after login
      router.push("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      const { token } = response.data; // Get token from response
      localStorage.setItem("token", token); // Store token
      await fetchUserProfile(token); // Fetch user details after registration
      router.push("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message || error.message);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/auth/login"); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
