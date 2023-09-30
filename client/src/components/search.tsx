import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { AuthorFilter } from "../types/author";

type Props = {
  query: string;
  isLoading: boolean;
  setPage: Dispatch<SetStateAction<number>>;
  setQuery: Dispatch<SetStateAction<string>>;
  handleFetchData: (value: AuthorFilter) => void;
};

const Search = ({
  query,
  isLoading,
  setPage,
  setQuery,
  handleFetchData,
}: Props) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { value, setValue, debouncedValue } = useDebouncedValue<string>(query);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
    } else {
      setQuery(debouncedValue);
      setPage(1);
      handleFetchData({ q: debouncedValue, page: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className="my-6 max-w-md mx-auto">
      <label
        htmlFor="search-input"
        className="text-center text-lg block mb-2 font-medium"
      >
        Search
      </label>
      <input
        id="search-input"
        disabled={isLoading}
        className="border-gray-300 border-solid border w-full rounded-sm px-2 py-1.5 disabled:cursor-not-allowed"
        type="text"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
        value={value}
        placeholder="Search name, email or body of Author..."
      />
    </div>
  );
};

export default Search;
