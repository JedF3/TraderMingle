import mongoose from "mongoose";
import { asyncHandler } from "../middleware/errorHandler.js";
import Review from "../models/review.model.js";
import listings from "../models/listing.model.js";

const createReview = asyncHandler(async (req, res) => {
  const { userID, listingID, rating, comment } = req.body;

  let path, filename;
  if (req.file) {
    ({ path, filename } = req.file);
  } else {
    path = "";
    filename = "";
  }

  try {
    const newReview = new Review({
      userID,
      listingID,
      rating,
      comment,
      image: { path, filename },
    });
    await newReview.save();

    res.status(201).send({
      message: "New review created.",
      data: newReview,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

const getReviewsByUser = asyncHandler(async (req, res) => {
  const { userID } = req.params;

  const reviews = await Review.find({ userID })
    .populate({
      path: "userID",
      select: "username",
    })
    .populate({ path: "listingID" });

  if (!reviews) {
    res.status(404).json({ message: "No reviews found", error });
  } else {
    res.status(200).send({
      message: `List of reviews by user retrieved.`,
      data: reviews,
    });
  }
});

const getAllReviewsOfUserByListing = asyncHandler(async (req, res) => {
  const { userID } = req.params;

  try {
    const listingsByID = await listings.find({ userID });

    if (!listingsByID.length) {
      return res.status(404).json({ message: "User has no listings" });
    }

    const listingIDs = listingsByID.map((listing) => listing._id);

    const reviews = await Review.find({ listingID: { $in: listingIDs } })
      .sort({ _id: -1 })
      .populate("listingID");
    // .populate("userID")

    if (!reviews.length) {
      return res
        .status(404)
        .json({ message: "Listings of user have no reviews" });
    }

    res.status(200).json({
      message: "List of reviews for listings of user retrieved.",
      data: reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const getReviewsByListing = asyncHandler(async (req, res) => {
  const { listingID } = req.params;

  const reviews = await Review.find({ listingID })
    .sort({ _id: -1 })
    .populate({
      path: "userID",
      select: "username",
    })
    .populate({ path: "listingID" });

  if (!reviews) {
    res.status(404).json({ message: "No reviews found", error });
  } else {
    res.status(200).send({
      message: `List of reviews for listing: ${listingID} retrieved.`,
      data: reviews,
    });
  }
});

const getReviewByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await Review.find({ id })
    .sort({ _id: -1 })
    .populate({
      path: "userID",
      select: "username",
    })
    .populate({ path: "listingID" });

  if (!review) {
    res.status(404).json({ message: "Review does not exist", error });
  } else {
    res.status(200).send({
      message: `Review retrieved`,
      data: review,
    });
  }
});

const deleteReview = asyncHandler(async (req, res) => {
  const { userID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(404).json({ error: "No such review" });
  }

  // uses mongoose-delete's delete()
  const review = await Review.delete({ _id: userID });

  res.status(200).json(review);
});

// update a review
const updateReview = asyncHandler(async (req, res) => {
  const { reviewID } = req.params;
  const { rating, comment } = req.body;

  let path, filename;
  if (req.file) {
    ({ path, filename } = req.file);
  } else {
    path = "";
    filename = "";
  }

  const isExist = await Review.findById(reviewID);
  console.log(isExist);
  if (!isExist) {
    res.status(404);
    throw new Error("The review does not exist.");
  }

  try {
    const review = await Review.findOneAndUpdate(
      { _id: reviewID },
      { rating, comment, image: { path, filename } },
      { new: true }
    );

    res.status(200).send({
      message: "Review has been updated.",
      data: review,
    });
  } catch {
    res.status(500);
    throw new Error("Something went wrong while updating the review.");
  }
});

export {
  createReview,
  getReviewsByUser,
  getAllReviewsOfUserByListing,
  getReviewsByListing,
  getReviewByID,
  deleteReview,
  updateReview,
};
