import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // "http://localhost:3000/submit-login",  // Uncomment when working locally
        "https://full-backend-project2.onrender.com/submit-login",  // Production URL
        formData
      );

      if (response.data.success) {
        setMessage(response.data.message);  // Show success message
        setError("");  // Clear any previous error message
        setFormData({
          email: "",
          password: "",
        });
      } else {
        setError(response.data.message);  // Show error message
        setMessage("");  // Clear success message
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
      setMessage("");  // Clear success message
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
