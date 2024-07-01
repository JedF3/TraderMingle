import React, { useState, useEffect } from 'react';
import { useProfilesContext } from '../hooks/useProfilesContext';
import { useAuthContext } from '../hooks/useAuthContext';

const ProfileForm = () => {
  const { profile, dispatch } = useProfilesContext();
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
    if (profile) {
      setUsername(profile.username);
      setFirstname(profile.firstname);
      setLastname(profile.lastname);
      setPhone(profile.phone);
      setImage(profile.image);
      setMeetupLocations(profile.meetupLocations);
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const updatedProfile = { username, firstname, lastname, phone, image, meetupLocations };
    const method = profile ? 'PATCH' : 'POST';
    const url = profile ? `/api/v1/profiles/${profile._id}` : '/api/v1/profiles';

    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(updatedProfile),
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
      setError(null);
      setEmptyFields([]);
      dispatch({ type: profile ? 'UPDATE_PROFILE' : 'CREATE_PROFILE', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>{profile ? 'Edit Profile' : 'Add a New Profile'}</h3>

      <label>Username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        className={emptyFields.includes('username') ? 'error' : ''}
      />

      <label>Firstname:</label>
      <input
        type="text"
        onChange={(e) => setFirstname(e.target.value)}
        value={firstname}
        className={emptyFields.includes('firstname') ? 'error' : ''}
      />

      <label>Lastname:</label>
      <input
        type="text"
        onChange={(e) => setLastname(e.target.value)}
        value={lastname}
        className={emptyFields.includes('lastname') ? 'error' : ''}
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

      <button>{profile ? 'Update Profile' : 'Add Profile'}</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProfileForm;
