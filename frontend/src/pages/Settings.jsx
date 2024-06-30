import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import no_avatar from '../images/pain.jpg';

function Settings() {
  const { user } = useAuthContext();

  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  const [meetupLocations, setMeetupLocations] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await fetch('/api/v1/profiles', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'SET_PROFILES', payload: json });
      }
    };

    fetchProfiles();
  }, [user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const profile = {
      username,
      firstname,
      lastname,
      phone,
      image,
      meetupLocations,
    };

    const response = await fetch('/api/v1/profiles', {
      method: 'POST',
      body: JSON.stringify(profile),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }
    if (response.ok) {
      setUsername('');
      setFirstname('');
      setLastname('');
      setPhone('');
      setImage('');
      setMeetupLocations('');
      setError(null);
      setEmptyFields([]);
      console.log('new profile added', json);
      dispatch({ type: 'CREATE_PROFILE', payload: json });
    }
  };

  return (
    <div className="settings">
      <form onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>

        <div className="upload-image-container">
          <div className="img-details">
            <label>Profile photo</label>
            <img src={no_avatar} alt="Profile" />
          </div>
          <div className="desc-details">
            <p>
              Clear frontal face photos are an important way for buyers and
              sellers to learn about each other.
            </p>
            <input
              type="text"
              onChange={(e) => setImage(e.target.value)}
              value={image}
              className={emptyFields.includes('image') ? 'error' : ''}
            />
            <button type="button">Upload a photo</button>
          </div>
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className={emptyFields.includes('username') ? 'error' : ''}
          />
        </div>

        <div>
          <label htmlFor="firstname">First name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            className={emptyFields.includes('firstname') ? 'error' : ''}
          />
        </div>

        <div>
          <label htmlFor="lastname">Last name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
            className={emptyFields.includes('lastname') ? 'error' : ''}
          />
        </div>

        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="number"
            id="phone"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            className={emptyFields.includes('phone') ? 'error' : ''}
          />
        </div>

        <div>
          <label htmlFor="locations">Meet up locations:</label>
          <input
            type="text"
            id="locations"
            name="locations"
            onChange={(e) => setMeetupLocations(e.target.value)}
            value={meetupLocations}
            className={emptyFields.includes('meetupLocations') ? 'error' : ''}
          />
        </div>

        <button type="submit">Save Changes</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Settings;

// references for creating profile page + settings:
// useContext: https://www.youtube.com/watch?v=NKsVV7wJcDM&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=11
// useReducer: https://vimeo.com/938650951/9c03f94370
