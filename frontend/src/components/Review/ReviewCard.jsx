import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./reviews.module.css";
import MyContext from "../../MyContext";

const ReviewCard = ({ reviewData, inListing }) => {
  const { user, current, setCurrent } = useContext(MyContext);
  const [showModal, setShowModal] = useState(false);
  const { reviewID, userID, listing, rating, comment, updatedAt, imageUrl } =
    reviewData;

  const parsed = JSON.parse(localStorage.getItem("usernames")) || [];
  const userObj = parsed.find((item) => item.userID === userID);
  const username = userObj ? userObj.username : userID.username;

  const isYours = username === user.username;

  const handleOpenModal = () => {
    setShowModal(true);
    setCurrent(reviewData);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrent({});
  };

  // How many days ago the review was posted.
  const daysAgo = (date) => {
    const parsedDate = new Date(date);
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const ms = currentDate - parsedDate;

    // Convert milliseconds to days
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    if (days >= 30) {
      const months = Math.floor(days / 30);
      return `${months} month${months !== 1 ? "s" : ""} ago`;
    } else if (days >= 365) {
      const years = Math.floor(days / 365);
      return `${years} year${years !== 1 ? "s" : ""} ago`;
    } else {
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  };

  const listingIMG = listing.image[0].path;

  const stars = [0, 0, 0, 0, 0].map((_, i) => {
    if (i <= rating - 1)
      return <Fragment key={`star${i + 1}`}>&#9733;</Fragment>;
  });

  return (
    <div className={styles.cardInListing}>
      <div className={styles.flexGrow}>
        <div className={styles.cardHeader}>
          <div className={styles.headerText}>
            <span className={styles.star}>{stars}</span>
            by <span>{username}</span> <small>{daysAgo(updatedAt)}</small>
          </div>
          {isYours && (
            <>
              <Link
                to="/edit-review"
                onClick={handleOpenModal}
                className={styles.rightBtn}
              >
                Edit
              </Link>
            </>
          )}
        </div>

        <div>
          <p>{comment}</p>
        </div>

        <div>
          {!inListing && (
            <Link
              to={`../viewListing/${listing._id}`}
              className={styles.listingPrev}
            >
              <img
                src={listingIMG}
                alt="listingImg"
                className={styles.listingIMG}
              />
              <div>
                <h4>{listing.title}</h4>
                <span>PHP {listing.price}</span>
              </div>
            </Link>
          )}
        </div>
      </div>
      <div>
        {imageUrl && (
          <img src={imageUrl} alt="review image" className={styles.reviewIMG} />
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
