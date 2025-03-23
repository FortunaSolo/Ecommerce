
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const newArrivals = products.slice(0, 5); // First 5 products as New Arrivals
  const recommended = products.slice(-5); // Last 5 products as Recommended

  return (
    <div className="min-h-screen bg-primary-light text-text-dark p-8">
      {/* Banner */}
      <div
        className="bg-cover bg-center h-96 rounded-xl shadow-2xl mb-12 relative overflow-hidden"
        style={{ backgroundImage: 'url("/banner.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
          <h1 className="text-5xl font-bold text-text-light text-center">Welcome to Our Store</h1>
        </div>
      </div>

      {/* New Arrivals */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-text-dark">New Arrivals</h2>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {newArrivals.map(product => (
            <Link key={product._id} href={`/products/${product._id}`}>
              <div className="min-w-[250px] bg-primary-dark hover:bg-accent rounded-xl shadow-lg p-4 transition-transform transform hover:scale-105">
                <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-text-light">{product.name}</h3>
                <p className="text-text-light">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recommended Products */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-text-dark">Recommended Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {recommended.map(product => (
            <Link key={product._id} href={`/products/${product._id}`}>
              <div className="bg-primary-dark hover:bg-accent rounded-xl shadow-lg p-4 transition-transform transform hover:scale-105">
                <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-text-light">{product.name}</h3>
                <p className="text-text-light">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Products */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-text-dark">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <Link key={product._id} href={`/products/${product._id}`}>
              <div className="bg-primary-dark hover:bg-accent rounded-xl shadow-lg p-4 transition-transform transform hover:scale-105">
                <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-text-light">{product.name}</h3>
                <p className="text-text-light">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;