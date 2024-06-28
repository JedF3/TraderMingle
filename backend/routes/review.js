import express from "express";
import {
  getReviewsByUser,
  getReviewsByListing,
  getReview,
  createReview,
  deleteReview,
  updateReview,
} from "../controllers/review.controller.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

// GET all reviews by user
router.get("/:user_id", getReviewsByUser);

// GET all reviews by listing
router.get("/:listing_id", getReviewsByListing);

//GET a single review
router.get("/:id", getReview);

// POST a new review
router.post("/", requireAuth, createReview);

// DELETE a review
router.delete("/:id", requireAuth, deleteReview);

// UPDATE a workout
router.patch("/:id", requireAuth, updateReview);

export default router;
