/* eslint-disable react-hooks/exhaustive-deps */
import { AccountApi } from '@/Apis/AccountApi'
import useQueryConfig from '@/hooks/useQueryConfig'
import { AccountRating } from '@/types/Account.type'
import { MovieTrendings } from '@/types/Movie'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export default function UseFilteredMovies(allMovies: MovieTrendings[]) {
  const { queryConfig } = useQueryConfig()
  const { data: dataRated } = useQuery({ queryKey: ['dataRated_filter'], queryFn: AccountApi.getRatedMoviesAccount })
  const { data: dataFavorite } = useQuery({
    queryKey: ['dataFavorite_filter'],
    queryFn: AccountApi.getFavorite
  })
  const { data: dataWatchList } = useQuery({ queryKey: ['dataWatchList_filter'], queryFn: AccountApi.getWatchList })

  const dataRated_filters = dataRated?.data.results
  const dataFavorites = dataFavorite?.data.results
  const dataWatchLists = dataWatchList?.data.results

  let combinedData = [] as AccountRating[]
  if (dataRated_filters && dataFavorites && dataWatchLists) {
    combinedData = dataRated_filters.concat(dataFavorites, dataWatchLists)
  }

  const removeID = (array_1: AccountRating[], array_2: AccountRating[]) => {
    const idSet = new Set(array_2.map((item: AccountRating) => item.id))
    const result = array_1.filter((item: AccountRating) => {
      return !idSet.has(item.id)
    })
    return result
  }

  const filteredAndSortedMovies = useMemo(() => {
    let result = [...allMovies]

    if (queryConfig.filter) {
      if (queryConfig.filter === 'Everything') {
        //
      } else if (queryConfig.filter === 'not_seen') {
        result = removeID(result, combinedData)
      } else if (queryConfig.filter === 'seen') {
        result = combinedData
      }
    }

    if (queryConfig.dateFrom) {
      result = result.filter(
        (movie) => new Date(movie.release_date as string) >= new Date(queryConfig.dateFrom as string)
      )
    }

    if (queryConfig.dateTo) {
      result = result.filter(
        (movie) => new Date(movie.release_date as string) <= new Date(queryConfig.dateTo as string)
      )
    }

    if (queryConfig.selectedGenres) {
      const genres = queryConfig.selectedGenres.split(',')
      result = result.filter((movie) =>
        genres.every((genre) =>
          movie.genre_ids?.some((item_genre) => {
            console.log(item_genre)
            return item_genre === Number(genre)
          })
        )
      )
    }

    if (queryConfig.language) {
      result = result.filter((movie) => movie.original_language === queryConfig.language)
    }

    if (queryConfig.userScore) {
      result = result.filter((movie) => movie.vote_average >= Number(queryConfig.userScore) / 10)
    }

    if (queryConfig.userVotes) {
      result = result.filter((movie) => (movie.vote_count as number) >= Number(queryConfig.userVotes))
    }

    if (queryConfig.sort) {
      result.sort((a, b) => {
        switch (queryConfig.sort) {
          case 'popularity.desc':
            return (b.popularity as number) - (a.popularity as number)
          case 'popularity.asc':
            return (a.popularity as number) - (b.popularity as number)
          case 'vote_average.desc':
            return b.vote_average - a.vote_average
          case 'vote_average.asc':
            return a.vote_average - b.vote_average
          case 'release_date.desc':
            return new Date(b.release_date as string).getTime() - new Date(a.release_date as string).getTime()
          case 'release_date.asc':
            return new Date(a.release_date as string).getTime() - new Date(b.release_date as string).getTime()
          default:
            return 0
        }
      })
    }

    return result
  }, [allMovies, queryConfig, combinedData])

  return filteredAndSortedMovies
}
