"use client";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css"; // ✅ Keep global styles
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
