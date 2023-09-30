import { useState } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { AuthorFilter, AuthorsResponse } from "../types/author";
import Pagination from "./pagination";
import AUTHOR from "../constants/author";
import Search from "./search";
import Table from "./table";

const { LIST_LIMIT } = AUTHOR;

const List = ({ initialData }: { initialData: AuthorsResponse }) => {
  const { data, isLoading, fetchData } = useFetchData(initialData);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(LIST_LIMIT);
  const [query, setQuery] = useState("");

  if (!data) return <></>;

  const {
    data: { authors, total },
  } = data;

  const handleFetchData = (value: AuthorFilter) => {
    const params = { page, q: query, limit, ...value };
    fetchData(params);
  };

  return (
    <>
      <Search
        handleFetchData={handleFetchData}
        setQuery={setQuery}
        setPage={setPage}
        query={query}
        isLoading={isLoading}
      />
      <Table authors={authors} isLoading={isLoading} />
      <div className="mt-6 flex justify-end">
        <Pagination
          page={page}
          isLoading={isLoading}
          total={total}
          handleFetchData={handleFetchData}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default List;
