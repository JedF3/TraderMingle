import { asyncHandler } from "../middleware/errorHandler.js";
import Review from "../models/review.model.js";
import mongoose from "mongoose";

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

  const listingsByID = await listings.find({ userID });

  if (!listingsByID) {
    res.status(404).json({ message: "User has no listings", error });
  } else {
    const reviews = await Review.find({ listingID: listingsByID._id })
      .sort({ _id: -1 })
      .populate({
        path: "userID",
        select: "username",
      });
    if (!reviews) {
      res
        .status(404)
        .json({ message: "Listings of user have no reviews", error });
    } else {
      res.status(200).send({
        message: `List of reviews for listings of user retrieved.`,
        data: reviews,
      });
    }
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
      message: `List of reviews by user : ${userID} retrieved.`,
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

const deleteReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }

  // uses mongoose-delete's delete()
  const review = await Review.delete({ _id: id });

  res.status(200).json(review);
};

// // update a review
// const updateReview = async (req, res) => {
//   const { id } = req.params;
//   const { rating, comment } = req.body;
//   const { path, filename } = req.file;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "No such review" });
//   }

//   const review = await Review.findOneAndUpdate(
//     { _id: id },
//     { rating, comment, image: { path, filename } }
//   );

//   if (!review) {
//     return res.status(400).json({ error: "No such review" });
//   }

//   res.status(200).json(review);
// };

export {
  createReview,
  getReviewsByUser,
  getAllReviewsOfUserByListing,
  getReviewsByListing,
  getReviewByID,
  deleteReview,
  // updateReview,
};
