"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // ✅ Import usePathname
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }) {
  const [categories, setCategories] = useState([]);
  const pathname = usePathname(); // ✅ Get the current page URL

  useEffect(() => {
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

  // ✅ Check if we're on the login or register page
  const hideSidebar = pathname.startsWith("/auth");

  return (
    <html lang="en">
      <body className="flex">
        {/* ✅ Show Sidebar only if NOT on auth pages */}
        {!hideSidebar && <Sidebar categories={categories} />}
        
        {/* Main page content */}
        <main className="flex-1 p-4">{children}</main>
      </body>
    </html>
  );
}
