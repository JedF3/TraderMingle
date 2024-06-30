import { useProfilesContext } from '../hooks/useProfilesContext';
import { useAuthContext } from '../hooks/useAuthContext';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

// components
import no_avatar from '../images/no-avatar.svg';

const ProfileDetails = ({ profile }) => {
  const { dispatch } = useProfilesContext();
  const { user } = useAuthContext();

  // delete button
  // const handleClick = async () => {
  //   if (!user) {
  //     return;
  //   }

  //   const response = await fetch('/api/v1/profiles/' + profile._id, {
  //     method: 'DELETE',
  //     headers: {
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   });
  //   const json = await response.json();

  //   if (response.ok) {
  //     dispatch({ type: 'DELETE_PROFILE', payload: json });
  //   }
  // };

  return (
    <>
      <img src={no_avatar} alt="" />
      <h2>Pain</h2>
      <p>@{profile.username}</p>
      <p>
        <strong>Phone Number: </strong>
        {profile.phone}
      </p>
      <p>
        <strong>Image: </strong>
        {profile.image}
      </p>
      <h4>Meet up locations:</h4>
      <ul>
        <li> {profile.meetupLocations}</li>
      </ul>
      <p>
        {formatDistanceToNow(new Date(profile.createdAt), { addSuffix: true })}
      </p>
      {/* <span className="material-symbols-outlined" onClick={handleClick}>
        ❌
      </span> */}
    </>
  );
};

export default ProfileDetails;
