import { Dispatch, SetStateAction } from 'react'
import ReactPaginate from 'react-paginate'
import AUTHOR from '../constants/author'
import ChevronLeftIcon from '../icons/chevron-left'
import { AuthorFilter } from '../types/author'

const { LIST_LIMIT } = AUTHOR

type Props = {
  page: number
  total: number
  isLoading: boolean
  handleFetchData: (value: AuthorFilter) => void
  setPage: Dispatch<SetStateAction<number>>
}

const Pagination = ({
  page,
  isLoading,
  total,
  handleFetchData,
  setPage,
}: Props) => {
  const numOfPages = Math.ceil(total / LIST_LIMIT)
  const pageClassName =
    'text-xs border border-solid rounded lg:text-base border-gray-200 w-9 h-9 hover:bg-gray-100'
  const pageLinkClassName = 'flex w-full h-full items-center justify-center'
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <ChevronLeftIcon className="rotate-180 fill-gray-600 text-sm" />
        }
        onPageChange={({ selected }) => {
          setPage(selected + 1)
          handleFetchData({ page: selected + 1 })
        }}
        pageCount={numOfPages}
        previousLabel={<ChevronLeftIcon className="fill-gray-600 text-sm" />}
        renderOnZeroPageCount={null}
        containerClassName="flex gap-x-1 items-center lg:gap-x-2"
        pageClassName={pageClassName}
        pageLinkClassName={pageLinkClassName}
        activeClassName="!border-sky-500 bg-sky-500 text-white cursor-not-allowed pointer-events-none"
        previousClassName={pageClassName}
        previousLinkClassName={pageLinkClassName}
        nextClassName={pageClassName}
        nextLinkClassName={pageLinkClassName}
        disabledClassName="opacity-40 cursor-not-allowed pointer-events-none"
        disableInitialCallback={isLoading}
        forcePage={page - 1}
      />
    </>
  )
}

export default Pagination
