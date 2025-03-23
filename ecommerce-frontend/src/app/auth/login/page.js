"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token);

      // Redirect to the dashboard after login
      await login(formData.email, formData.password);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary-dark">
      <div className="bg-primary-light p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-text-light text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-primary-mid text-text-light placeholder-gray-300"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-primary-mid text-text-light placeholder-gray-300"
            required
          />

          <button
            type="submit"
            className="w-full bg-accent text-text-light p-2 rounded-md hover:bg-text-dark transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Link to Register Page */}
        <p className="text-text-light text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-accent font-bold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
