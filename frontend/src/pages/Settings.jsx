import React, { useEffect } from 'react';
import { useUserProfileContext } from '../hooks/useUserProfileContext';
import { useAuthContext } from '../hooks/useAuthContext';
import ProfileForm from '../components/ProfileForm';

const Settings = () => {
  const { dispatch } = useUserProfileContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!user || !user.id) {
          throw new Error('User or user ID is undefined');
        }

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
    <div className="settings">
      <ProfileForm />
    </div>
  );
};

export default Settings;
