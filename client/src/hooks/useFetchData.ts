import { useState } from "react";
import CONSTANTS from "../constants";
import { AuthorFilter, AuthorsResponse } from "../types/author";

const { ADMIN_URL } = CONSTANTS;

export function useFetchData(initialData: AuthorsResponse | null) {
  const [data, setData] = useState(initialData);

  const fetchData = (params?: AuthorFilter) => {
    const query = !!params && Object.keys(params).length ? '?'+new URLSearchParams(params as Record<string, string>).toString() : ''

    fetch(`${ADMIN_URL}/api/search${query}`)
      .then(async (resp) => {
        const authors = await resp.json();
        setData(authors);
      })
      .catch((e) => console.log(e));
  };

  return {
    data,
    fetchData,
  };
}
