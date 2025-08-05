import React, { createContext, useContext, useState, useEffect } from "react";
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

// 3. Create the provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 4. Run initial auth check on load
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await checkAuth();
        if (response.isLoggedIn) {
          setIsAuthenticated(true);
          setUser(response.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
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
  const handleLogout = async (navigate) => {
    await logoutAPI();
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  };

  // 7. Context value
  const value = {
    isAuthenticated,
    user,
    isLoading,
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
