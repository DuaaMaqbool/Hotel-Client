import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password },
      {
        withCredentials: true,
      }
    );

    return {
      success: true,
      message: response.data.message,
      user: response.data.user,
    };
  } catch (error) {
    console.error("Login failed in frontend utility:", error);

    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logout = async () => {
  try {
    await axios.post(
      `${API_URL}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log("Logout successful");
  } catch (error) {
    console.error("Logout failed:", error);
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/check-auth`, {
      withCredentials: true,
    });
    // The backend's response should contain the user object from the token.
    return {
      isLoggedIn: response.data.isLoggedIn,
      user: response.data.user,
    };
  } catch (err) {
    return { isLoggedIn: false, user: null };
  }
};
