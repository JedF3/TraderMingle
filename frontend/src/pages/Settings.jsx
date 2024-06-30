import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import no_avatar from '../images/no-avatar.svg';

function Settings() {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    image: '',
    phone: '',
    locations: '',
  });
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/v1/user/signup${user._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        setFormData({
          email: data.email || '',
          password: '', // Leave blank for security reasons
          username: data.username || '',
          image: data.image[0]?.path || '',
          phone: data.phone || '',
          locations: data.meetupLocations || '',
        });
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [user]);

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

    const response = await fetch(`/api/v1/user/signup${user._id}`, {
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
            <img src={formData.image || no_avatar} alt="Profile" />
          </div>
          <div className="desc-details">
            <p>
              Clear frontal face photos are an important way for buyers and
              sellers to learn about each other.
            </p>
            <button type="button">Upload a photo</button>
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

        <button type="submit">Save Changes</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Settings;
