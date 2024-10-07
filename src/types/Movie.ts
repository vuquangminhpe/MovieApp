/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Movie {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
  backdrop?: string
  genre_ids?: []
  id: number
  original_language?: string
  original_title: string
  overview?: string
  popularity?: number
  poster_path?: string
  release_date?: string
  title?: string
  video?: false
  vote_average?: number
  vote_count?: number
  media_type?: string
}

export interface MovieTrendings {
  [x: string]: any
  concat(dataCredits: Movie): any[]
  backdrop_path?: string
  id: number
  name: string
  original_name: string
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
  release_date?: string
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

export interface movieDetail {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  } | null
  budget: number
  genres: {
    id: number
    name: string
  }[]
  homepage: string
  id: number
  imdb_id: string
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface CastMember {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface MovieCast {
  [x: string]: any
  id: number
  cast: CastMember[]
}

export interface BackdropImages {
  aspect_ratio?: number
  height?: number
  iso_639_1?: null | string
  file_path?: string
  vote_average?: number
  vote_count?: number
  width?: number
}

export interface DetailsImages {
  backdrops: BackdropImages[]
  logos: BackdropImages[]
  posters: BackdropImages[]

  id: number
}
export interface MovieList {
  movie: Movie[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}
export interface MovieConfig {
  query?: string | number
  include_adult?: string
  language?: string
  primary_release_year?: string
  page?: number | string
  region?: string
  year?: string
  first_air_date_year?: number
  limit?: number | string
}

export interface Account_States {
  id: number
  favorite: false
  rated: {
    value: number
  }
  watchlist: false
}
