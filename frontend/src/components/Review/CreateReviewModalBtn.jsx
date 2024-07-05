import React, { useState } from "react";
import CreateReview from "./CreateReview";

const CreateReviewModalBtn = ({ listingID }) => {
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

  return (
    <>
      <button onClick={handleOpenModal}>Create Review</button>
      <CreateReview
        show={showModal}
        onClose={handleCloseModal}
        error={error}
        setError={handleError}
        listingID={listingID}
      />
    </>
  );
};

export default CreateReviewModalBtn;
