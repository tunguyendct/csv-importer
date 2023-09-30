import { useState } from "react";
import CONSTANTS from "../constants";
import AUTHOR from "../constants/author";
import { AuthorFilter, AuthorsResponse } from "../types/author";

const { ADMIN_URL } = CONSTANTS;
const { LIST_LIMIT } = AUTHOR;

export function useFetchData(initialData: AuthorsResponse | null) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = (params?: AuthorFilter) => {
    setIsLoading(true);
    if (!params) params = {};
    if (!params?.limit) {
      params.limit = LIST_LIMIT;
    }

    const query =
      "?" + new URLSearchParams(params as Record<string, string>).toString();

    fetch(`${ADMIN_URL}/api/search${query}`)
      .then(async (resp) => {
        if (!resp.ok) {
          const res = await resp.json();
          console.log(res);
          setIsLoading(false);
        } else {
          const authors = await resp.json();
          setData(authors);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  return {
    data,
    isLoading,
    fetchData,
  };
}
