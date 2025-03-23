"use client";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-400 transition duration-200">Home</a></li>
              <li><a href="/shop" className="hover:text-gray-400 transition duration-200">Shop</a></li>
              <li><a href="/about" className="hover:text-gray-400 transition duration-200">About Us</a></li>
              <li><a href="/blog" className="hover:text-gray-400 transition duration-200">Blog</a></li>
              <li><a href="/contact" className="hover:text-gray-400 transition duration-200">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="/shipping" className="hover:text-gray-400 transition duration-200">Shipping Information</a></li>
              <li><a href="/returns" className="hover:text-gray-400 transition duration-200">Returns & Exchanges</a></li>
              <li><a href="/privacy" className="hover:text-gray-400 transition duration-200">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-gray-400 transition duration-200">Terms & Conditions</a></li>
              <li><a href="/faq" className="hover:text-gray-400 transition duration-200">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 mb-4">Get the latest updates on new products and exclusive offers.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition duration-200">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-200">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition duration-200">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition duration-200">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Your E-Commerce Store. All rights reserved.</p>
          <p className="mt-2">Designed with ❤️ by Your Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;