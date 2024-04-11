import { Button, Menu, MenuProps } from "antd";
import React, { useEffect } from "react";
import styles from "./Filter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryList } from "../../../../lib/countriesList/countriesList";
import { AppDispatch, RootState } from "../../../../lib/store";
import { ICountryResponse } from "../../../../lib/countriesList/types";

const getYearsItems = (): MenuProps["items"] => {
  const currentYear = 2024;
  const children = [];
  for (let i = currentYear + 3; i > currentYear - 7; --i) {
    children.push({ label: i, key: i });
  }
  for (let i = Math.floor(currentYear / 10) * 10; i > 1880; i -= 10) {
    const period = `${i}-${i + 9}`;
    children.push({ label: period, key: period });
  }
  const result: MenuProps["items"] = [
    {
      label: "Годы",
      key: "SubMenu",
      children: children,
    },
  ];

  return result;
};
const getCountryListItems = (
  countriesList: ICountryResponse
): MenuProps["items"] => {
  const result: MenuProps["items"] = [
    {
      label: "Страны",
      key: "SubMenu",
      children: countriesList.map((country) => ({
        label: country.name,
        key: country.name,
      })),
    },
  ];
  return result;
};
const ageLimitItems: MenuProps["items"] = [
  {
    label: "Возрастной рейтинг",
    key: "SubMenu",
    children: [
      {
        label: "0+",
        key: "0",
      },
      {
        label: "6+",
        key: "6",
      },
      {
        label: "12+",
        key: "12",
      },
      {
        label: "16+",
        key: "16",
      },
      {
        label: "18+",
        key: "18",
      },
    ],
  },
];

interface IFilterProps {
  current: Record<string, string>;
  setCurrent: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const Filter: React.FC<IFilterProps> = ({ current, setCurrent }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCountryList());
  }, [dispatch]);

  const countriesList = useSelector(
    (state: RootState) => state.countriesListSlice
  );

  if (countriesList.status === "loading") return <p>Loading...</p>;
  if (countriesList.error) return <p>Error: {countriesList.error}</p>;

  const onClick = ({
    type,
    key,
  }: {
    type: "year" | "country" | "ageRating";
    key: string;
  }) => {
    setCurrent((current) => ({ ...current, [type]: key }));
  };
  const setType = (type: string) => {
    setCurrent((current) => ({ ...current, type }));
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filter__type}>
        <Button
          onClick={() => setType("all")}
          type={!current.type || current.type === "all" ? "primary" : "default"}
        >
          Все
        </Button>
        <Button
          onClick={() => setType("movie")}
          type={current.type === "movie" ? "primary" : "default"}
        >
          Фильмы
        </Button>
        <Button
          onClick={() => setType("tv-series")}
          type={current.type === "tv-series" ? "primary" : "default"}
        >
          Сериалы
        </Button>
      </div>
      <div>
        <Menu
          selectedKeys={[current.years]}
          onClick={(e) => onClick({ type: "year", key: e.key })}
          mode="inline"
          items={getYearsItems()}
          className={styles.menu}
        />
        <Menu
          selectedKeys={[current.countries]}
          onClick={(e) => onClick({ type: "country", key: e.key })}
          mode="inline"
          items={getCountryListItems(countriesList.data)}
          className={styles.menu}
        />
        <Menu
          selectedKeys={[current.ageRating]}
          onClick={(e) => onClick({ type: "ageRating", key: e.key })}
          mode="inline"
          items={ageLimitItems}
          className={styles.menu}
        />
      </div>
    </div>
  );
};

export default Filter;
