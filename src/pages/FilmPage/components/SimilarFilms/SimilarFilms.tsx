import { Pagination } from "antd";
import styles from "./SimilarFilms.module.css";
import React from "react";
import { Link } from "react-router-dom";
import { SIMILAR_FILMS_WIDTH } from "./constants";

type TSimilarFilms = {
  limit: number;
  data: {
    id: number;
    name: string;
    enName: string;
    alternativeName: string;
    type: string;
    poster: {
      url: string;
      previewUrl: string;
    };
    rating: {
      kp: number | null;
      imdb: number | null;
      filmCritics: number | null;
      russianFilmCritics: number | null;
      await: number | null;
    };
    year: number;
  }[];
};
const SimilarFilms: React.FC<TSimilarFilms> = ({ data, limit }) => {
  const [page, setPage] = React.useState(1);
  const totalPages = Math.ceil(data.length / limit) * 10;

  const display = data.length > 0;
  return (
    <div className={styles["film-page__similar-films-container"]}>
      <div className={styles["film-page__similar-films-header"]}>
        <h2>Похожие фильмы</h2>

        {display && (
          <Pagination
            simple
            defaultCurrent={page}
            onChange={(page) => setPage(page)}
            total={totalPages}
          />
        )}
      </div>
      <ul className={styles["film-page__similar-films-scroll"]}>
        {!display && <h4>Нет информации</h4>}
        {display &&
          data.slice((page - 1) * limit, page * limit).map((film) => (
            <Link
              key={film.id}
              style={{ width: SIMILAR_FILMS_WIDTH }}
              to={`/film/${film.id}`}
            >
              <img
                src={film.poster.previewUrl}
                alt={film.name}
                width={SIMILAR_FILMS_WIDTH}
              />
              <li>{film.name}</li>
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default SimilarFilms;
