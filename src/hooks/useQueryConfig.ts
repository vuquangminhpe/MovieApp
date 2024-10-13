import { useNavigate, useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import useQueryParams from './useQueryParams'
import { MovieConfig } from '@/types/Movie'

export type QueryConfig = {
  [key in keyof MovieConfig]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const navigate = useNavigate()
  const location = useLocation()

  const queryConfig = useMemo(() => {
    return omitBy(
      {
        sort: queryParams.sort,
        filter: queryParams.filter,
        dateFrom: queryParams.dateFrom,
        dateTo: queryParams.dateTo,
        selectedGenres: queryParams.selectedGenres,
        language: queryParams.language,
        userScore: queryParams.userScore,
        userVotes: queryParams.userVotes,
        runtime: queryParams.runtime
      },
      isUndefined
    ) as QueryConfig
  }, [queryParams])

  const setQueryParams = (updates: Partial<QueryConfig>) => {
    const newQueryConfig = { ...queryConfig, ...updates }
    const searchParams = new URLSearchParams()

    Object.entries(newQueryConfig).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value)
      }
    })

    navigate({
      pathname: location.pathname,
      search: searchParams.toString()
    })
  }

  return {
    queryConfig,
    setQueryParams
  }
}
