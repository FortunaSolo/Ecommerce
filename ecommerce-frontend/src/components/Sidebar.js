// ecommerce-frontend/src/components/Sidebar.js
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Sidebar = ({ categories }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [subcategoriesMap, setSubcategoriesMap] = useState({}); // ✅ Store subcategories per category
  const router = useRouter();

  // Handle category click
  const toggleCategory = async (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null); // Collapse the category if it's already open
      return;
    }

    setExpandedCategory(categoryId); // Expand the clicked category

    // ✅ Fetch subcategories only for the clicked category
    if (!subcategoriesMap[categoryId]) {
      try {
        const response = await fetch(`http://localhost:5000/api/subcategories?category=${categoryId}`);
        const data = await response.json();
        setSubcategoriesMap((prev) => ({ ...prev, [categoryId]: data })); // Store only for this category
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    }
  };

  return (
    <div className="w-64 p-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul>
        {categories?.length > 0 ? (
          categories.map((category) => (
            <li key={category._id} className="mb-2">
              <button
                className="w-full text-left font-semibold text-blue-600 hover:text-blue-800"
                onClick={() => toggleCategory(category._id)}
              >
                {category.name}
              </button>

              {/* Show subcategories only for the selected category */}
              {expandedCategory === category._id && (
                <ul className="ml-4 mt-2 space-y-2">
                  {subcategoriesMap[category._id]?.map((sub) => (
                    <li key={sub._id}>
                      <button
                        className="text-left text-blue-500 hover:text-blue-700"
                        onClick={() => router.push(`/products?subcategory=${sub._id}`)}
                      >
                        {sub.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
