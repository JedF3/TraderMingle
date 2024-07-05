import { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./reviews.module.css";
// import EditReviewBtn from "./EditReviewBtn";

const ReviewCard = ({
  reviewID,
  creator,
  listing,
  rating,
  comment,
  imageUrl,
  inListing,
}) => {
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
      <span className={styles.star}>{stars}</span>
      by <span>{creator}</span> <small>{daysAgo(listing.updatedAt)}</small>
      {imageUrl && (
        <img src={imageUrl} alt="review image" className={styles.reviewIMG} />
      )}
      <p>{comment}</p>
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
      {/* <EditReviewBtn reviewID={reviewID} /> */}
    </div>
  );
};

export default ReviewCard;
