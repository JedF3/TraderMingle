import axios from "axios";
import { useState, useReducer, Fragment } from "react";
import { useAuthContext } from "../../hooks/useAuthContext.js";
import styles from "./reviews.module.css";
import { initialState, reviewsReducer } from "../../reducers/reviewsReducer.js";

const EditReview = ({ show, onClose }) => {
  const { user } = useAuthContext();
  const [state, dispatch] = useReducer(reviewsReducer, initialState);

  //   const parsed = JSON.parse(localStorage.getItem("reviews"));
  //   const currentReview = parsed.find((review) => {
  //     return review._id == { reviewID };
  //   });

  const [rating, setRating] = useState("currentReview.rating");
  const [comment, setComment] = useState("currentReview.comment");
  const [imageFile, setImageFile] = useState("currentReview.image.path");
  const [preview, setPreview] = useState("currentReview.image.path");

  const handlePreview = (e) => {
    setImageFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editReview = await axios.patch(
      `http://localhost:4000/api/v1/reviews/${"currentReview._id"}`,
      { rating: rating, comment: comment, "review-image": imageFile },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );

    console.log(editReview);

    // dispatch({ type: "UPDATE_REVIEW", payload: editReview.data.data });
  };

  const stars = [0, 0, 0, 0, 0]
    .map((_, i) => {
      if (i + 1 == rating) {
        return (
          <Fragment key={i}>
            <input
              key={`star${i + 1}`}
              type="radio"
              id={`star${i + 1}`}
              name="rating"
              value={i + 1}
              defaultChecked
            />
            <label htmlFor={`star${i + 1}`} key={`label${i + 1}`}>
              &#9733;
            </label>
          </Fragment>
        );
      } else {
        return (
          <Fragment key={i}>
            <input
              key={`star${i + 1}`}
              type="radio"
              id={`star${i + 1}`}
              name="rating"
              value={i + 1}
            />
            <label htmlFor={`star${i + 1}`} key={`label${i + 1}`}>
              &#9733;
            </label>
          </Fragment>
        );
      }
    })
    .reverse();

  // Modal window controller
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <form className={styles.feedbackForm} onSubmit={(e) => handleSubmit(e)}>
        <h2>Edit your review</h2>

        <h4>Rate the seller</h4>
        <div
          className={styles.rating}
          onChange={(e) => {
            setRating(e.target.value);
          }}
          defaultValue={rating}
        >
          {stars}
        </div>
        <label>Any feedback?</label>
        <div className={styles.comment}>
          <textarea
            id="comment"
            defaultValue={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <input
          type="file"
          id="fileUpload"
          className={styles.fileInput}
          onChange={(e) => handlePreview(e)}
        />
        <label htmlFor="fileUpload">
          <img src={preview} alt="preview" className={styles.previewIMG} />
        </label>

        <div className={styles.buttonDiv}>
          <button className={styles.submitBtn} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReview;
