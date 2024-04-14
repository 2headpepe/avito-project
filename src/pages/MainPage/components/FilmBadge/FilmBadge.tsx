import { TFilm } from "../../../../store/films";
import ImageWithLoader from "../ImageWithLoader/ImageWithLoader";
import styles from "./FilmBadge.module.css";

type TFilmBadgeProps = {
  data: TFilm;
  width: number;
  height?: number;
};

export const FilmBadge: React.FC<TFilmBadgeProps> = ({
  data,
  width,
  height,
}) => {
  return (
    <div className={styles.film__badge}>
      <div className={styles.image}>
        <ImageWithLoader
          src={data.poster.previewUrl || ""}
          alt={data.name || "Нет информации о фильме"}
          width={width}
          height={height}
          hover={
            <div className={styles.overlay}>
              <h3>{data.name}</h3>
              <p>{data.shortDescription}</p>
            </div>
          }
        />
      </div>
    </div>
  );
};
