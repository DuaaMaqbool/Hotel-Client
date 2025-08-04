// import axiosInstance from "./axiosInstance";

// export const logout = async () => {
//   try {
//     await axiosInstance.post("/auth/logout"); // or .get if you're using GET
//     console.log("Logout successful");
//   } catch (error) {
//     console.error("Logout failed", error); // ← this is what you're seeing
//   }
// };

// export const checkAuth = async () => {
//   try {
//     const res = await axiosInstance.get('/auth/my-bookings');
//     return res.data.user;
//   } catch (err) {
//     return null;
//   }
// };

// export const isLoggedIn = async () => {
//   const user = await checkAuth();
//   return !!user;
// };

// export const isLoggedIn = () => {
//   return !!localStorage.getItem("token");
// };
import axios from 'axios';

// The URL for your backend's API
const API_URL = 'http://localhost:3000/api/auth';

/**
 * Handles the user logout process by clearing the session token cookie.
 */
export const logout = async () => {
  try {
    // Making a POST request to the logout endpoint.
    // withCredentials is crucial for sending the HttpOnly cookie.
    await axios.post(`${API_URL}/logout`, {}, {
      withCredentials: true,
    });
    console.log("Logout successful");
    // Redirect the user to the homepage after successful logout.
    window.location.href = "/";
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

/**
 * Checks the user's authentication status with the backend.
 * @returns {boolean} True if the user is logged in, false otherwise.
 */
export const checkAuth = async () => {
  try {
    // 💡 FIX: Added { withCredentials: true } to the request.
    // This is essential for sending the auth cookie to the backend.
    const response = await axios.get(`${API_URL}/check-auth`, {
      withCredentials: true,
    });
    // The backend's response key is "isLoggedIn", so we return that.
    return response.data.isLoggedIn; 
  } catch (err) {
    // If the request fails (e.g., 401 Unauthorized), the user is not logged in.
    return false;
  }
};
