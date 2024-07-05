import { useContext, useState } from "react";
import MyContext from "../MyContext";
import axios from "axios";

const useLogin = () => {
  const { user, setIsLoggedIn, setUser } = useContext(MyContext);
  const [error, setError] = useState("");

  const handleLogin = async (e, userCredentials) => {
    try {
      e.preventDefault();

      const login = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        {
          email: userCredentials.email,
          password: userCredentials.password,
        }
      );
      localStorage.setItem("user", JSON.stringify(login.data));
      console.log(login.data)
      setIsLoggedIn(true);
      setUser(login.data);
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  return [error, handleLogin];
};

export default useLogin;
