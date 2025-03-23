'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";
import axios from 'axios';
import Navbar from '@/components/Navbar';
import DashboardSidebar from '../../../components/ProfileCard'; // Correct the path if necessary

const AddProduct = () => {
  const [successMessage, setSuccessMessage] = useState(""); // Success message after product is added
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    categoryId: '',
    subcategoryId: '',
    phoneNumber: '',
    description: '',
    image: null,
    stock: '', // Stock field for product quantity
  });

  const [errors, setErrors] = useState({}); // To track form errors
  const [categories, setCategories] = useState([]); // Available categories for selection
  const [subcategories, setSubcategories] = useState([]); // Available subcategories based on category selection

  const router = useRouter(); // Router to handle navigation after successful form submission

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data); // Set fetched categories
      } catch (error) {
        console.error('Error fetching categories:', error); // Error handling
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories on component mount
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/subcategories');
        setSubcategories(response.data); // Set fetched subcategories
      } catch (error) {
        console.error('Error fetching subcategories:', error); // Error handling
      }
    };
    fetchSubcategories();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'image' ? files[0] : value, // Handle image file upload
    }));
  };

  // Validate form and submit data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};
    // Validate inputs and add errors to the formErrors object
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.price || formData.price <= 0) formErrors.price = 'Price must be positive';
    if (!formData.categoryId) formErrors.categoryId = 'Category is required';
    if (!formData.subcategoryId) formErrors.subcategoryId = 'Subcategory is required';
    if (!formData.phoneNumber) formErrors.phoneNumber = 'Phone number is required';
    if (!formData.stock || formData.stock < 1) formErrors.stock = 'Stock must be at least 1';

    setErrors(formErrors); // Set validation errors in the state

    // If there are validation errors, do not submit the form
    if (Object.keys(formErrors).length > 0) return;

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]); // Append all form data to FormData object
    });

    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      await axios.post('http://localhost:5000/api/products', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      });
      setSuccessMessage("Product added successfully!"); // Display success message
      setTimeout(() => {
        router.push("/dashboard"); // Redirect to dashboard after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message); // Handle errors
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <DashboardSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold text-primary-dark">Add Product</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-6">
          <div className="space-y-4">
            {/* Product Name Input */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-primary-mid">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md text-primary-dark"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Product Price Input */}
            <div className="flex flex-col">
              <label htmlFor="price" className="text-primary-mid">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md text-primary-dark"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>

            {/* Category Dropdown */}
            <div className="flex flex-col">
              <label htmlFor="categoryId" className="text-primary-mid">Category</label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md text-primary-dark"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId}</p>}
            </div>

            {/* Subcategory Dropdown */}
            <div className="flex flex-col">
              <label htmlFor="subcategoryId" className="text-primary-mid">Subcategory</label>
              <select
                id="subcategoryId"
                name="subcategoryId"
                value={formData.subcategoryId}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md text-primary-dark"
              >
                <option value="">Select a subcategory</option>
                {subcategories
                  .filter((sub) => sub.category._id === formData.categoryId) // Filter subcategories by selected category
                  .map((subcategory) => (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.name}
                    </option>
                  ))}
              </select>
              {errors.subcategoryId && <p className="text-red-500 text-sm">{errors.subcategoryId}</p>}
            </div>

            {/* Phone Number Input */}
            <div className="flex flex-col">
              <label htmlFor="phoneNumber" className="text-primary-mid">Phone Number</label>
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md text-primary-dark"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            </div>

            {/* Description Textarea */}
            <div className="flex flex-col">
              <label htmlFor="description" className="text-primary-mid">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md text-primary-dark"
              />
            </div>

            {/* Stock Input */}
            <div className="flex flex-col">
              <label htmlFor="stock" className="text-primary-mid">Stock</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md text-primary-dark"
              />
              {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
            </div>

            {/* Image Upload */}
            <div className="flex flex-col">
              <label htmlFor="image" className="text-primary-mid">Product Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md text-primary-dark"
              />
            </div>

            {/* Success Message */}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={Object.values(errors).some((error) => error !== '')}
              className="mt-4 w-full p-2 bg-primary-dark text-white rounded-md hover:bg-primary-mid"
            >
              Add Product
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddProduct;
