import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({ message: 'All users', data: users });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// get a single profile
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such profile' });
  }

  const profile = await User.findById(id);

  if (!profile) {
    return res.status(404).json({ error: 'No such profile' });
  }

  res.status(200).json(profile);
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const id = user._id;

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ id, email, username: user.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, username, firstname, lastname, phone } = req.body;

  try {
    const user = await User.signup(
      email,
      password,
      username,
      firstname,
      lastname,
      phone
    );
    const id = user._id;

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ id, email, username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a user's profile
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' });
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true } // return the updated document
    );

    if (!user) {
      return res.status(400).json({ error: 'No such user' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { signupUser, loginUser, updateUser, getAllUsers, getUser };
