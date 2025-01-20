import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGallery = () => {
  const [email, setEmail] = useState('');
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loader for fetching images
  const [deleting, setDeleting] = useState(false); // Loader for deleting images

  // Fetch images based on email
  const fetchImages = async () => {
    if (!email) {
      setError('Please enter an email.');
      return;
    }

    setLoading(true); // Show loader
    try {
      const response = await axios.get(`https://full-backend-project2.onrender.com/images/${email}`);
      setImages(response.data.images);
      setError('');
      setMessage('');
    } catch (err) {
      setError('No images found for this email.');
      setMessage('');
    } finally {
      setLoading(false); // Hide loader
    }
  };

  // Handle image deletion
  const deleteImage = async (imageId) => {
    setDeleting(true); // Show loader for deleting
    try {
      const response = await axios.delete('http://localhost:3000/delete-image', {
        data: { imageId, email },
      });
      setDeleteMessage(response.data.message);
      setDeleteError('');
      setImages(images.filter((image) => image._id !== imageId)); // Remove deleted image from the list
    } catch (err) {
      setDeleteError('Failed to delete image.');
      setDeleteMessage('');
    } finally {
      setDeleting(false); // Hide loader
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

      <button
        onClick={fetchImages}
        className="btn btn-primary mb-3"
        disabled={loading}
      >
        {loading ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          'Fetch Images'
        )}
      </button>

      {/* Success/Error messages */}
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Success/Error messages for deletion */}
      {deleteMessage && <div className="alert alert-success">{deleteMessage}</div>}
      {deleteError && <div className="alert alert-danger">{deleteError}</div>}

      {/* Display Images */}
      <div className="row">
        {loading ? (
          <div className="col-12 text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Fetching Images...</span>
            </div>
          </div>
        ) : images.length > 0 ? (
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
                    disabled={deleting}
                  >
                    {deleting ? (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span className="visually-hidden">Deleting...</span>
                      </div>
                    ) : (
                      'Delete Image'
                    )}
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
