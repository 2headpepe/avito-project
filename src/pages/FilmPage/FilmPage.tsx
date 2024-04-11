import { fetchFilmInfo } from "../../lib/filmInfo/filmInfo";

import { AppDispatch, RootState } from "../../lib/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ImageCarousel from "./components/ImageCarousel";

import UserReviews from "./components/UserReviews/UserReviews";
import { IListItemProps } from "./types";
import { ArrowLeftOutlined } from "@ant-design/icons";
import ImageWithLoader from "../MainPage/components/ImageWithLoader/ImageWithLoader";
import Actors from "./components/Actors/Actors";
import SimilarFilms from "./components/SimilarFilms/SimilarFilms";

import styles from "./FilmPage.module.css";

const ListItem: React.FC<IListItemProps> = ({
  name,
  value,
  valueClassName = "list__info",
  nameClassName = "",
  icon,
}) => {
  return (
    <div className={styles["list-item"]}>
      <div className={`${styles.list__name} ${styles[nameClassName]}`}>
        {name ? name + ":" : ""}
      </div>
      <div className={styles[valueClassName]}>{value ?? "Нет информации"}</div>
      <div className={styles.list__icon}>{icon}</div>
    </div>
  );
};

const FilmPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const filmInfo = useSelector((state: RootState) => state.filmInfo);

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

  return (
    <div className={styles["film-page"]}>
      <Link className={styles["film-page__nav"]} to={"/"}>
        <ArrowLeftOutlined />
        <h2>Вернуться на главную</h2>
      </Link>
      <div className={styles["film-page__main"]}>
        <div className={styles["film-page__head"]}>
          <ImageWithLoader
            src={film.poster.previewUrl ?? ""}
            alt={"Нет постера"}
            width={300}
          />
          <div className={styles["film-page__head-info"]}>
            <h1>{`${film?.name} (${film?.year})`}</h1>
            <h3 className={styles["film-page__head-subtitle"]}>{`${
              film?.alternativeName || film?.enName || ""
            } (${film?.ageRating}+)`}</h3>
            <p className={styles["film-page__head-description"]}>
              {film?.description}
            </p>
            <div className={styles["film-page__head-info"]}>
              <ListItem name={"Год производства"} value={film?.year} />
              <ListItem
                name={"Cтраны"}
                value={
                  film?.countries && film?.countries.length > 0
                    ? film?.countries.map((country) => country.name).join(", ")
                    : null
                }
              />
              <ListItem
                name={"Жанр"}
                value={
                  film?.genres && film?.genres.length > 0
                    ? film?.genres.map((genre) => genre.name).join(", ")
                    : null
                }
              />
              <ListItem name={"Слоган"} value={film?.slogan} />
              <ListItem name={"Режиссер"} value={undefined} />
              <h4 className={styles["film-page__head-ratings"]}>Рейтинги</h4>
              <ListItem name={"Кинопоиск"} value={film?.rating.kp} />
              <ListItem name={"IMDB"} value={film?.rating.imdb} />
            </div>
          </div>
        </div>

        <div className={styles["film-page__actors-similar"]}>
          <div className={styles["film-page__actors"]}>
            <Actors data={film.persons} width={width / 2}></Actors>
          </div>

          <div className={styles["film-page__similar"]}>
            <SimilarFilms
              data={film.similarMovies}
              width={width / 2}
            ></SimilarFilms>
          </div>
        </div>
        <div className={styles["film-page__actors"]}></div>

        <div className={styles["film-page__reviews"]}>
          <UserReviews movieId={+id}></UserReviews>
        </div>
        <div className={styles["film-page__poster"]}>
          <h2>Постеры</h2>
          <ImageCarousel movieId={+id} height={500}></ImageCarousel>
        </div>
      </div>
    </div>
  );
};

export default FilmPage;
