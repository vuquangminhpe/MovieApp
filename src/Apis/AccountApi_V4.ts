import configBase from '@/constants/config'
import { Movie, MovieTrendings } from '@/types/Movie'
import { TVSeries } from '@/types/TVSeries.type'
import { SuccessResponse } from '@/types/utils.type'
import http_v4 from '@/utils/http_v4'

export const AccountApi_V4 = {
  getListAll: () =>
    http_v4.get<SuccessResponse<Movie | TVSeries>>(`account/${configBase.account_object_id}/movie/lists`),
  getFavoriteMovies: () =>
    http_v4.get<SuccessResponse<MovieTrendings>>(`account/${configBase.account_object_id}/movie/favorites`),
  getFavoriteTV: () => http_v4.get<SuccessResponse<TVSeries>>(`account/${configBase.account_object_id}/tv/favorites`),
  getRatedMovie: () =>
    http_v4.get<SuccessResponse<MovieTrendings>>(`account/${configBase.account_object_id}/movie/rated`),
  getRatedTV: () => http_v4.get<SuccessResponse<TVSeries>>(`account/${configBase.account_object_id}/tv/rated`),
  getRecommendationsMovie: () =>
    http_v4.get<SuccessResponse<MovieTrendings>>(`account/${configBase.account_object_id}/movie/recommendations`),
  getRecommendationsTV: () =>
    http_v4.get<SuccessResponse<TVSeries>>(`account/${configBase.account_object_id}/tv/recommendations`),
  getWatchListMovie: () =>
    http_v4.get<SuccessResponse<MovieTrendings>>(`account/${configBase.account_object_id}/movie/watchlist`),
  getWatchListTV: () => http_v4.get<SuccessResponse<TVSeries>>(`account/${configBase.account_object_id}/tv/watchlist`)
}
