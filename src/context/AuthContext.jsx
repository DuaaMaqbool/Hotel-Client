import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

// Assuming these are your actual utility functions
import {
  checkAuth,
  login as loginAPI,
  logout as logoutAPI,
} from "../utils/auth";

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create a custom hook for using AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Assuming this is set up in your app
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// 3. Create the provider
export const AuthProvider = ({ children }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // New state variables to store user-specific data
  const [isOwner, setIsOwner] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);

  // This is the new function you wanted to add.
  // const fetchUser = async () => {
  //   try {
  //     // Axios automatically sends the cookie because of `withCredentials: true`
  //     const { data } = await axios.get('/api/user');

  //     if (data.success) {
  //       setIsOwner(data.role === 'hotelOwner');
  //       setSearchedCities(data.recentSearchedCities);
  //     } else {
  //       // NOTE: The original code had a recursive call with a setTimeout here.
  //       // It's generally better to handle the error without an automatic retry,
  //       // as this can lead to an infinite loop if the server is down.
  //       console.error("Failed to fetch user data. Server response was not successful.");
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //     console.error("Error fetching user data:", error);
  //   }
  // };
  const fetchUser = async () => {
    try {
      // Skip if no auth cookie/token
      if (!document.cookie.includes("token")) {
        return null;
      }

      const res = await axios.get("/api/user", { withCredentials: true });
      setUser(res.data.user);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setUser(null);
    }
  };

  // 4. Run initial auth check on load
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await checkAuth();
        if (response.isLoggedIn) {
          setIsAuthenticated(true);
          setUser(response.user);
          // Call the new function here to fetch user data
          fetchUser();
        } else {
          setIsAuthenticated(false);
          setUser(null);
          // Reset the user-specific data on logout/no login
          setIsOwner(false);
          setSearchedCities([]);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        // Reset the user-specific data on error
        setIsOwner(false);
        setSearchedCities([]);
      } finally {
        setIsLoading(false);
      }
    };
    verifyAuth();
  }, []);

  // 5. Login function (navigate passed from component)
  const handleLogin = async (email, password, navigate) => {
    try {
      const loginResponse = await loginAPI(email, password);

      if (loginResponse && loginResponse.user) {
        setIsAuthenticated(true);
        setUser(loginResponse.user);

        // Call the new function here after a successful login
        await fetchUser();

        if (loginResponse.user.role === "hotelOwner") {
          navigate("/owner");
        } else {
          navigate("/");
        }
      } else {
        throw new Error("User object missing from login response");
      }

      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
      setUser(null);
      return { success: false, error: error.message };
    }
  };

  // 6. Logout function (navigate passed from component)
  const handleLogout = async () => {
    await logoutAPI();
    setIsAuthenticated(false);
    setUser(null);
    // Reset the user-specific data on logout
    setIsOwner(false);
    setSearchedCities([]);
    // navigate("/");
  };

  // 7. Context value - Now includes the new state
  const value = {
    isAuthenticated,
    user,
    isLoading,
    isOwner,
    searchedCities,
    login: handleLogin,
    logout: handleLogout,
  };

  // 8. Return provider
  return (
    <AuthContext.Provider value={value}>
      {isLoading ? (
        <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
