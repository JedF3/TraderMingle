import React, { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useUserProfileContext } from '../hooks/useUserProfileContext';

// components
import ProfileDetails from '../components/ProfileDetails';
import ProfileTabs from '../components/ProfileTabs';

const Profile = () => {
  const { userProfile, dispatch } = useUserProfileContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user || !user.id) {
        console.error('User or user ID is undefined');
        return;
      }

      try {
        const response = await fetch(`/api/v1/user/profile/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const json = await response.json();
        dispatch({ type: 'SET_USER_PROFILE', payload: json });
      } catch (error) {
        console.error('Error fetching profile:', error.message);
      }
    };

    fetchUserProfile();
  }, [dispatch, user]);

  return (
    <div className="profile">
      <div className="details">
        {userProfile ? (
          <ProfileDetails profile={userProfile} />
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
      <ProfileTabs />
    </div>
  );
};

export default Profile;
