import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "male", // default value
    country: "",
    terms: false,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/submit-register",
        formData
      );
      setMessage(response.data.message || "Registration successful!");
      setError("");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "male",
        country: "",
        terms: false,
      });
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Registration</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email</label>
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

        <div className="col-md-6">
          <label htmlFor="password" className="form-label">Password</label>
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

        <div className="col-md-6">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="form-control"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="number"
            name="age"
            id="age"
            className="form-control"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select
            name="gender"
            id="gender"
            className="form-select"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="country" className="form-label">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            className="form-control"
            placeholder="Enter your country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <div className="form-check">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              className="form-check-input"
              checked={formData.terms}
              onChange={handleChange}
            />
            <label htmlFor="terms" className="form-check-label">
              I agree to the terms and conditions
            </label>
          </div>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
