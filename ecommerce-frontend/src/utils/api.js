//ecommerce-frontend\src\utils\api.js
const API_URL = "http://localhost:5000/api/auth"; // Change to your backend URL in production

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Registration failed");
    
    return data; // Returns user data & token if successful
  } catch (error) {
    throw error;
  }
};

// Login User
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login failed");
    
    return data; // Returns user data & token if successful
  } catch (error) {
    throw error;
  }
};
