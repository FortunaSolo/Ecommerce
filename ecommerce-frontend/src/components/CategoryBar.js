"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CategoryBar = ({ categories }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [subcategoriesMap, setSubcategoriesMap] = useState({});
  const router = useRouter();

  // Toggle category & fetch subcategories
  const toggleCategory = async (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);

    if (!subcategoriesMap[categoryId]) {
      try {
        const response = await fetch(`http://localhost:5000/api/subcategories?category=${categoryId}`);
        const data = await response.json();
        setSubcategoriesMap((prev) => ({ ...prev, [categoryId]: data }));
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    }
  };

  return (
    <nav className="bg-primary-dark border-b border-gray-200 shadow-lg z-50 relative w-full">
      {/* Flex container for categories */}
      <div className="flex flex-wrap md:flex-nowrap overflow-visible justify-center space-x-4 p-2 md:p-4">
        {categories?.length > 0 ? (
          categories.map((category) => (
            <div key={category._id} className="relative mb-1 md:mb-0">
              <button
                className="px-2 py-1 text-white hover:text-white-200 hover:bg-gray-80 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50"
                onClick={() => toggleCategory(category._id)}
              >
                {category.name}
              </button>

              {/* Subcategories Dropdown (visible only for the expanded category) */}
              {expandedCategory === category._id && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
                  {subcategoriesMap[category._id]?.map((sub) => (
                    <button
                      key={sub._id}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      onClick={() => router.push(`/products?subcategory=${sub._id}`)}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">Loading categories...</p>
        )}
      </div>
    </nav>
  );
};

export default CategoryBar;