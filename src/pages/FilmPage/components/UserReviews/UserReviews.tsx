import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserReviews.module.css";
import { Card, Pagination } from "antd";
import { AppDispatch, RootState } from "../../../../lib/store";
import {
  fetchUserReviews,
  setUserReviewsMovieId,
  setUserReviewsPage,
} from "../../../../lib/userReviews/userReviews";

const UserReviews = ({ movieId }: { movieId: number }) => {
  const userReviews = useSelector((state: RootState) => state.userReviews);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setUserReviewsMovieId(movieId));
    if (movieId) {
      dispatch(
        fetchUserReviews({
          page: userReviews.currentPage,
          limit: userReviews.limit,
          movieId: movieId,
        })
      );
    }
  }, [dispatch, movieId, userReviews.currentPage, userReviews.limit]);

  const mapReviewTypeToClassName = (type: string) => {
    if (type === "Позитивный") {
      return styles.positive;
    } else if (type === "Негативный") {
      return styles.negative;
    }
    return styles.neutral;
  };

  const handlePaginationChange = (page: number) => {
    dispatch(setUserReviewsPage(page));
  };

  if (!userReviews.data) return <div>Loading...</div>;
  return (
    <div className={styles.review}>
      <div className={styles.review__pagination}>
        <h2>Отзывы пользователей:</h2>

        <Pagination
          simple
          defaultCurrent={userReviews.currentPage}
          onChange={handlePaginationChange}
          total={userReviews.totalPages}
          className={styles.main__pagination}
          showSizeChanger={false}
        ></Pagination>
      </div>

      {userReviews.data.map((review) => (
        <Card
          key={review.id}
          className={`${styles["review-card"]} ${mapReviewTypeToClassName(
            review.type
          )}
          }`}
          title={review.author}
        >
          <div className={styles["review-card__body"]}>
            <b>
              {review.title &&
                review.title[0].toLocaleUpperCase() + review.title.slice(1)}
            </b>
            <p>{review.review}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default UserReviews;
