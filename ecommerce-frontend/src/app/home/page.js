// ecommerce-frontend/src/app/home/page.js
"use client"; // ✅ Make sure this file is a client component
import React from "react";

const HomePage = () => {
  return (
    <div className="flex-1 p-4">
      <h1 className="text-3xl font-bold">Welcome to Our Store</h1>
      <p>Explore our categories and find amazing products.</p>
    </div>
  );
};

export default HomePage;
