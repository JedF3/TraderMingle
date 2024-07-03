const initialState = {
  reviews: localStorage.getItem("reviews")
    ? JSON.parse(localStorage.getItem("reviews"))
    : [],
};

const reviewsReducer = (state, action) => {
  switch (action.type) {
    case "LIST_REVIEW":
      return { reviews: action.payload };
    case "CREATE_REVIEW":
      return { reviews: [action.payload, ...state.reviews] };
    case "DELETE_REVIEW":
      return {
        reviews: state.reviews.filter(
          (review) => review._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export { initialState, reviewsReducer };
