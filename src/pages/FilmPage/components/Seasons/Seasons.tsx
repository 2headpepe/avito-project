import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { fetchSeasonsPage, selectAllSeasons } from "../../../../store/seasons";
import { Empty, Menu } from "antd";

import styles from "./Seasons.module.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { SEASON_WIDTH } from "./constants";

type TSeasonsProps = {
  movieId: number;
  seriesLimit: number;
  seasonsLimit?: number;
};
const Seasons: React.FC<TSeasonsProps> = ({
  movieId,
  seriesLimit,
  seasonsLimit = 10,
}) => {
  const dispatch = useAppDispatch();
  const seasonsInfo = useAppSelector(selectAllSeasons);
  const [season, setSeason] = React.useState<string | null>();
  const currentSeason = seasonsInfo.seasonsByMovieId[movieId]?.data.find(
    (e) => e.name === season
  );
  const [seriesPage, setSeriesPage] = React.useState(1);
  const totalSeriesPages = Math.ceil(
    (currentSeason?.episodes.length ?? 0) / seriesLimit
  );

  useEffect(() => {
    dispatch(
      fetchSeasonsPage({
        movieId,
        page: seasonsInfo.seasonsByMovieId[movieId]?.currentPage ?? 1,
        limit: seasonsLimit,
      })
    );
  }, [seasonsInfo.seasonsByMovieId[movieId]?.currentPage, movieId]);

  const reversedSeasons = [
    ...(seasonsInfo.seasonsByMovieId[movieId]?.data ?? []),
  ].reverse();

  useEffect(() => {
    if (!season && reversedSeasons.length > 0) {
      setSeason(reversedSeasons[0].name);
    }
  }, [reversedSeasons]);

  if (!seasonsInfo.seasonsByMovieId[movieId]) return null;
  const display = seasonsInfo.seasonsByMovieId[movieId].data.length > 0;
  if (!display) {
    return <h4>Нет информации</h4>;
  }
  const handleSeasonChange = (seasonKey: string) => {
    setSeason(seasonKey);
    setSeriesPage(1);
  };
  const seasonsTabs = reversedSeasons.map((season) => ({
    label: season.name,
    key: season.name,
  }));
  if (!currentSeason) return null;
  return (
    <div className={styles["film-page__seasons-container"]}>
      <div className={styles["film-page__seasons-header"]}>
        <Menu
          onClick={(e) => handleSeasonChange(e.key)}
          defaultSelectedKeys={[season ?? seasonsTabs[0].key]}
          mode="horizontal"
          items={seasonsTabs}
          className={styles.menu}
        />
      </div>
      <ul className={styles["film-page__seasons-scroll"]}>
        {seriesPage > 1 && (
          <LeftOutlined
            onClick={() => setSeriesPage((current) => current - 1)}
          />
        )}
        {!display && <h4>Нет информации</h4>}
        {display &&
          currentSeason?.episodes
            .slice((seriesPage - 1) * seriesLimit, seriesPage * seriesLimit)
            .map((episode) => (
              <div key={episode.name} style={{ width: SEASON_WIDTH }}>
                {episode.still?.url ? (
                  <img
                    src={episode.still?.url}
                    alt={episode.name}
                    width={SEASON_WIDTH}
                  />
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={"Нет фото"}
                  />
                )}
                <li>
                  {episode.number}. {episode.name}
                </li>
              </div>
            ))}
        {seriesPage < totalSeriesPages && (
          <RightOutlined
            onClick={() => setSeriesPage((current) => current + 1)}
          />
        )}
      </ul>
    </div>
  );
};

export default Seasons;
