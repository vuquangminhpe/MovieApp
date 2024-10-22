export interface Discover_Movie {
  certification?: string
  certification_gte?: string
  certification_lte?: string
  certification_country?: string
  include_adult?: boolean
  include_video?: boolean
  language?: string
  page?: number
  primary_release_year?: number
  primary_release_date_gte?: string
  primary_release_date_lte?: string
  region?: string
  release_date_gte?: string
  release_date_lte?: string
  sort_by?: SortBy
  vote_average_gte?: number
  vote_average_lte?: number
  vote_count_gte?: number
  vote_count_lte?: number
  watch_region?: string
  with_cast?: string
  with_companies?: string
  with_crew?: string
  with_genres?: string
  with_keywords?: string
  with_origin_country?: string
  with_original_language?: string
  with_people?: string
  with_release_type?: number
  with_runtime_gte?: number
  with_runtime_lte?: number
  with_watch_monetization_types?: string
  with_watch_providers?: string
  without_companies?: string
  without_genres?: string
  without_keywords?: string
  without_watch_providers?: string
  year?: number
}

export type SortBy =
  | ''
  | 'popularity.desc'
  | 'original_title.asc'
  | 'original_title.desc'
  | 'popularity.asc'
  | 'popularity.desc'
  | 'revenue.asc'
  | 'revenue.desc'
  | 'primary_release_date.asc'
  | 'title.asc'
  | 'title.desc'
  | 'primary_release_date.desc'
  | 'vote_average.asc'
  | 'vote_average.desc'
  | 'vote_count.asc'
  | 'vote_count.desc'

export interface DiscoverTV {
  air_date_gte?: string
  air_date_lte?: string
  first_air_date_year?: number
  first_air_date_gte?: string
  first_air_date_lte?: string
  include_adult?: boolean
  include_null_first_air_dates?: boolean
  language?: string
  page?: number
  screened_theatrically?: boolean
  sort_by?: SortBy_TV
  timezone?: string
  vote_average_gte?: number
  vote_average_lte?: number
  vote_count_gte?: number
  vote_count_lte?: number
  watch_region?: string
  with_companies?: string
  with_genres?: string
  with_keywords?: string
  with_networks?: number
  with_origin_country?: string
  with_original_language?: string
  with_runtime_gte?: number
  with_runtime_lte?: number
  with_status?: string
  with_watch_monetization_types?: string
  with_watch_providers?: string
  without_companies?: string
  without_genres?: string
  without_keywords?: string
  without_watch_providers?: string
  with_type?: string
}

export type SortBy_TV =
  | ''
  | 'first_air_date.asc'
  | 'first_air_date.desc'
  | 'name.asc'
  | 'name.desc'
  | 'original_name.asc'
  | 'original_name.desc'
  | 'popularity.asc'
  | 'popularity.desc'
  | 'vote_average.asc'
  | 'vote_average.desc'
  | 'vote_count.asc'
  | 'vote_count.desc'