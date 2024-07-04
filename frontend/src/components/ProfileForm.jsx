import React, { useState, useEffect } from 'react';
import { useUserProfileContext } from '../hooks/useUserProfileContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Image } from 'cloudinary-react';
import Axios from 'axios';

const ProfileForm = () => {
  const { userProfile, dispatch } = useUserProfileContext();
  const { user } = useAuthContext();

  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const [meetupLocations, setMeetupLocations] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username || '');
      setFirstname(userProfile.firstname || '');
      setLastname(userProfile.lastname || '');
      setPhone(userProfile.phone || '');
      setMeetupLocations(userProfile.meetupLocations || '');

      // Check if userProfile.image is an array and has at least one item
      if (userProfile.image && userProfile.image.length > 0) {
        setImage({
          url: userProfile.image[0].path,
          filename: userProfile.image[0].filename,
        });
      } else {
        setImage(null); // Set image to null if userProfile.image is empty
      }
    }
  }, [userProfile]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!image) {
      setError('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'alxmsvj9'); // uploud preset can be found inside settings of cloudinary. create an "unsigned" mode and paste it here. purpose: so that uploading to personal cloudinary is publicly accessible

    try {
      const response = await Axios.post(
        'https://api.cloudinary.com/v1_1/dexuiicai/image/upload',
        formData
      );
      setImage({
        url: response.data.url,
        filename: response.data.public_id,
      });
    } catch (error) {
      setError('Failed to upload image.');
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const updatedProfile = {
      username,
      firstname,
      lastname,
      phone,
      image: image ? [{ path: image.url, filename: image.filename }] : [],
      meetupLocations,
    };

    const url = `/api/v1/user/profile/${user.id}`;

    try {
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
    } catch (error) {
      setError('Failed to update profile.');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Profile</h3>

      <div className="upload-image-container">
        <div className="img-details">
          <label>Profile photo</label>
          {image && <Image cloudName="dexuiicai" publicId={image.url} />}
        </div>
        <div className="desc-details">
          <p>
            Clear frontal face photos are an important way for buyers and
            sellers to learn about each other.
          </p>
          <input type="file" onChange={handleFileChange} className="upload" />
          <button type="button" onClick={uploadImage}>
            Upload a photo
          </button>
        </div>
      </div>

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
