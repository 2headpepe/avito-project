import userReviewsSlice from "./userReviewsSlice";
import {
  setUserReviewsPage,
  setUserReviewsMovieId,
  setUserReviewsLimit,
} from "./userReviewsSlice";

export { fetchUserReviews } from "./userReviewsActions";
export { setUserReviewsPage, setUserReviewsMovieId, setUserReviewsLimit };
export default userReviewsSlice.reducer;
