import { MovieTrendings } from './Movie'
import { TVSeries } from './TVSeries.type'

export interface addListAccount {
  media_type?: 'movie' | 'tv' | string
  media_id: number
  favorite?: true
  watchlist?: true
}

export interface AccountRating extends MovieTrendings {
  rating?: number
  account_rating?: {
    created_at: string
    value: number
  }
}
export interface AccountTVRating extends TVSeries {
  rating?: number
  account_rating?: {
    created_at: string
    value: number
  }
}
