import useQueryConfig from '@/hooks/useQueryConfig'
import { MovieTrendings } from '@/types/Movie'
import { useEffect, useMemo, useState } from 'react'

export default function UseFilteredMovies(allMovies: MovieTrendings[]) {
  const { queryConfig } = useQueryConfig()
  const [movies, setMovies] = useState<MovieTrendings[]>([])

  useEffect(() => {
    if (!allMovies) return
    setMovies(allMovies)
  }, [allMovies])

  const filteredAndSortedMovies = useMemo(() => {
    let result = [...movies]

    if (queryConfig.filter) {
      result = result.filter((movie) => {
        if (queryConfig.filter === 'not_seen') return !movie.seen
        if (queryConfig.filter === 'seen') return movie.seen
        return true
      })
    }

    if (queryConfig.dateFrom) {
      result = result.filter((movie) => new Date(movie.releaseDate) >= new Date(queryConfig.dateFrom as string))
    }

    if (queryConfig.dateTo) {
      result = result.filter((movie) => new Date(movie.releaseDate) <= new Date(queryConfig.dateTo as string))
    }

    if (queryConfig.selectedGenres) {
      const genres = queryConfig.selectedGenres.split(',')
      result = result.filter((movie) => genres.every((genre) => movie.genres.includes(genre)))
    }

    if (queryConfig.language) {
      result = result.filter((movie) => movie.language === queryConfig.language)
    }

    if (queryConfig.userScore) {
      result = result.filter((movie) => movie.vote_average >= Number(queryConfig.userScore))
    }

    if (queryConfig.userVotes) {
      result = result.filter((movie) => (movie.vote_count as number) >= Number(queryConfig.userVotes))
    }

    if (queryConfig.runtime) {
      result = result.filter((movie) => movie.runtime >= Number(queryConfig.runtime))
    }

    if (queryConfig.sort) {
      result.sort((a, b) => {
        const getFirstLetter = (name: string) => name?.match(/[a-zA-Z]/)?.[0]?.toLowerCase() ?? ''

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
          case 'Title_A_Z':
            return getFirstLetter(a.name).localeCompare(getFirstLetter(b.name))
          case 'Title_Z_A':
            return getFirstLetter(b.name).localeCompare(getFirstLetter(a.name))

          default:
            return 0
        }
      })
    }

    return result
  }, [movies, queryConfig])

  return filteredAndSortedMovies
}
