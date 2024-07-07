import mongoose from "mongoose";
import Review from "../models/review.model.js";
import listings from "../models/listing.model.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { cloudinary } from "../config/reviewStorage.js";

const createReview = asyncHandler(async (req, res) => {
  const { userID, listingID, rating, comment } = req.body;

  const alreadyExists = await Review.find({ userID, listingID });

  if (alreadyExists == []) {
    return res
      .status(400)
      .json({ message: "User has already made a review for listing" });
  }

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
      select: "username image",
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
      select: "username image",
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
      select: "username image",
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

// update a review
const updateReview = asyncHandler(async (req, res) => {
  const { reviewID } = req.params;
  const { rating, comment } = req.body;

  const alreadyExists = await Review.findById(reviewID);
  if (!alreadyExists) {
    res.status(404).json("The review does not exist.");
    throw new Error("The review does not exist");
  }

  try {
    if (req.file) {
      const { path, filename } = req.file;

      const { result } = await cloudinary.uploader.destroy(
        `grp_proj_listings/${alreadyExists.image.filename}`
      );
      console.log(result);

      const review = await Review.findOneAndUpdate(
        { _id: reviewID },
        { rating, comment, image: { path, filename } },
        { new: true }
      );

      res.status(200).send({
        message: "Review has been updated.",
        data: review,
      });
    } else {
      const review = await Review.findOneAndUpdate(
        { _id: reviewID },
        { rating, comment },
        { new: true }
      );
      res.status(200).send({
        message: "Review has been updated.",
        data: review,
      });
    }
  } catch {
    res.status(500);
    throw new Error("Something went wrong while updating the review.");
  }
});

const deleteReview = asyncHandler(async (req, res) => {
  const { reviewID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewID)) {
    return res.status(404).json({ error: "No such review" });
  }
  try {
    // uses mongoose-delete's delete()
    const review = await Review.delete({ _id: reviewID });

    res.status(204).send();
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong while deleting the review.");
  }
});

const deleteReviewWithImage = asyncHandler(async (req, res) => {
  const { reviewID, imageFilename } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewID)) {
    return res.status(404).json({ error: "No such review" });
  }
  try {
    // uses mongoose-delete's delete()
    const review = await Review.delete({ _id: reviewID });
    // delete image from cloudinary
    const { result } = await cloudinary.uploader.destroy(
      `grp_proj_listings/${imageFilename}`
    );
    console.log(result);
    res.status(204).send(result);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong while deleting the review.");
  }
});

export {
  createReview,
  getReviewsByUser,
  getAllReviewsOfUserByListing,
  getReviewsByListing,
  getReviewByID,
  updateReview,
  deleteReview,
  deleteReviewWithImage,
};
