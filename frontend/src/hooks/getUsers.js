import axios from "axios";

const getUsers = async () => {
  const users = await axios.get(`http://localhost:4000/api/v1/user/profile`);

  const usernames = users.data.data.map((item) => {
    return {
      userID: item._id,
      username: item.username,
    };
  });
  localStorage.setItem("usernames", JSON.stringify(usernames));
};

export default getUsers;
