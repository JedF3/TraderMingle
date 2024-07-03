import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import ReviewCard from "./ReviewCard.jsx";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { initialState, reviewsReducer } from "../../reducers/reviewsReducer.js";

const ReviewsByUser = () => {
  const { user } = useAuthContext();
  const [state, dispatch] = useReducer(reviewsReducer, initialState);

  const reviewsList = state.reviews.map((review) => {
    const imageUrl = review.image ? review.image.path : null;
    return (
      <ReviewCard
        key={review._id}
        creator={review.userID.username}
        listing={review.listingID}
        rating={review.rating}
        comment={review.comment}
        imageUrl={imageUrl}
      />
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

export default ReviewsByUser;
