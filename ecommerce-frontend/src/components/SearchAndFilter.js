"use client";
import React from "react";

const SearchAndFilter = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories }) => {
  return (
    <div className="flex flex-col md:flex-row gap-1 md:space-y-4 m-2 ml-5">
      <input
        type="text"
        placeholder="Search products..."
        className="p-3 w-full md:w-1/3 rounded-lg border border-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors mt-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // ✅ Update state from parent (HomePage)
      />

      <select
        className="p-3 w-full md:w-1/2 rounded-lg border border-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)} // ✅ Update state from parent (HomePage)
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchAndFilter;
