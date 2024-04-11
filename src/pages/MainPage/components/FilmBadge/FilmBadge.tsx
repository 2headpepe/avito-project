import { IFilm } from "../../../../lib/films/types";
import ImageWithLoader from "../ImageWithLoader/ImageWithLoader";
import styles from "./FilmBadge.module.css";

interface FilmBadgeProps {
  data: IFilm;
  width: number;
  height?: number;
}

export const FilmBadge: React.FC<FilmBadgeProps> = ({
  data,
  width,
  height,
}) => {
  if (!data.poster.previewUrl && data.name) return null;

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
