import { IListItemProps } from "../../types";
import styles from "./FilmListItem.module.css";

const FilmListItem: React.FC<IListItemProps> = ({ name, value }) => {
  return (
    <div className={styles["list-item"]}>
      <div className={`${styles.list__name}`}>{name ? name + ":" : ""}</div>
      <div>{value ?? "Нет информации"}</div>
    </div>
  );
};

export default FilmListItem;
