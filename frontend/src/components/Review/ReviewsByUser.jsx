import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import { initialState, reviewsReducer } from "../../reducers/reviewsReducer.js";
import MyContext from "../../MyContext.js";
import ReviewCard from "./ReviewCard.jsx";

const ReviewsByUser = () => {
  const { user } = useContext(MyContext);
  const [state, dispatch] = useReducer(reviewsReducer, initialState);

  useEffect(() => {
    const fetchReviewsByUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/reviews/by-user/${user.id}`
        );

        localStorage.setItem("reviews", JSON.stringify(response.data.data));

        dispatch({ type: "LIST_REVIEW", payload: response.data.data });
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviewsByUser();
  }, [state.reviews.length]);

  const reviewsList = state.reviews.map((review) => {
    const imageUrl = review.image ? review.image.path : null;
    const reviewData = {
      reviewID: review._id,
      userID: review.userID,
      listing: review.listingID,
      rating: review.rating,
      comment: review.comment,
      updatedAt: review.updatedAt,
      imageUrl: imageUrl,
    };
    return <ReviewCard key={review._id} reviewData={reviewData} method={2} />;
  });

  return <div>{reviewsList}</div>;
};

export default ReviewsByUser;
