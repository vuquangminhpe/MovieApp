export interface Movie {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
  backdrop: string
  genre_ids: []
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: false
  vote_average: number
  vote_count: number
}
