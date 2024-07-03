import axios from "axios";
import { useState, useReducer } from "react";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import styles from "./reviews.module.css";
import { initialState, reviewsReducer } from "../../reducers/reviewsReducer.js";

const CreateReview = ({ listingID }) => {
  const { user } = useAuthContext();

  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [dispatch] = useReducer(reviewsReducer, initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("listingID", listingID);
    data.append("rating", rating);
    data.append("comment", comment);
    data.append("review-image", imageFile);

    const newReview = await axios.post(
      "http://localhost:4000/api/v1/reviews/",
      data,
      { headers: { Authorization: `Bearer ${user.token}` } }
    );

    dispatch({ type: "CREATE_REVIEW", payload: newReview });
  };

  return (
    <div>
      <form className={styles.feedbackForm} onSubmit={(e) => handleSubmit(e)}>
        <h2>How was your experience?</h2>

        <h4>Rate the seller</h4>
        <div
          className={styles.rating}
          onChange={(e) => {
            setRating(e.target.value);
            return console.log("rating: " + e.target.value);
          }}
        >
          <input type="radio" id="star5" name="rating" value="5" />
          <label htmlFor="star5">&#9733;</label>

          <input type="radio" id="star4" name="rating" value="4" />
          <label htmlFor="star4">&#9733;</label>

          <input type="radio" id="star3" name="rating" value="3" />
          <label htmlFor="star3">&#9733;</label>

          <input type="radio" id="star2" name="rating" value="2" />
          <label htmlFor="star2">&#9733;</label>

          <input type="radio" id="star1" name="rating" value="1" />
          <label htmlFor="star1">&#9733;</label>
        </div>
        <label>Any feedback?</label>
        <div className={styles.comment}>
          <textarea id="comment" onChange={(e) => setComment(e.target.value)} />
        </div>
        <input
          type="file"
          className={styles.fileInput}
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
