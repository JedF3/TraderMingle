import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = await User.login(email, password);
    const id = user._id;

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ id, email, username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = await User.signup(email, password);
    const id = user._id;

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ id, email, username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { signupUser, loginUser };
