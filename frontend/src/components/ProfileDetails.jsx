import React from 'react';
import { Image } from 'cloudinary-react';
import no_avatar from '../images/no-avatar.svg';

const ProfileDetails = ({ profile }) => {
  if (!profile) {
    return <div>Loading...</div>;
  }

  // Check to make sure that the image exists
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
        <strong>Phone Number: </strong>0{profile.phone}
      </p>
      <h4>Meetup Locations:</h4>
      <ul>
        {/* Add a conditional check for meetupLocations */}
        {profile.meetupLocations && Array.isArray(profile.meetupLocations) ? (
          profile.meetupLocations.map((location, index) => (
            <li key={index}>{location}</li>
          ))
        ) : (
          <li>No meetup locations found</li>
        )}
      </ul>
    </div>
  );
};

export default ProfileDetails;
