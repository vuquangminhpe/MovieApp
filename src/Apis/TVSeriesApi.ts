import { videosDetails } from '@/types/Movie'
import {
  AccountStates_TV,
  Aggregate_Credits,
  BackdropImagesTVSeries,
  keywordsTVSeries,
  ReviewTVSeries,
  TVSeries,
  TVSeries_Lists,
  TVSeriesTrending
} from '@/types/TVSeries.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

export const TVSeriesApi = {
  getTVSeriesDetails: (series_id: number) => http.get<TVSeries>(`tv/${series_id}`),
  getRecommendation: (series_id: number) =>
    http.get<SuccessResponse<TVSeriesTrending[]>>(`tv/${series_id}/recommendations`),
  getKeyWords: (series_id: number) => http.get<SuccessResponse<keywordsTVSeries[]>>(`tv/${series_id}/keywords`),
  getIMG: (series_id: number) => http.get<SuccessResponse<BackdropImagesTVSeries[]>>(`tv/${series_id}/images`),
  getAggregateCredits: (series_id: number) =>
    http.get<SuccessResponse<Aggregate_Credits[]>>(`tv/${series_id}/aggregate_credits`),

  getReviews: (series_id: number) => http.get<SuccessResponse<ReviewTVSeries[]>>(`tv/${series_id}/reviews`),
  getVideosTVSeries: (series_id: number) => http.get<SuccessResponse<videosDetails>>(`tv/${series_id}/videos`),
  AddRatingTV: (series_id: number, ratingNumber: number) =>
    http.post<SuccessResponse<{ status_message: string }>>(`tv/${series_id}/rating`, { value: ratingNumber }),
  DeletedRatingTV: (series_id: number) =>
    http.delete<SuccessResponse<{ status_message: string }>>(`tv/${series_id}/rating`),
  GetAccountStates: (series_id: number) => http.get<AccountStates_TV>(`tv/${series_id}/account_states`),
  GetTVSeriesList: (series_id: number) => http.get<SuccessResponse<TVSeries_Lists[]>>(`tv/${series_id}/lists`)
}
