// src/app/product/[id]/page.js
"use client";
import React, { useEffect, useState } from 'react';

const ProductDetailPage = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use React.use() to unwrap the params Promise
  const { id } = React.use(params);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen text-xl text-primary-mid">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-xl text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-primary-dark text-text-light p-8">
      <div className="max-w-4xl mx-auto bg-primary-mid rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold mb-6 text-accent">{product.name}</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-96 h-96 object-cover rounded-lg shadow-lg"
          />
          <div className="flex-1">
            <p className="text-lg mb-6 text-text-light">
              {product.description}
            </p>
            <p className="text-2xl font-semibold mb-6 text-accent">
              ${product.price}
            </p>
            <button
              className="w-full md:w-auto bg-accent hover:bg-primary-light text-text-light px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() =>
                (window.location.href = `tel:${product.phoneNumber}`)
              }
            >
              Call Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;