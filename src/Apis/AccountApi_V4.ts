import configBase from '@/constants/config'
import { AccountRating, AccountTVRating } from '@/types/Account.type'
import { MovieData_List, MovieInfo } from '@/types/Movie'
import { typeParams } from '@/types/reference.type'
import { SuccessResponse } from '@/types/utils.type'
import http_v4 from '@/utils/http_v4'

export const AccountApi_V4 = {
  getListAll: (params: typeParams) =>
    http_v4.get<SuccessResponse<MovieInfo[]>>(`account/${configBase.account_object_id}/lists`, {
      params
    }),
  getFavoriteMovies: (params: typeParams) =>
    http_v4.get<SuccessResponse<AccountRating>>(`account/${configBase.account_object_id}/movie/favorites`, { params }),
  getFavoriteTV: (params: typeParams) =>
    http_v4.get<SuccessResponse<AccountTVRating[]>>(`account/${configBase.account_object_id}/tv/favorites`, { params }),
  getRatedMovie: (params: typeParams) =>
    http_v4.get<SuccessResponse<AccountRating[]>>(`account/${configBase.account_object_id}/movie/rated`, { params }),
  getRatedTV: (params: typeParams) =>
    http_v4.get<SuccessResponse<AccountTVRating[]>>(`account/${configBase.account_object_id}/tv/rated`, { params }),
  getRecommendationsMovie: (params: typeParams) =>
    http_v4.get<SuccessResponse<AccountRating>>(`account/${configBase.account_object_id}/movie/recommendations`, {
      params
    }),
  getRecommendationsTV: (params: typeParams) =>
    http_v4.get<SuccessResponse<AccountTVRating>>(`account/${configBase.account_object_id}/tv/recommendations`, {
      params
    }),
  getWatchListMovie: (params: typeParams) =>
    http_v4.get<SuccessResponse<AccountRating>>(`account/${configBase.account_object_id}/movie/watchlist`, { params }),
  getWatchListTV: (params: typeParams) =>
    http_v4.get<SuccessResponse<AccountTVRating>>(`account/${configBase.account_object_id}/tv/watchlist`, { params }),
  getListsDetails: (params: typeParams, list_ID: number) => http_v4.get<MovieData_List>(`list/${list_ID}`, { params })
}
