import React from 'react';
import { Image } from 'cloudinary-react';
import no_avatar from '../images/no-avatar.svg';

const ProfileDetails = ({ profile }) => {
  if (!profile) {
    return <div>Loading...</div>;
  }
  console.log(profile.image); // image shape

  // check to make sure that the image exists
  const imagePath =
    profile.image && profile.image.length > 0 ? profile.image[0].path : null;

  return (
    <div>
      {profile.image ? (
        <Image cloudName="dexuiicai" publicId={imagePath} className="avatar" />
      ) : (
        <img src={no_avatar} alt="" className="avatar" />
      )}

      <h2>
        {profile.firstname} {profile.lastname}
      </h2>
      <p>@{profile.username}</p>
      <p>
        <strong>Phone Number: </strong>
        0{profile.phone}
      </p>
      <h4>Meet up locations:</h4>
      <ul>
        <li>{profile.meetupLocations}</li>
      </ul>
    </div>
  );
};

export default ProfileDetails;
