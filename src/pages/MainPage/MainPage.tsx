import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import styles from "./MainPage.module.css";
import {
  fetchFilmsPage,
  selectAllFilms,
  setFilmLimit,
  setFilmPage,
} from "../../store/films";
import { useAppDispatch, useAppSelector } from "../../store/store";
import SearchInput from "./components/SearchInput/SearchInput";
import Filter from "./components/FIlter/Filter";
import { FilmBadge } from "./components/FilmBadge/FilmBadge";
import {
  DEBOUNCE_TIME,
  FILM_BADGE_HEIGHT,
  FILM_BADGE_WIDTH,
} from "./constants";
import { debounce } from "./helpers";
import { ActionType, TFilmType } from "./types";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { data, lastQueries, currentPage, totalPages, limit, status, error } =
    useAppSelector(selectAllFilms);

  // Filter parameters

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const storedSearchQuery = queryParams.get("query") || "";

  const queryPage = +(queryParams.get("page") || 1);
  const queryLimit = +(queryParams.get("limit") || 10);
  const storedFilterParams: Record<string, string | number> = {
    queryPage,
    queryLimit,
  };
  queryParams.forEach((value, key) => {
    if (key !== "query") {
      storedFilterParams[key] = value;
    }
  });

  useEffect(() => {
    dispatch(setFilmPage(queryPage));
    dispatch(setFilmLimit(queryLimit));
  }, []);

  const [filterParams, setFilterParams] =
    useState<Record<string, string | number>>(storedFilterParams);
  const [searchQuery, setSearchQuery] = useState<string>(storedSearchQuery);

  const debouncedDispatch = useCallback(
    debounce((action: ActionType) => dispatch(action), DEBOUNCE_TIME),
    [dispatch]
  );

  const hasPageBeenRendered = useRef(false);
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filterParams).forEach(([key, value]) => {
      params.append(key, value.toString());
    });
    if (searchQuery) params.append("query", searchQuery);

    console.log(params.toString());

    if (!searchQuery && !hasPageBeenRendered.current) {
      dispatch(
        fetchFilmsPage({
          page: currentPage,
          limit: limit,
          ...filterParams,
          type:
            filterParams.type !== "all"
              ? filterParams.type?.toString()
              : undefined,
        })
      );
    }
    if (searchQuery) {
      debouncedDispatch(
        fetchFilmsPage({
          query: searchQuery,
          page: currentPage,
          limit: limit,
        })
      );
      hasPageBeenRendered.current = true;
    } else if (hasPageBeenRendered.current) {
      debouncedDispatch(
        fetchFilmsPage({
          page: currentPage,
          limit: limit,
          ...filterParams,
          type:
            filterParams.type !== "all"
              ? filterParams.type.toString()
              : undefined,
        })
      );
      hasPageBeenRendered.current = true;
    }
    navigate({ search: params.toString() });
  }, [currentPage, limit, filterParams, searchQuery]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    dispatch(setFilmPage(page));
    dispatch(setFilmLimit(pageSize));
    setFilterParams((filterParams) => ({
      ...filterParams,
      queryPage: page,
      queryLimit: pageSize,
    }));
  };
  const handleFilterParamsChange = (type: TFilmType, key?: string) => {
    dispatch(setFilmPage(1));
    if (key) {
      setFilterParams((current) => ({ ...current, [type]: key }));
    } else {
      setFilterParams((current) => ({ ...current, type }));
    }
  };

  if (error) return <div>Error</div>;
  return (
    <main className={styles.main}>
      <div className={styles.main__search}>
        <h1 className={styles.title}>Kinopoisk Demo</h1>
        <SearchInput
          lastQueries={lastQueries}
          query={searchQuery}
          setQuery={(query) => setSearchQuery(query)}
        />
      </div>

      <div className={styles.main__filter}>
        <Filter
          current={filterParams}
          setFilterParams={handleFilterParamsChange}
        ></Filter>
      </div>

      <ul className={styles.main__cards}>
        {status === "loading" &&
          Array(limit).fill(
            <div className={styles["main__cards-skeleton"]}></div>
          )}
        {status === "failed" && <h4>Error: Failed to load films</h4>}
        {!(status === "loading") &&
          data &&
          data.map((item) => {
            if (!item.poster.previewUrl && item.name) return null;

            return (
              <Link to={`/film/${item.id}`} key={item.id}>
                <FilmBadge
                  data={item}
                  width={FILM_BADGE_WIDTH}
                  height={FILM_BADGE_HEIGHT}
                />
              </Link>
            );
          })}
      </ul>
      <div className={styles.main__pagination}>
        {status !== "loading" && data && (
          <Pagination
            total={totalPages}
            onChange={handlePaginationChange}
            defaultCurrent={currentPage}
            className={styles.main__pagination}
          />
        )}
      </div>
    </main>
  );
};

export default MainPage;
