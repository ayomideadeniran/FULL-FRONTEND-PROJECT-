import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loader state

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !email) {
      setError('Please provide both email and image');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', image);
    formData.append('email', email);

    setLoading(true); // Show loader
    try {
      const response = await axios.post(
        'https://full-backend-project2.onrender.com/submit-upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setMessage(response.data.message);
      setError('');
      setImage(null);
      setEmail('');
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image');
      setMessage('');
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload Profile Image</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="profileImage" className="form-label">
            Profile Image
          </label>
          <input
            type="file"
            id="profileImage"
            className="form-control"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Uploading...</span>
            </div>
          ) : (
            'Upload Image'
          )}
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
