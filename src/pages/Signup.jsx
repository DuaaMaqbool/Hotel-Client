import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [backendError, setBackendError] = useState("");
  const [loading, setLoading] = useState(false);

  // Real-time validation
  useEffect(() => {
    const newErrors = { ...errors };

    // Username validation (4-20 chars)
    if (
      formData.username.length > 0 &&
      (formData.username.length < 4 || formData.username.length > 20)
    ) {
      newErrors.username = "Username must be 4-20 characters";
    } else {
      newErrors.username = "";
    }

    // Email validation
    if (formData.email.length > 0 && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    } else {
      newErrors.email = "";
    }

    // Password validation (6-20 chars)
    if (
      formData.password.length > 0 &&
      (formData.password.length < 6 || formData.password.length > 20)
    ) {
      newErrors.password = "Password must be 6-20 characters";
    } else {
      newErrors.password = "";
    }

    // Confirm password
    if (
      formData.confirmPassword.length > 0 &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    } else {
      newErrors.confirmPassword = "";
    }

    setErrors(newErrors);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBackendError("");

    // Check for any remaining errors
    if (
      Object.values(errors).some((err) => err) ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      setBackendError("Please fix all errors before submitting");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role, // Pass the selected role to the backend
        }
      );

      if (response.status === 201) {
        navigate("/login", {
          state: { successMessage: "Registration successful! Please login." },
        });
      }
    } catch (error) {
      setBackendError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "1.5rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Sign Up</h2>

      {backendError && (
        <p style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>
          {backendError}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Username:
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            minLength="4"
            maxLength="20"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: `1px solid ${errors.username ? "red" : "#ddd"}`,
              borderRadius: "4px",
            }}
          />
          {errors.username && (
            <p
              style={{
                color: "red",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.username}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              border: `1px solid ${errors.email ? "red" : "#ddd"}`,
              borderRadius: "4px",
            }}
          />
          {errors.email && (
            <p
              style={{
                color: "red",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.email}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
            maxLength="20"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: `1px solid ${errors.password ? "red" : "#ddd"}`,
              borderRadius: "4px",
            }}
          />
          {errors.password && (
            <p
              style={{
                color: "red",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.password}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              border: `1px solid ${errors.confirmPassword ? "red" : "#ddd"}`,
              borderRadius: "4px",
            }}
          />
          {errors.confirmPassword && (
            <p
              style={{
                color: "red",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* New Role Dropdown */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Account Type:
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor: "#fff",
            }}
          >
            <option value="user">User</option>
            <option value="hotelOwner">Hotel Owner</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "500",
          }}
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "1.5rem" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
