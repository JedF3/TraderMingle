import { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./reviews.module.css";

const ReviewCard = ({ creator, listing, rating, comment, imageUrl }) => {
  console.log(listing);
  const stars = Array(5)
    .fill("")
    .map((_, i) => {
      if (i <= rating - 1)
        return <Fragment key={`star${i + 1}`}>&#9733;</Fragment>;
    });

  const daysAgo = (date) => {
    const parsedDate = new Date(date);
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const ms = currentDate - parsedDate;

    // Convert milliseconds to days
    const msToDay = 1000 * 60 * 60 * 24;
    const days = Math.floor(ms / msToDay);

    // Return formatted string
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  };

  const listingIMG = listing.image[0].path;

  if (imageUrl) {
    return (
      <div className={styles.card}>
        <span className={styles.star}>{stars}</span>
        by <span>{creator}</span> <small>{daysAgo(listing.updatedAt)}</small>
        <img
          src="/img/addImg.png"
          alt="reviewIMG"
          className={styles.reviewIMG}
        />
        <p>{comment}</p>
        <Link to={`listing/${listing._id}`} className={styles.listingPrev}>
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
      </div>
    );
  } else {
    return (
      <div className={styles.card}>
        <span className={styles.star}>{stars}</span>
        by <span>{creator}</span> <small>{daysAgo(listing.updatedAt)}</small>
        <p>{comment}</p>
        <Link to={`listing/${listing._id}`} className={styles.listingPrev}>
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
      </div>
    );
  }
};

export default ReviewCard;
