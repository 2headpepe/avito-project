import { Button, Menu } from "antd";
import React, { useEffect } from "react";
import styles from "./Filter.module.css";
import { useSelector } from "react-redux";
import {
  fetchCountryList,
  selectCountriesList,
} from "../../../../store/countriesList";
import { useAppDispatch } from "../../../../store/store";
import { TFilmType } from "../../types";
import { ageLimitItems, getCountryListItems, getYearsItems } from "./helpers";

interface IFilterProps {
  current: Record<string, string | number>;
  setFilterParams: (type: TFilmType, key?: string) => void;
}

const Filter: React.FC<IFilterProps> = ({ current, setFilterParams }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCountryList());
  }, []);

  const { data, status, error } = useSelector(selectCountriesList);

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.filter}>
      <div className={styles.filter__type}>
        <Button
          onClick={() => setFilterParams("all")}
          type={!current.type || current.type === "all" ? "primary" : "default"}
        >
          Все
        </Button>
        <Button
          onClick={() => setFilterParams("movie")}
          type={current.type === "movie" ? "primary" : "default"}
        >
          Фильмы
        </Button>
        <Button
          onClick={() => setFilterParams("tv-series")}
          type={current.type === "tv-series" ? "primary" : "default"}
        >
          Сериалы
        </Button>
      </div>
      <div>
        <Menu
          selectedKeys={[current.years?.toString()]}
          onClick={(e) => setFilterParams("year", e.key)}
          mode="inline"
          items={getYearsItems()}
          className={styles.menu}
        />
        <Menu
          selectedKeys={[current.countries?.toString()]}
          onClick={(e) => setFilterParams("country", e.key)}
          mode="inline"
          items={getCountryListItems(data)}
          className={styles.menu}
        />
        <Menu
          selectedKeys={[current.ageRating?.toString()]}
          onClick={(e) => setFilterParams("ageRating", e.key)}
          mode="inline"
          items={ageLimitItems}
          className={styles.menu}
        />
      </div>
    </div>
  );
};

export default Filter;
