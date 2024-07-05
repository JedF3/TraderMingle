import React, { useEffect, useState } from "react";
import EditReview from "./EditReview";
import { useAuthContext } from "../../hooks/useAuthContext.js";

const EditReviewBtn = ({ reviewID }) => {
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError(false);
  };

  const handleError = (state) => {
    setError(state);
  };

  const parsed = JSON.parse(localStorage.getItem("reviews"));
  //   const currentReview = parsed.find((review) => review._id == reviewID);
  const currentReview = "test";

  const returnBtn = () => {
    if (user.username === currentReview) {
      return (
        <>
          <button onClick={handleOpenModal}>Edit</button>
          {/* <EditReview
            show={showModal}
            onClose={handleCloseModal}
            reviewID={reviewID}
          /> */}
        </>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    } else {
      returnBtn();
    }
  }, [user]);
};

export default EditReviewBtn;
