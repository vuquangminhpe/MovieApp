import { BackdropImages, CastMember, MovieTrendings } from './Movie'

export interface CreatedBy {
  id: number
  credit_id: string
  name: string
  gender: number
  profile_path: string
}

export interface Genre {
  id: number
  name: string
}

export interface EpisodeToAir {
  id: number
  name: string
  overview: string
  vote_average: number
  vote_count: number
  air_date: string
  episode_number: number
  episode_type: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string
}

export interface Network {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface ProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface Season {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
  vote_average: number
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface TVSeries {
  adult: boolean
  backdrop_path: string
  created_by: CreatedBy[]
  episode_run_time: number[]
  first_air_date: string
  genres: Genre[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: EpisodeToAir
  name: string
  next_episode_to_air: EpisodeToAir
  networks: Network[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  seasons: Season[]
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
  media_type?: string
}

export interface TVSeriesTrending extends MovieTrendings {
  media_type: 'tv'
}

export interface BackdropImagesTVSeries {
  backdrops: BackdropImages[]
}

export interface AccountStates_TV {
  id: number
  favorite: false
  rated: {
    value: number
  }
  watchlist: false
}

export interface CastTV {
  cast?: CastMember[]
}

export interface AuthorDetails {
  name: string
  username: string
  avatar_path: string
  rating: number
}

export interface ReviewTVSeries {
  author: string
  author_details: AuthorDetails
  content: string
  created_at: string
  id: string
  updated_at: string
  url: string
}

export interface Aggregate_Credits extends Omit<CastMember, 'cast_id' | 'credit_id'> {
  roles: Aggregate_Credits_roles_Details[]
  total_episode_count: number
}

export interface Aggregate_Credits_roles_Details {
  credits_id: string
  character: string
  episode_count: number
}

export interface keywordsTVSeries {
  name: string
  id: number
}

export interface TVSeries_Lists {
  description: string
  favorite_count: number
  id: number
  item_count: number
  iso_639_1: string
  iso_3166_1: string
  name: string
  poster_path: string | null
}
