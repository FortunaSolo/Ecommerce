//src/app/home/page.js
"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Banner from "@/components/Banner"; // 🖼️ Banner
import NewArrivals from "@/components/NewArrivals"; // 🎉 New Arrivals carousel
import CategoryBar from "@/components/CategoryBar"; // 🏷️ Horizontal Category Bar
import Navbar from "@/components/Navbar";
import SearchAndFilter from "@/components/SearchAndFilter"

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    }

    async function fetchCategories() {
      const response = await fetch("http://localhost:5000/api/categories");
      const data = await response.json();
      setCategories(data);
    }

    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? product.category._id === selectedCategory : true)
  );

  return (
    <div className="relative flex-1 min-h-screen bg-white text-gray-900">
      <Navbar /> {/* Navbar */}
      <Banner /> {/* 🖼️ Banner Section */}

      <div className="container mx-auto px-4 py-8">
        <CategoryBar categories={categories} /> 

        {/* ✅ Pass search state and setters to SearchAndFilter */}
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        <NewArrivals /> {/* 🎉 New Arrivals carousel */}

        {/* Section Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-6">Recommended</h2>

        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center col-span-4 text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;