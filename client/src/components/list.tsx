import { useState } from 'react'
import AUTHOR from '../constants/author'
import { useFetchData } from '../hooks/useFetchData'
import { AuthorFilter, AuthorsResponse } from '../types/author'
import Pagination from './pagination'
import Search from './search'
import Table from './table'

const { LIST_LIMIT } = AUTHOR

const List = ({ initialData }: { initialData: AuthorsResponse }) => {
  const { data, isError, error, isLoading, fetchData } =
    useFetchData(initialData)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  if (isError && !!error) {
    return <div className="text-base p-3 text-center">{error.message}</div>
  }

  if (!data) return <></>

  const {
    data: { authors, total },
  } = data

  const handleFetchData = (value: AuthorFilter) => {
    const params = { page, q: query, limit: LIST_LIMIT, ...value }
    fetchData(params)
  }

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
  )
}

export default List
