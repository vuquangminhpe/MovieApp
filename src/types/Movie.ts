export interface Movie {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
  backdrop?: string
  genre_ids?: []
  id?: number
  original_language?: string
  original_title?: string
  overview?: string
  popularity?: number
  poster_path?: string
  release_date?: string
  title?: string
  video?: false
  vote_average?: number
  vote_count?: number
}

export interface MovieTrendings {
  backdrop_path?: string
  id?: number
  name?: string
  original_name?: string
  original_title?: string
  overview?: string
  poster_path?: string
  media_type?: string
  adult?: boolean
  original_language?: string
  genre_ids?: number[]
  popularity?: number
  first_air_date?: string
  vote_average: number
  vote_count?: number
  origin_country?: string[]
}

export interface videosDetails {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}
