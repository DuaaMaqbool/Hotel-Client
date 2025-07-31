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

export const isLoggedIn = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/auth/check-auth", {
      withCredentials: true, // Important to send cookies
    });

    return res.data.isLoggedIn;
  } catch (err) {
    return false;
  }
};
// export const logout = () => {
//   localStorage.removeItem("token");
//   window.location.href = "/"; // redirect to homepage
// };

export const logout = async () => {
  try {
    await axios.post("http://localhost:3000/api/auth/logout", {}, {
      withCredentials: true,
    });

    console.log("Logout successful");
    window.location.href = "/"; // Redirect to homepage
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export const checkAuth = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/auth/check-auth');
    return response.data.loggedIn;
  } catch (err) {
    return false;
  }
};