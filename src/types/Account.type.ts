import { MovieTrendings } from './Movie'

export interface addListAccount {
  media_type?: 'movie' | 'tv'
  media_id: number
  favorite?: true
  watchlist?: true
}

export interface AccountRating extends MovieTrendings {
  rating?: number
}
