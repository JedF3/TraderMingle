import { useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import ReviewCard from "./ReviewCard.jsx";
import { initialState, reviewsReducer } from "../../reducers/reviewsReducer.js";
import MyContext from "../../MyContext.js";

const ReviewsByListing = ({ listingID }) => {
  const { user, reload } = useContext(MyContext);
  const [state, dispatch] = useReducer(reviewsReducer, initialState);

  useEffect(() => {
    const fetchReviewsByListing = async () => {
      if (listingID) {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/v1/reviews//by-listing/${listingID}`
          );

          localStorage.setItem("reviews", JSON.stringify(response.data.data));

          dispatch({ type: "LIST_REVIEW", payload: response.data.data });
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      }
    };
    fetchReviewsByListing();
  }, [state.reviews.length, reload]);

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
    return (
      <ReviewCard key={review._id} reviewData={reviewData} inListing={true} />
    );
  });

  useEffect(() => {
    async () => {
      if (user) {
        const {
          data: { data },
        } = await axios.get(
          `http://localhost:4000/api/v1/reviews/by-user-listings/${user.id}`
        );
        console.log("GET successful");
        console.log(data);

        localStorage.setItem("reviews", JSON.stringify(data));

        dispatch({ type: "REVIEWS_LIST", payload: data });
      }
    };
  }, [state.reviews.length, user, reload]);

  return <div>{reviewsList}</div>;
};

export default ReviewsByListing;
