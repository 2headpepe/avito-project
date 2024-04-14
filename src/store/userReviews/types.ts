export type TReview = {
  id: number;
  movieId: number;
  title: string;
  type: string;
  review: string;
  date: string;
  author: string;
  userRating: number;
  authorId: number;
};
export type TState = {
  data: TReview[];
  currentPage: number;
  totalPages: number;
  status: string;
  error: string | null;
  limit: number;
  movieId: number | null;
};
export type TFetchUserReviewsProps = {
  page: number;
  limit: number;
  movieId: number;
};
