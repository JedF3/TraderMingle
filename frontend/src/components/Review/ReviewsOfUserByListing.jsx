import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import ReviewCard from "./ReviewCard.jsx";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { initialState, reviewsReducer } from "../../reducers/reviewsReducer.js";

const ReviewsOfUserByListing = () => {
  const { user } = useAuthContext();
  const [state, dispatch] = useReducer(reviewsReducer, initialState);

  useEffect(() => {
    const fetchReviewsOfUserByListing = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/v1/reviews/by-user-listings/${user.id}`
          );

          localStorage.setItem("reviews", JSON.stringify(response.data.data));

          dispatch({ type: "LIST_REVIEW", payload: response.data.data });
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      }
    };
    fetchReviewsOfUserByListing();
  }, [user]);

  const reviewsList = state.reviews.map((review) => {
    const imageUrl = review.image ? review.image.path : null;
    return (
      <ReviewCard
        key={review._id}
        creator={review.userID.username}
        listing={review.listingID}
        rating={review.rating}
        comment={review.comment}
        date={review.updatedAt}
        imageUrl={imageUrl}
      />
    );
  });

  return <div>{reviewsList}</div>;
};

export default ReviewsOfUserByListing;
