import { useState } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { AuthorFilter, AuthorsResponse } from "../types/author";
import Pagination from "./pagination";
import AUTHOR from "../constants/author";
import Search from "./search";

const { LIST_LIMIT } = AUTHOR;

const List = ({ initialData }: { initialData: AuthorsResponse }) => {
  const { data, fetchData } = useFetchData(initialData);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  if (!data) return <></>;

  const {
    data: { authors, total },
  } = data;

  const totalPage = Math.ceil(total / LIST_LIMIT);

  const handleFetchData = (value: AuthorFilter) => {
    const params = { page, query, ...value };
    fetchData(params);
  };

  return (
    <>
      <Search
        handleFetchData={handleFetchData}
        setQuery={setQuery}
        query={query}
      />
      {authors.map((row) => (
        <div key={row.id} className="flex">
          <div>{row.id}</div>
          <div>{row.postId}</div>
          <div>{row.name}</div>
          <div>{row.email}</div>
          <div>{row.body}</div>
        </div>
      ))}
      <Pagination
        totalPage={totalPage}
        handleFetchData={handleFetchData}
        setPage={setPage}
      />
    </>
  );
};

export default List;
