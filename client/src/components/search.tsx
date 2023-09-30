import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { AuthorFilter } from "../types/author";

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  handleFetchData: (value: AuthorFilter) => void;
};

const Search = ({ query, setQuery, handleFetchData }: Props) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { value, setValue, debouncedValue } = useDebouncedValue<string>(query);

  useEffect(() => {
    if (!isFirstLoad) {
      setIsFirstLoad(false);
      setQuery(debouncedValue);
      handleFetchData({ q: debouncedValue });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
        value={value}
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
