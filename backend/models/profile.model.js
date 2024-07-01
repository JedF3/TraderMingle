import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    meetupLocations: {
      type: String,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
