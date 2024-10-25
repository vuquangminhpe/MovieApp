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
  crew?: CastMember[]
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
  sort?: string
  filter?: string
  dateFrom?: Date
  dateTo?: Date
  selectedGenres?: number[]
  language?: string
  userScore?: number
  userVotes?: number
  runtime?: number
}

export interface Account_States {
  id: number
  favorite: false
  rated: {
    value: number
  }
  watchlist: false
}

export interface ownerGenres {
  id: string
  name: string
}
export interface typeGenres {
  genres: ownerGenres[]
}
export type MovieInfo = {
  account_object_id: string
  adult: number
  average_rating: number
  backdrop_path: string
  created_at: string
  description: string
  featured: number
  id: number
  iso_639_1: string
  iso_3166_1: string
  name: string
  number_of_items: number
  poster_path: string | null
  public: number
  revenue: number
  runtime: string
  sort_by: number
  updated_at: string
}

export interface MovieResult {
  backdrop_path: string
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  media_type: string
  adult: boolean
  original_language: string
  genre_ids: number[]
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface CreatedBy {
  avatar_path: string | null
  gravatar_hash: string
  id: string
  name: string
  username: string
}

export interface MovieData_List {
  average_rating: number
  backdrop_path: string
  results: MovieResult[]
  comments: Record<string, any | null>
  created_by: CreatedBy
  description: string
  id: number
  iso_3166_1: string
  iso_639_1: string
  item_count: number
  name: string
  object_ids: Record<string, unknown>
  page: number
  poster_path: string | null
  public: boolean
  revenue: number
  runtime: number
  sort_by: string
  total_pages: number
  total_results: number
}
