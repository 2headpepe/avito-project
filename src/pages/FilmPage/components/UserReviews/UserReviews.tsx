import { useEffect } from "react";
import styles from "./UserReviews.module.css";
import { Card, Pagination } from "antd";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../../store/store";
import {
  fetchUserReviews,
  setUserReviewsMovieId,
  setUserReviewsPage,
} from "../../../../store/userReviews";

type TUserReviews = { movieId: number };

const UserReviews: React.FC<TUserReviews> = ({ movieId }) => {
  const dispatch = useAppDispatch();
  const userReviews = useAppSelector((state: RootState) => state.userReviews);

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

  const display = userReviews.data.length > 0;
  return (
    <div className={styles.review}>
      <div className={styles.review__pagination}>
        <h2>Отзывы пользователей</h2>

        {userReviews.data.length > 0 && (
          <Pagination
            simple
            defaultCurrent={userReviews.currentPage}
            onChange={handlePaginationChange}
            total={userReviews.totalPages}
            className={styles.main__pagination}
            showSizeChanger={false}
          ></Pagination>
        )}
      </div>
      {!display && <h4>Нет информации</h4>}
      {display &&
        userReviews.data.map((review) => (
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
