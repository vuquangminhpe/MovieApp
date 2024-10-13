import useQueryConfig from '@/hooks/useQueryConfig'
import { MovieTrendings } from '@/types/Movie'
import { useMemo } from 'react'

export default function UseFilteredMovies(allMovies: MovieTrendings[]) {
  const { queryConfig } = useQueryConfig()

  const filteredAndSortedMovies = useMemo(() => {
    let result = [...allMovies]

    if (queryConfig.filter) {
      result = result.filter((movie) => {
        if (queryConfig.filter === 'not_seen') return !movie.seen
        if (queryConfig.filter === 'seen') return movie.seen
        return true
      })
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
      result = result.filter((movie) => genres.every((genre) => movie.genres.includes(genre)))
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
  }, [queryConfig])

  return filteredAndSortedMovies
}
