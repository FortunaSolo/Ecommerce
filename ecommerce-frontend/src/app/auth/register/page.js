"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      // Redirect to login page after successful registration
      router.push("/auth/login");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary-dark">
      <div className="bg-primary-light p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-text-light text-2xl font-bold mb-4 text-center">Register</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-primary-mid text-text-light placeholder-gray-300"
            required
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-primary-mid text-text-light placeholder-gray-300"
            required
          />

          <button
            type="submit"
            className="w-full bg-accent text-text-light p-2 rounded-md hover:bg-text-dark transition duration-300"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Link to Login Page */}
        <p className="text-text-light text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-accent font-bold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
