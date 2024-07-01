import React, { useEffect } from 'react';
import { useProfilesContext } from '../hooks/useProfilesContext';
import { useAuthContext } from '../hooks/useAuthContext';
import ProfileForm from '../components/ProfileForm';

const Settings = () => {
  const { dispatch } = useProfilesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('/api/v1/profiles', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok && json.length > 0) {
        dispatch({ type: 'SET_PROFILE', payload: json[0] });
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [dispatch, user]);

  return (
    <div className="settings">
      <ProfileForm />
    </div>
  );
};

export default Settings;

// references for creating profile page + settings:
// useContext: https://www.youtube.com/watch?v=NKsVV7wJcDM&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=11
// useReducer: https://vimeo.com/938650951/9c03f94370
