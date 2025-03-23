"use client";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function DashboardSidebar() {
  const { user } = useContext(AuthContext);

  return (
    <div className=" w-80 bg-primary-dark text-white rounded-lg shadow-md m-4 lg:mb-0 lg:mr-6 flex flex-row items-center p-4 gap-5">
      {/* Profile Section */}
      <div className="flex items-center gap-5 lg:w-1/2">
        {/* Profile Picture */}
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt="Seller Profile"
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center">
            <span className="text-white text-lg">
              {user?.name ? user.name[0] : "?"}
            </span>
          </div>
        )}

        {/* Name and Seller Label */}
        <div>
          <p className="font-semibold text-lg">{user?.name || "Loading..."}</p>
          <p className="text-sm text-gray-400">Seller</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex justify-center item-center items-center w-2/3">
        <ul className="flex flex-col items-center space-y- m-0">
          <li className=" w-full p-2 rounded-md text-gray-300 text-center hover:bg-gray-700 transition-colors duration-200">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className=" w-full p-2 rounded-md text-gray-300 text-center hover:bg-gray-700 transition-colors duration-200">
            <Link href="/dashboard/add-product">Add Product</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}