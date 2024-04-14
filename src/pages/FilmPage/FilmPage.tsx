import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchFilmInfo, selectFilmInfo } from "../../store/filmInfo";

import ImageCarousel from "./components/ImageCarousel";
import UserReviews from "./components/UserReviews/UserReviews";
import ImageWithLoader from "../MainPage/components/ImageWithLoader/ImageWithLoader";
import Actors from "./components/Actors/Actors";
import SimilarFilms from "./components/SimilarFilms/SimilarFilms";

import styles from "./FilmPage.module.css";
import FilmListItem from "./components/FilmListItem/FilmListItem";
import { FILM_POSTER_WIDTH, GAP_BETWEEN_ACTORS_AND_SIMILAR } from "./constants";
import Seasons from "./components/Seasons/Seasons";

const FilmPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const filmInfo = useAppSelector(selectFilmInfo);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(fetchFilmInfo(+id));
    }
  }, [id, dispatch]);
  if (!id) {
    return (
      <Link className={styles["film-page__nav"]} to={"/"}>
        <ArrowLeftOutlined />
        <div>
          <h2>Фильм не найден</h2>
          <h2>Вернуться на главную?</h2>
        </div>
      </Link>
    );
  }
  if (!filmInfo?.filmById[+id] || filmInfo.status === "loading") {
    return <div>Loading...</div>;
  }
  if (filmInfo.error) {
    return <div>Error: {filmInfo.error}</div>;
  }

  const film = filmInfo.filmById[+id];
  const width = window.innerWidth > 0 ? window.innerWidth : screen.width;

  const filmPosterCarouselWidth = width < 800 ? width - 24 * 2 : undefined;
  const filmPosterCarouselHeight = width >= 800 ? width / 4 : undefined;
  const actorsAndFilmsLimit =
    width < 800
      ? (width - GAP_BETWEEN_ACTORS_AND_SIMILAR) / 116
      : (width - GAP_BETWEEN_ACTORS_AND_SIMILAR) / 116 / 2;
  const seriesLimit = width < 800 ? 1 : width / 216;
  return (
    <div className={styles["film-page"]}>
      <div
        className={styles["film-page__nav"]}
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer" }}
      >
        <ArrowLeftOutlined />
        <h2>Назад</h2>
      </div>
      <div className={styles["film-page__main"]}>
        <div className={styles["film-page__head"]}>
          <div className={styles["film-page__head-poster"]}>
            <ImageWithLoader
              src={film.poster.previewUrl ?? ""}
              alt={"Нет постера"}
              width={FILM_POSTER_WIDTH}
            />
          </div>

          <div className={styles["film-page__head-info"]}>
            <h1>{`${film?.name} (${film?.year})`}</h1>
            <h3 className={styles["film-page__head-subtitle"]}>{`${
              film?.alternativeName || film?.enName || ""
            } (${film?.ageRating}+)`}</h3>
            <p className={styles["film-page__head-description"]}>
              {film?.description}
            </p>
            <div className={styles["film-page__head-info"]}>
              <FilmListItem name={"Год производства"} value={film?.year} />
              <FilmListItem
                name={"Cтраны"}
                value={
                  film?.countries && film?.countries.length > 0
                    ? film?.countries.map((country) => country.name).join(", ")
                    : null
                }
              />
              <FilmListItem
                name={"Жанр"}
                value={
                  film?.genres && film?.genres.length > 0
                    ? film?.genres.map((genre) => genre.name).join(", ")
                    : null
                }
              />
              <FilmListItem name={"Слоган"} value={film?.slogan} />
              <FilmListItem name={"Режиссер"} value={undefined} />
              <h4 className={styles["film-page__head-ratings"]}>Рейтинги</h4>
              <FilmListItem name={"Кинопоиск"} value={film?.rating.kp} />
              <FilmListItem name={"IMDB"} value={film?.rating.imdb} />
            </div>
          </div>
        </div>
        {film.type === "tv-series" && (
          <Seasons movieId={+id} seriesLimit={seriesLimit} />
        )}

        <div className={styles["film-page__actors-similar"]}>
          <div className={styles["film-page__actors"]}>
            <Actors data={film.persons} limit={actorsAndFilmsLimit} />
          </div>

          <div className={styles["film-page__similar"]}>
            {film.similarMovies && (
              <SimilarFilms
                data={film.similarMovies}
                limit={actorsAndFilmsLimit}
              />
            )}
          </div>
        </div>

        <div className={styles["film-page__reviews"]}>
          <UserReviews movieId={+id} />
        </div>
        <div className={styles["film-page__poster"]}>
          <h2>Постеры</h2>
          <ImageCarousel
            movieId={+id}
            height={filmPosterCarouselHeight}
            width={filmPosterCarouselWidth}
          />
        </div>
      </div>
    </div>
  );
};

export default FilmPage;
