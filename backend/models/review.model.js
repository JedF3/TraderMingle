import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listing_id: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required."],
    },
    content: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

reviewSchema.plugin(MongooseDelete);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
