import { createContext, useReducer } from 'react';

export const UserProfileContext = createContext();

export const userProfileReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_PROFILE':
      return { userProfile: action.payload };
    case 'UPDATE_USER_PROFILE':
      return { userProfile: action.payload };
    default:
      return state;
  }
};

export const UserProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userProfileReducer, { userProfile: null });

  return (
    <UserProfileContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserProfileContext.Provider>
  );
};
