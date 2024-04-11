import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import styles from "./MainPage.module.css";
import {
  fetchFilmPage,
  setFilmLimit,
  setFilmPage,
} from "../../lib/films/films";
import { AppDispatch, RootState } from "../../lib/store";
import SearchInput from "./components/SearchInput/SearchInput";
import Filter from "./components/FIlter/Filter";
import { FilmBadge } from "./components/FilmBadge/FilmBadge";

const DEBOUNCE_TIME = 1000;

type FuncType<T extends unknown[]> = (...args: T) => void;
function debounce<T extends unknown[]>(
  func: FuncType<T>,
  wait: number
): FuncType<T> {
  let timeout: ReturnType<typeof setTimeout>;

  return function (this: unknown, ...args: T) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}
type ActionType = ReturnType<typeof fetchFilmPage>;
const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const films = useSelector((state: RootState) => state.films);

  // Filter parameters
  const [filterParams, setFilterParams] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  const debouncedDispatch = useCallback(
    debounce((action: ActionType) => dispatch(action), DEBOUNCE_TIME),
    [dispatch]
  );

  const hasPageBeenRendered = useRef(false);
  useEffect(() => {
    if (!searchQuery && !hasPageBeenRendered.current) {
      dispatch(
        fetchFilmPage({
          page: films.currentPage,
          limit: films.limit,
          ...filterParams,
          type: filterParams.type !== "all" ? filterParams.type : undefined,
        })
      );
    }
  }, [dispatch, films.currentPage, films.limit, filterParams, searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      debouncedDispatch(
        fetchFilmPage({
          query: searchQuery,
          page: films.currentPage,
          limit: films.limit,
        })
      );
      hasPageBeenRendered.current = true;
    } else if (hasPageBeenRendered.current) {
      debouncedDispatch(
        fetchFilmPage({
          page: films.currentPage,
          limit: films.limit,
          ...filterParams,
          type: filterParams.type !== "all" ? filterParams.type : undefined,
        })
      );
      hasPageBeenRendered.current = true;
    }
  }, [
    debouncedDispatch,
    films.currentPage,
    films.limit,
    filterParams,
    searchQuery,
  ]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    dispatch(setFilmPage(page));
    dispatch(setFilmLimit(pageSize));
  };

  return (
    <main className={styles.main}>
      <div className={styles.main__search}>
        <h1>Kinopoisk Demo</h1>
        <SearchInput
          lastQueries={films.lastQueries}
          query={searchQuery}
          setQuery={setSearchQuery}
        ></SearchInput>
      </div>

      <div className={styles.main__filter}>
        <Filter current={filterParams} setCurrent={setFilterParams}></Filter>
      </div>

      <ul className={styles.main__cards}>
        {films.status === "loading" &&
          Array(films.limit).fill(
            <div className={styles["main__cards-skeleton"]}></div>
          )}
        {films.status === "failed" && (
          <h4 style={{ margin: "auto" }}>Error: Failed to load films</h4>
        )}
        {!(films.status === "loading") &&
          films.data &&
          films.data.map((item) => (
            <Link to={`/film/${item.id}`} key={item.id}>
              <FilmBadge
                data={item}
                width={250}
                height={(1000 / 667) * 250}
              ></FilmBadge>
            </Link>
          ))}
      </ul>
      <div className={styles.main__pagination}>
        {films.status !== "loading" && films.data && (
          <Pagination
            total={films.totalPages}
            onChange={handlePaginationChange}
            defaultCurrent={films.currentPage}
            className={styles.main__pagination}
          ></Pagination>
        )}
      </div>
    </main>
  );
};

export default MainPage;
