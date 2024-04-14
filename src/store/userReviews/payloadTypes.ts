import { TReview } from "./types";

export interface IUserReviewResponse {
  docs: TReview[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
