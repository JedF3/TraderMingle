import Profile from '../models/profile.model.js';
import mongoose from 'mongoose';

// get all profiles
const getProfiles = async (req, res) => {
  const user_id = req.user._id;

  const profiles = await Profile.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(profiles);
};

// get a single profile
const getProfile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such profile' });
  }

  const profile = await Profile.findById(id);

  if (!profile) {
    return res.status(404).json({ error: 'No such profile' });
  }

  res.status(200).json(profile);
};

// create new profile
const createProfile = async (req, res) => {
  const { username, firstname, lastname, phone, image, meetupLocations } =
    req.body;

  let emptyFields = [];

  if (!username) {
    emptyFields.push('username');
  }
  if (!firstname) {
    emptyFields.push('firstname');
  }
  if (!lastname) {
    emptyFields.push('lastname');
  }
  if (!phone) {
    emptyFields.push('phone');
  }
  if (!image) {
    emptyFields.push('image');
  }
  if (!meetupLocations) {
    emptyFields.push('meetupLocations');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // add document to db
  try {
    const user_id = req.user._id;
    const profile = await Profile.create({
      username,
      firstname,
      lastname,
      phone,
      image,
      meetupLocations,
      user_id,
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a profile
const deleteProfile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such profile' });
  }

  const profile = await Profile.findOneAndDelete({ _id: id });

  if (!profile) {
    return res.status(400).json({ error: 'No such profile' });
  }

  res.status(200).json(profile);
};

// update a profile
const updateProfile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such profile' });
  }

  const profile = await Profile.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!profile) {
    return res.status(400).json({ error: 'No such profile' });
  }

  res.status(200).json(profile);
};

export { getProfiles, getProfile, createProfile, deleteProfile, updateProfile };
