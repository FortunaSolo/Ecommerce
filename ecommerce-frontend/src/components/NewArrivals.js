"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard"; // Assuming this is your product card component

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    async function fetchNewArrivals() {
      const response = await fetch("http://localhost:5000/api/products"); // Adjust API if necessary
      const data = await response.json();
      setNewArrivals(data);
    }

    fetchNewArrivals();
  }, []);

  return (
    <div className="relative my-10 -z-1">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">New Arrivals</h2>

      {/* Carousel Container */}
      <div className="overflow-x-auto whitespace-nowrap scroll-smooth pb-4">
        <div className="flex space-x-4">
          {newArrivals.length > 0 ? (
            newArrivals.map((product) => (
              <div
                key={product._id}
                className="flex-shrink-0 w-60 rounded-lg bg-primary-mid p-4"
              >
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p className="text-text-light">No new arrivals found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
