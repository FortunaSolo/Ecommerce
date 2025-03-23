//ecommerce-frontend/src/app/products/page.js
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const searchParams = useSearchParams(); // Read category/subcategory from URL

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.price} ETB</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
