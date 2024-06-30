import React, { createContext, useReducer } from 'react';

export const ProfilesContext = createContext();

export const profilesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROFILES':
      return {
        profiles: action.payload,
      };
    case 'CREATE_PROFILE':
      return {
        profiles: [action.payload, ...state.profiles],
      };
    case 'DELETE_PROFILE':
      return {
        profiles: state.profiles.filter(
          (profile) => profile._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const ProfilesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profilesReducer, {
    profiles: null,
  });

  return (
    <ProfilesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProfilesContext.Provider>
  );
};
