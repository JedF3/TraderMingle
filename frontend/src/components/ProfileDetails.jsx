import { useProfilesContext } from '../hooks/useProfilesContext';
import { useAuthContext } from '../hooks/useAuthContext';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const ProfileDetails = ({ profile }) => {
  const { dispatch } = useProfilesContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/v1/profiles/' + profile._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_PROFILE', payload: json });
    }
  };

  // Check if profile is defined before rendering
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details">
      <h4>{profile.username}</h4>
      <p>
        <strong>Phone Number: </strong>
        {profile.phone}
      </p>
      <p>
        <strong>Image: </strong>
        {profile.image}
      </p>
      <p>
        <strong>Meetup Locations: </strong>
        {profile.meetupLocations}
      </p>
      <p>
        {formatDistanceToNow(new Date(profile.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        ❌
      </span>
    </div>
  );
};

export default ProfileDetails;
