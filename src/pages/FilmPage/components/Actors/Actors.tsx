import { Pagination } from "antd";
import styles from "./Actors.module.css";
import React from "react";
import { ACTOR_WIDTH } from "./constants";

type TActors = {
  limit: number;
  data: {
    id: number;
    photo: string;
    name: string;
    enName: string;
    description: string;
  }[];
};

const Actors: React.FC<TActors> = ({ data, limit }) => {
  const [page, setPage] = React.useState(1);
  const totalPages = Math.ceil(data.length / limit) * 10;
  const display = data.length > 0;
  return (
    <div className={styles["film-page__actors-container"]}>
      <div className={styles["film-page__actors-header"]}>
        <h2>Актеры</h2>

        {display && (
          <Pagination
            simple
            defaultCurrent={page}
            onChange={(page) => setPage(page)}
            total={totalPages}
          />
        )}
      </div>
      <ul className={styles["film-page__actors-scroll"]}>
        {!display && <h4>Нет информации</h4>}
        {display &&
          data.slice((page - 1) * limit, page * limit).map((actor) => (
            <div key={actor.id} style={{ width: ACTOR_WIDTH }}>
              <img src={actor.photo} alt={actor.name} width={ACTOR_WIDTH} />
              <li>{actor.name}</li>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default Actors;
