import axios from "axios";
import { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { initialState, reviewsReducer } from "../../reducers/reviewsReducer";
import MyContext from "../../MyContext";
import styles from "./reviews.module.css";

const DeleteReview = ({ show, onClose }) => {
  const { user, current, reload, setReload } = useContext(MyContext);
  const [state, dispatch] = useReducer(reviewsReducer, initialState);
  const navigate = useNavigate();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!show) {
    return null;
  }

  // handles the DELETE request to the API
  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const deleteReview = await axios.delete(
        `https://trader-mingle-jqkjj3174-jedidiah-franciscos-projects.vercel.app/api/v1/reviews/${current.reviewID}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      dispatch({ type: "DELETE_REVIEW", payload: current.reviewID });
      setReload(!reload);
      onClose();
      navigate(-1);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.deleteWindow}>
        <h2>Are you sure you want to delete this review?</h2>
        <div className={styles.buttonDiv}>
          <button
            type="button"
            className={styles.submitBtn}
            onClick={() => onClose()}
          >
            No
          </button>
          <button
            type="button"
            className={styles.submitBtn}
            onClick={(e) => handleDelete(e)}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReview;
