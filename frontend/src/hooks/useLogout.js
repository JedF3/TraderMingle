import { useAuthContext } from './useAuthContext';
import { useUserProfileContext } from './useUserProfileContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useUserProfileContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    localStorage.clear();

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: "SET_PROFILES", payload: null });
  };

  return { logout };
};
