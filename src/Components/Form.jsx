import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "Ayomide Adeniran",
    dateOfBirth: "",
    gender: "male",
    nationality: "Nigeria",
    address: "",
    phoneNumber: "0123456789",
    email: "ayomideadeniran@gmail.com",
    emergencyContactName: "61676476743424",
    emergencyContactRelationship: "98168486934",
    emergencyContactPhone: "48927472072",
    previousSchool: "Yale-University",
    gradeLevel: "200",
    coursesCompleted: "yes",
    gpa: "4.2",
    program: "Bachellor of Science",
    minor: "wowow",
    degreeType: "Bachelor",
    paymentMethod: "Cash",
    paymentAmount: "30",
    financialAid: false,
    housingPreferences: "Shared Room",
    extracurricularActivities: "Yes",
    specialNeeds: "Yes"
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State for loader

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://full-backend-project2.onrender.com/submit-form",
        formData
      );
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError("An error occurred while registering the student.");
      setMessage("");
    }
  };

  return (
    <div className="container">
      <h2>Student Registration Form</h2>
      {message &&
        <div className="alert alert-success">
          {message}
        </div>}
      {error &&
        <div className="alert alert-danger">
          {error}
        </div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-control"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Nationality</label>
          <input
            type="text"
            className="form-control"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Emergency Contact Name</label>
          <input
            type="text"
            className="form-control"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Emergency Contact Relationship</label>
          <input
            type="text"
            className="form-control"
            name="emergencyContactRelationship"
            value={formData.emergencyContactRelationship}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Emergency Contact Phone</label>
          <input
            type="text"
            className="form-control"
            name="emergencyContactPhone"
            value={formData.emergencyContactPhone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Previous School</label>
          <input
            type="text"
            className="form-control"
            name="previousSchool"
            value={formData.previousSchool}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Grade Level</label>
          <input
            type="number"
            className="form-control"
            name="gradeLevel"
            value={formData.gradeLevel}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Courses Completed</label>
          <input
            type="text"
            className="form-control"
            name="coursesCompleted"
            value={formData.coursesCompleted}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">GPA</label>
          <input
            type="number"
            className="form-control"
            name="gpa"
            value={formData.gpa}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Program</label>
          <input
            type="text"
            className="form-control"
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Minor</label>
          <input
            type="text"
            className="form-control"
            name="minor"
            value={formData.minor}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Degree Type</label>
          <select
            className="form-control"
            name="degreeType"
            value={formData.degreeType}
            onChange={handleChange}
            required
          >
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Payment Method</label>
          <input
            type="text"
            className="form-control"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Payment Amount</label>
          <input
            type="number"
            className="form-control"
            name="paymentAmount"
            value={formData.paymentAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Financial Aid</label>
          <input
            type="checkbox"
            className="form-check-input"
            name="financialAid"
            checked={formData.financialAid}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Housing Preferences</label>
          <select
            className="form-control"
            name="housingPreferences"
            value={formData.housingPreferences}
            onChange={handleChange}
            required
          >
            <option value="Shared Room">Shared Room</option>
            <option value="Single Room">Single Room</option>
            <option value="Dormitory">Dormitory</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Extracurricular Activities</label>
          <input
            type="text"
            className="form-control"
            name="extracurricularActivities"
            value={formData.extracurricularActivities}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Special Needs</label>
          <input
            type="text"
            className="form-control"
            name="specialNeeds"
            value={formData.specialNeeds}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>{" "}
      </form>
    </div>
  );
};

export default RegistrationForm;
