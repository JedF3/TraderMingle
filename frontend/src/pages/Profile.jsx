import React, { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useProfilesContext } from '../hooks/useProfilesContext';

// components
import ProfileDetails from '../components/ProfileDetails';
import ProfileTabs from '../components/ProfileTabs';

const Profile = () => {
  const { profiles, dispatch } = useProfilesContext();
  const { user } = useAuthContext();

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

  return (
    <div className="profile">
      <div className="details">
        {profiles &&
          profiles.map((profile) => (
            <ProfileDetails key={profile._id} profile={profile} />
          ))}
      </div>
      <ProfileTabs />
    </div>
  );
};

export default Profile;

// references for creating profile page + settings:
// useContext: https://www.youtube.com/watch?v=NKsVV7wJcDM&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=11
// useReducer: https://vimeo.com/938650951/9c03f94370