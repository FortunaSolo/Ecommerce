"use client";
import React from "react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/products/${product._id}`} passHref>
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 ease-in-out cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover mb-4 rounded-lg"
        />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <p className="text-lg font-bold text-blue-600">{product.price} ETB</p>
      </div>
    </Link>
  );
};

export default ProductCard;
