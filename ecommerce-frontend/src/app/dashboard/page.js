// src/app/dashboard/page.js
"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext"; // Custom hook for authentication context
import axios from "axios";
import DashboardSidebar from "@/components/ProfileCard"; // Sidebar component
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function SellerDashboard() {
  const { user } = useAuth(); // Get user from auth context

  const [products, setProducts] = useState([]); // State for products
  const [loading, setLoading] = useState(true); // Loading state for fetching products

  // Fetch products when user is available
  useEffect(() => {
    if (!user) return; // If no user, do not proceed with fetching

    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        const response = await axios.get(
          "http://localhost:5000/api/products/my-products", 
          { headers: { Authorization: `Bearer ${token}` } } // Pass token in headers
        );

        setProducts(response.data); // Store fetched products in state
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchProducts(); // Trigger fetch on component mount

  }, [user]); // Re-run effect when user changes

  // Delete product handler
  const handleDelete = async (productId) => {
    // Confirmation before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token"); // Retrieve token
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove deleted product from state
      setProducts((prevProducts) => prevProducts.filter((p) => p._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error); // Log error if deletion fails
      alert("Failed to delete product."); // Show alert for failure
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      <div className="min-h-screen flex bg-gray-100 flex-col">
        {/* Sidebar component */}
        <DashboardSidebar />

        {/* Main content */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">My Products</h1>

          {/* Loading state or product display */}
          {loading ? (
            <p className="text-gray-700">Loading...</p> // Show loading message
          ) : products.length === 0 ? (
            <p className="text-gray-500">No products found.</p> // No products message
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Render products */}
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <img
                    src={product.image || "https://via.placeholder.com/150"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">ETB {product.price}</p>
                    <p className="text-gray-500 text-sm mt-1">{product.description}</p>

                    <div className="flex items-center justify-between mt-4">
                      {/* Edit button */}
                      <Link href={`/dashboard/edit-product/${product._id}`}>
                        <button className="text-blue-500 hover:text-blue-700">
                          Edit
                        </button>
                      </Link>
                      {/* Delete button */}
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
