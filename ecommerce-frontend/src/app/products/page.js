"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CategoryBar from "@/components/CategoryBar";
import ProductCard from "@/components/ProductCard"; // Assuming you're using the updated ProductCard
import Navbar from "@/components/Navbar";
import SearchAndFilter from "@/components/SearchAndFilter";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState("");
  const searchParams = useSearchParams(); // Read category/subcategory from URL

  useEffect(() => {
    // Fetch categories for the CategoryBar
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      let query = "";
      if (searchParams.has("category")) {
        query = `category=${searchParams.get("category")}`;
      }
      if (searchParams.has("subcategory")) {
        query = `subcategory=${searchParams.get("subcategory")}`;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/products?${query}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const filteredProducts = products.filter(
    (product)=> 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? product.category._id === selectedCategory : true)
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* CategoryBar */}
      <CategoryBar categories={categories} />

      {/* Search and Filter */}
      <SearchAndFilter  
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
    selectedCategory={selectedCategory}
    setSelectedCategory={setSelectedCategory}
    categories={categories}
      />

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Products</h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
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

export default ProductsPage;