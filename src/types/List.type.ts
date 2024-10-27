import { Movie } from './Movie'
import { TVSeries } from './TVSeries.type'

export interface ListInfo {
  description: string
  name: string
  iso_3166_1: string
  iso_639_1: string
  public: boolean
}
type SortByOptions =
  | 'original_order.asc'
  | 'original_order.desc'
  | 'rating.asc'
  | 'rating.desc'
  | 'release_date.asc'
  | 'release_date.desc'
  | 'primary_release_date.asc'
  | 'primary_release_date.desc'
  | 'title.asc'
  | 'title.desc'

export interface ListInfoWithSort {
  description: string
  name: string
  public: boolean
  sort_by: SortByOptions
}

export interface ListMovieSearch extends Movie {
  media_type: 'movie'
}
export interface ListTVSearch extends TVSeries {
  media_type: 'tv'
}

export interface Type_Created_List {
  status_message: string
  id: number
  success: true
  status_code: number
}
