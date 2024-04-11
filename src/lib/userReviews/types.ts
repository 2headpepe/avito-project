interface IReview {
  id: number;
  movieId: number;
  title: string;
  type: string;
  review: string;
  date: string;
  author: string;
  userRating: number;
  authorId: number;
}
export interface IState {
  data: IReview[];
  currentPage: number;
  totalPages: number;
  status: string;
  error: string | null;
  limit: number;
  movieId: null;
}

export interface IUserReviewResponse {
  docs: IReview[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
