import axios from "axios";
import { useState, useReducer, useContext, Fragment } from "react";
import styles from "./reviews.module.css";
import { initialState, reviewsReducer } from "../../reducers/reviewsReducer.js";
import MyContext from "../../MyContext.js";

const CreateReview = ({ listingID, show, onClose, error, setError }) => {
  const { user } = useContext(MyContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("/img/addImg.png");
  const [state, dispatch] = useReducer(reviewsReducer, initialState);
  const { setReload } = useContext(MyContext);

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

    if (!rating) {
      setError(true);
      return console.error("Please at least enter a star rating.");
    }

    const data = new FormData();
    data.append("userID", user.id);
    data.append("listingID", listingID);
    data.append("rating", rating);
    data.append("comment", comment);
    data.append("review-image", imageFile);

    const newReview = await axios.post(
      "http://localhost:4000/api/v1/reviews/",
      data,
      { headers: { Authorization: `Bearer ${user.token}` } }
    );

    setError(false);
    setReload(true);
    onClose();

    dispatch({ type: "CREATE_REVIEW", payload: newReview.data.data });

    console.log(state);
  };

  // Modal window controller
  if (!show) {
    return null;
  }

  const stars = [0, 0, 0, 0, 0]
    .map((_, i) => {
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
    })
    .reverse();

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <form className={styles.feedbackForm} onSubmit={(e) => handleSubmit(e)}>
        <h2>How was your experience?</h2>

        <h4>Rate the seller</h4>
        <div
          className={styles.rating}
          onChange={(e) => {
            setRating(e.target.value);
          }}
        >
          {stars}
        </div>
        <label>Any feedback?</label>
        <div className={styles.comment}>
          <textarea id="comment" onChange={(e) => setComment(e.target.value)} />
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

        <div className={error ? styles.error : styles.noError}>
          Please at least enter a star rating.
        </div>
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

export default CreateReview;
