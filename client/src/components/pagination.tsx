import { Dispatch, SetStateAction } from "react";
import { AuthorFilter } from "../types/author";

type Props = {
  totalPage: number;
  handleFetchData: (value: AuthorFilter) => void;
  setPage: Dispatch<SetStateAction<number>>;
};

const Pagination = ({ totalPage, handleFetchData, setPage }: Props) => {
  return (
    <div className="flex gap-x-2">
      {Array.from(Array(totalPage).keys()).map((page) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          key={page}
          className="py-1 px-2 border border-solid border-gray-300 cursor-pointer"
          onClick={() => {
            setPage(page + 1);
            handleFetchData({ page: page + 1 });
          }}
        >
          {page + 1}
        </a>
      ))}
    </div>
  );
};

export default Pagination;
