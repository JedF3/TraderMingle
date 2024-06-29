// controller functions
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, username, image, phone, meetupLocations } = req.body;

  try {
    const user = await User.signup(
      email,
      password,
      username,
      image,
      phone,
      meetupLocations
    );

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a user
const updateUser = async (req, res) => {
  const { _id } = req.params;
  const { email, password, username, image, phone, meetupLocations } = req.body;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (username) user.username = username;
    if (image) user.image = image;
    if (phone) user.phone = phone;
    if (meetupLocations) user.meetupLocations = meetupLocations;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { signupUser, loginUser, updateUser };
