import { Pagination } from "antd";
import styles from "./SimilarFilms.module.css";
import React from "react";
import { Link } from "react-router-dom";

interface ISimilarFilms {
  width: number;
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
}
const SimilarFilms: React.FC<ISimilarFilms> = ({ data, width }) => {
  const [page, setPage] = React.useState(1);
  const limit = Math.floor(width / 116);
  return (
    <div className={styles["film-page__similar-films-container"]}>
      <div className={styles["film-page__similar-films-header"]}>
        <h2>Похожие фильмы:</h2>

        <Pagination
          simple
          defaultCurrent={page}
          onChange={(page) => setPage(page)}
          total={Math.ceil(data.length / limit) * 10}
        />
      </div>
      <ul className={styles["film-page__similar-films-scroll"]}>
        {data.slice((page - 1) * limit, page * limit).map((film) => (
          <Link key={film.id} style={{ width: 100 }} to={`/film/${film.id}`}>
            <img src={film.poster.previewUrl} alt={film.name} width={100} />
            <li>{film.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SimilarFilms;
