import Review from "../models/review.model.js";
import mongoose from "mongoose";

// get all reviews by user_id
const getReviewsByUser = async (req, res) => {
  const { user_id } = req.body;

  const reviews = await Review.find({ user_id }).sort({ createdAt: -1 });

  if (!reviews) {
    return res.status(404).json({ error: "No reviews found" });
  }

  res.status(200).json(reviews);
};

// get all reviews by listing_id
const getReviewsByListing = async (req, res) => {
  const { listing_id } = req.body;

  const reviews = await Review.find({ listing_id }).sort({ createdAt: -1 });

  if (!reviews) {
    return res.status(404).json({ error: "No reviews found" });
  }

  res.status(200).json(reviews);
};

// get a single review
const getReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }

  const review = await Review.findById(id);

  if (!review) {
    return res.status(404).json({ error: "No such review" });
  }

  res.status(200).json(review);
};

// create new workout
const createReview = async (req, res) => {
  const { rating, content } = req.body;

  if (!rating) {
    return res.status(400).json({ error: "Please leave a rating" });
  }

  // add document to db
  try {
    const user_id = req.user._id;
    const review = await Review.create({ rating, content });
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a review
const deleteReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }

  // uses mongoose-delete's delete()
  const review = await Review.delete({ _id: id });

  if (!review) {
    return res.status(400).json({ error: "No such review" });
  }

  res.status(200).json(review);
};

// update a review
const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }

  const review = await Review.findOneAndUpdate(
    { _id: id },
    { rating, content }
  );

  if (!review) {
    return res.status(400).json({ error: "No such review" });
  }

  res.status(200).json(review);
};

export {
  getReviewsByUser,
  getReviewsByListing,
  getReview,
  createReview,
  deleteReview,
  updateReview,
};
