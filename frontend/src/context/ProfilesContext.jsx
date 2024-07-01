import { createContext, useReducer } from 'react';
// example: dispatch({ type: 'SET_PROFILES', payload: [{}, {}] });
export const ProfilesContext = createContext();

export const profilesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return { profile: action.payload };
    case 'CREATE_PROFILE':
    case 'UPDATE_PROFILE':
      return { profile: action.payload };
    default:
      return state;
  }
};

export const ProfilesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profilesReducer, { profile: null });

  return (
    // we use the useReducer to supply a dynamic value to the "value" property of "ProfilesContext.Provider"
    // value={{ state, dispatch } means we are making available the "state" and "dispatch" functions for all components wrapped by ProfilesContext.Provider
    <ProfilesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProfilesContext.Provider>
  );
};
