// src/components/ProductCard.js
import React from "react";

const ProductCard = () => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h3 className="text-lg font-bold">Product Name</h3>
      <p className="text-gray-600">Product Description</p>
      <p className="text-blue-600 font-semibold">Price: $0.00</p>
    </div>
  );
};

export default ProductCard;
