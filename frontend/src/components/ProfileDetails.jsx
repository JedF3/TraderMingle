import { useUserProfileContext } from '../hooks/useUserProfileContext';
import { useAuthContext } from '../hooks/useAuthContext';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

// components
import no_avatar from '../images/pain.jpg';

const ProfileDetails = ({ profile }) => {
  const { dispatch } = useUserProfileContext();
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
      <h2>
        {profile.firstname} {profile.lastname}
      </h2>
      <p>@{profile.username}</p>
      <p>
        <strong>Phone Number: </strong>0{profile.phone}
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
