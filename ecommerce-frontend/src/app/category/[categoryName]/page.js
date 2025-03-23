// src/app/category/[categoryName]/page.js
"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

const CategoryPage = ({ params }) => {
    const { categoryName } = params;
    const searchParams = useSearchParams();
    const categoryId = searchParams.get("id"); // Get ID from query params
  
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/products?category=${categoryId}`);
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
  
      fetchProducts();
    }, [categoryId]);
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{categoryName}</h1>
        <p>Category ID: {categoryId}</p>
        <p>List products here...</p>
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.price} ETB</p>
          </div>
        ))}
      </div>
    );
  };