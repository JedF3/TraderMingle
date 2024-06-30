import React, { useState } from 'react';
import { useProfilesContext } from '../hooks/useProfilesContext';
import { useAuthContext } from '../hooks/useAuthContext';

const ProfileForm = () => {
  const { dispatch } = useProfilesContext();
  const { user } = useAuthContext();

  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  const [meetupLocations, setMeetupLocations] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const profile = { username, phone, image, meetupLocations };

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
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Profile</h3>

      <label>Username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        className={emptyFields.includes('username') ? 'error' : ''}
      />

      <label>Phone:</label>
      <input
        type="number"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        className={emptyFields.includes('phone') ? 'error' : ''}
      />

      <label>Image:</label>
      <input
        type="text"
        onChange={(e) => setImage(e.target.value)}
        value={image}
        className={emptyFields.includes('image') ? 'error' : ''}
      />

      <label>Meetup Locations:</label>
      <input
        type="text"
        onChange={(e) => setMeetupLocations(e.target.value)}
        value={meetupLocations}
        className={emptyFields.includes('meetupLocations') ? 'error' : ''}
      />

      <button>Add Profile</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProfileForm;
