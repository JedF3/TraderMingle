import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

function Settings() {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    locations: '',
  });
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const response = await fetch('/api/v1/signup', {
      method: 'PATCH',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    } else {
      setFormData({
        username: '',
        email: '',
        password: '',
        phone: '',
        locations: '',
      });
      setError(null);
      setEmptyFields([]);
      console.log('Profile updated', json);
    }
  };

  return (
    <div className="settings">
      <form onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>

        <div className="upload-image-container">
          <div className="img-details">
            <label>Profile photo</label>
            <img
              src="https://preview.redd.it/confession-i-though-pain-was-going-to-be-revealed-as-v0-y8xbcb5tiooa1.jpg?width=640&crop=smart&auto=webp&s=f5f28b9d9cb5eff7b6368030181c2ef47be7395d"
              alt=""
            />
          </div>
          <div className="desc-details">
            <p>
              Clear frontal face photos are an important way for buyers and
              sellers to learn about each other.
            </p>
            <button>Upload a photo</button>
          </div>
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="locations">Meet up locations:</label>
          <input
            type="text"
            id="locations"
            name="locations"
            value={formData.locations}
            onChange={handleChange}
          />
        </div>

        <button>Save Changes</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Settings;
