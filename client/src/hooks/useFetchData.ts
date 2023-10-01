import { useState } from 'react'
import CONSTANTS from '../constants'
import AUTHOR from '../constants/author'
import { MESSAGE, STATUS } from '../constants/response'
import { AuthorFilter, AuthorsResponse } from '../types/author'
import { Error, Status } from '../types/response'

const { ADMIN_URL } = CONSTANTS
const { LIST_LIMIT } = AUTHOR

export function useFetchData(initialData: AuthorsResponse | null) {
  const [data, setData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = (params?: AuthorFilter) => {
    setIsLoading(true)
    if (!params) params = {}
    if (!params?.limit) {
      params.limit = LIST_LIMIT
    }

    const query =
      '?' + new URLSearchParams(params as Record<string, string>).toString()

    fetch(`${ADMIN_URL}/api/search${query}`)
      .then(async (resp) => {
        if (!resp.ok) {
          // Error
          const resJson = await resp.json()
          console.log(resJson)
          setIsLoading(false)
          setIsError(true)
          setError({
            status: resJson.status,
            message: resJson.message,
          })
        } else {
          // Success
          const authors = await resp.json()
          setData(authors)
          setIsError(false)
          setError(null)
          setIsLoading(false)
        }
      })
      .catch((e) => {
        // Network errors
        console.log(e)
        setIsError(true)
        setError({
          status: STATUS.ERROR as Status,
          message: MESSAGE.UNKNOWN,
        })
        setIsLoading(false)
      })
  }

  return {
    data,
    isError,
    isLoading,
    error,
    fetchData,
  }
}
