"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";

const ProductDetailPage = () => {
  const { id } = useParams(); // Get the id from the query parameters
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        console.log("Fetching product with ID:", id); // Debug log
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        console.log("Fetched product data:", data); // Debug log
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err); // Debug log
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen text-xl text-gray-600">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-xl text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
          {/* navbar */}
    <Navbar />
      <div className="max-w-4xl mx-auto bg-primary-light rounded-xl shadow-sm p-8 m-10 border border-gray-100 lg:relative">
        <h1 className="text-3xl font-bold mb-6 text-white">{product.name}</h1>

        <div className="flex flex-col md:flex-row gap-8">
          <img src={product.image} alt={product.name} className="w-full md:w-96 h-96 object-cover rounded-lg shadow-lg" />
          <div>
          <div className="flex-1">
            <p className="text-lg mt-4 mb-6 text-white">{ product.description}</p>
            </div>
            <div className ="lg:absolute bottom-0 right-0 mr-10 mb-10 lg:flex lg:items-center"> 
            <p className="text-2xl font-semibold lg:p-2 text-white">{product.price} ETB</p>

            <button
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => (window.location.href = `tel:${product.phoneNumber}`)}
            >
              Call Us
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;