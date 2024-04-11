import { Pagination } from "antd";
import styles from "./Actors.module.css";
import React from "react";
interface IActors {
  width: number;
  data: {
    id: number;
    photo: string;
    name: string;
    enName: string;
    description: string;
  }[];
}
const Actors: React.FC<IActors> = ({ width, data }) => {
  const [page, setPage] = React.useState(1);
  const limit = Math.floor(width / 116);

  return (
    <div className={styles["film-page__actors-container"]}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Актеры:</h2>

        <Pagination
          simple
          defaultCurrent={page}
          onChange={(page) => setPage(page)}
          total={Math.ceil(data.length / limit) * 10}
        />
      </div>
      <ul className={styles["film-page__actors-scroll"]}>
        {data.slice((page - 1) * limit, page * limit).map((actor) => (
          <div key={actor.id} style={{ width: 100 }}>
            <img src={actor.photo} alt={actor.name} width={100} />
            <li>{actor.name}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Actors;
