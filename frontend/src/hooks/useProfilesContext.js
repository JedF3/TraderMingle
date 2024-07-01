import { ProfilesContext } from '../context/ProfilesContext'; //the actual context
import { useContext } from 'react'; // we will use this to consume the context

export const useProfilesContext = () => {
  const context = useContext(ProfilesContext);

  // if check to make sure context is not returning null
  if (!context) {
    throw Error(
      'useProfilesContext must be used inside an AuthContextProvider It currently has no value'
    );
  }
  return context;
};
