import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGallery = () => {
  const [email, setEmail] = useState('');
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  // Fetch images based on email
  const fetchImages = async () => {
    if (!email) {
      setError('Please enter an email.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3000/images/${email}`);
      setImages(response.data.images);
      setError('');
      setMessage('');
    } catch (err) {
      setError('No images found for this email.');
      setMessage('');
    }
  };

  // Handle image deletion
  const deleteImage = async (imageId) => {
    try {
      const response = await axios.delete('http://localhost:3000/delete-image', {
        data: { imageId, email }
      });
      setDeleteMessage(response.data.message);
      setDeleteError('');
      setImages(images.filter((image) => image._id !== imageId)); // Remove deleted image from the list
    } catch (err) {
      setDeleteError('Failed to delete image.');
      setDeleteMessage('');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    // Clear previous images and messages when email changes
    setImages([]);
    setMessage('');
    setError('');
    setDeleteMessage('');
    setDeleteError('');
  }, [email]);

  return (
    <div className="container mt-5">
      <h2>Fetch and Delete Images by Email</h2>

      {/* Email input to fetch images */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Enter Email to Fetch Images
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

      <button onClick={fetchImages} className="btn btn-primary mb-3">
        Fetch Images
      </button>

      {/* Success/Error messages */}
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Success/Error messages for deletion */}
      {deleteMessage && <div className="alert alert-success">{deleteMessage}</div>}
      {deleteError && <div className="alert alert-danger">{deleteError}</div>}

      {/* Display Images */}
      <div className="row">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image._id} className="col-md-4 mb-3">
              <div className="card">
                <img
                  src={`data:${image.contentType};base64,${image.image}`}
                  className="card-img-top"
                  alt="Uploaded"
                />
                <div className="card-body">
                  <h5 className="card-title">Image {image._id}</h5>
                  <button
                    onClick={() => deleteImage(image._id)}
                    className="btn btn-danger"
                  >
                    Delete Image
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No images found for this email.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
