import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import useQueryParams from './useQueryParams'
import { MovieConfig } from '@/types/Movie'

export type queryConfig = {
  [key in keyof MovieConfig]: string
}

export default function useQueryConfig() {
  const queryParams: queryConfig = useQueryParams()
  const queryParamsConfig: queryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || 10,
      query: queryParams.query,
      include_adult: queryParams.include_adult,
      language: queryParams.language || 'en-US',
      primary_release_year: queryParams.primary_release_year,
      region: queryParams.region,
      year: queryParams.year,
      first_air_date_year: queryParams.first_air_date_year
    },
    isUndefined
  )
  return queryParamsConfig
}
