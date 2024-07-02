import React, { useState, useEffect } from 'react';
import { useUserProfileContext } from '../hooks/useUserProfileContext';
import { useAuthContext } from '../hooks/useAuthContext';

const ProfileForm = () => {
  const { profile, dispatch } = useUserProfileContext();
  const { user } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  const [meetupLocations, setMeetupLocations] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (profile) {
      setEmail(profile.email || '');
      setUsername(profile.username || '');
      setFirstname(profile.firstname || '');
      setLastname(profile.lastname || '');
      setPhone(profile.phone || '');
      setImage(profile.image || '');
      setMeetupLocations(profile.meetupLocations || '');
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const updatedProfile = {
      email,
      password,
      username,
      firstname,
      lastname,
      phone,
      image,
      meetupLocations,
    };

    const url = `/api/v1/user/profile/${user.id}`;

    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(updatedProfile),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      setError(null);
      dispatch({ type: 'UPDATE_PROFILE', payload: json });
    } else {
      setError(json.error);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Edit Profile</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />

      <label>Username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        required
      />

      <label>Firstname:</label>
      <input
        type="text"
        onChange={(e) => setFirstname(e.target.value)}
        value={firstname}
        required
      />

      <label>Lastname:</label>
      <input
        type="text"
        onChange={(e) => setLastname(e.target.value)}
        value={lastname}
        required
      />

      <label>Phone:</label>
      <input
        type="text"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        required
      />

      <label>Image:</label>
      <input
        type="text"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />

      <label>Meetup Locations:</label>
      <input
        type="text"
        onChange={(e) => setMeetupLocations(e.target.value)}
        value={meetupLocations}
      />

      <button type="submit">Update Profile</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProfileForm;
