import { Popover } from "antd";
import Search from "antd/es/input/Search";
import React, { useState } from "react";
import styles from "./SearchInput.module.css";

interface ISearchInputProps {
  lastQueries: string[];
  query: string;
  setQuery: (query: string) => void;
}

const SearchInput: React.FC<ISearchInputProps> = ({
  lastQueries,
  query,
  setQuery,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const reversedLastQueries = [...lastQueries].reverse();

  return (
    <Popover
      content={reversedLastQueries
        ?.filter((e, ind, arr) => e.includes(query) && arr.indexOf(e) === ind)
        .map((query) => (
          <div
            key={query}
            className={styles.query__container}
            onClick={() => setQuery(query)}
          >
            {query}
          </div>
        ))}
      title={"Возможно вы имели ввиду:"}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Search
        placeholder="Введите название фильма или сериала"
        enterButton
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className={styles["main__search-input"]}
      />
    </Popover>
  );
};

export default SearchInput;
