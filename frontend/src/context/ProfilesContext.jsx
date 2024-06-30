import { createContext, useReducer } from 'react';

// useContext
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
    case 'UPDATE_PROFILE':
      return {
        profiles: state.profiles.map((profile) =>
          profile._id === action.payload._id ? action.payload : profile
        ),
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

// Wrap the App component with ProfilesContextProvider (context) and then take in overhere as a prop the "children" prop (this children represents whatever the ProfilesContextProvider is wrapping in App.jsx file. in this case only the "App" component)
export const ProfilesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profilesReducer, { profiles: null }); // takes in: reducerFunctionName, initialValue (for state of useReducer)

  // example: dispatch({ type: 'SET_PROFILES', payload: [{}, {}] });

  return (
    // we use the useReducer to supply a dynamic value to the "value" property of "ProfilesContext.Provider"
    // value={{ state, dispatch } means we are making available the "state" and "dispatch" functions for all components wrapped by ProfilesContext.Provider
    <ProfilesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProfilesContext.Provider>
  );
};
