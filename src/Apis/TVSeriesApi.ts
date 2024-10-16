import { videosDetails } from '@/types/Movie'
import { TVSeries, TVSeriesTrending } from '@/types/TVSeries.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

export const TVSeriesApi = {
  getTVSeriesDetails: (series_id: number) => http.get<SuccessResponse<TVSeries>>(`tv/${series_id}`),
  getRecommendation: (series_id: number) => http.get<SuccessResponse<TVSeriesTrending[]>>(`tv/${series_id}`),
  getKeyWords: (series_id: number) => http.get<SuccessResponse<TVSeriesTrending[]>>(`tv/${series_id}/keywords`),
  getIMG: (series_id: number) => http.get<SuccessResponse<TVSeriesTrending[]>>(`tv/${series_id}/images`),
  getAggregateCredits: (series_id: number) =>
    http.get<SuccessResponse<TVSeriesTrending[]>>(`tv/${series_id}/aggregate_credits`),

  getSeason: (series_id: number) => http.get<SuccessResponse<TVSeriesTrending[]>>(`/tv/${series_id}/credits`),
  getReviews: (series_id: number) => http.get<SuccessResponse<TVSeriesTrending[]>>(`tv/${series_id}/reviews`),
  getVideosTVSeries: (series_id: number) => http.get<SuccessResponse<videosDetails>>(`tv/${series_id}/videos`),
  AddRatingTV: (series_id: number) => http.post<{ status_message: string }>(`tv/${series_id}/rating`),
  DeletedRatingTV: (series_id: number) => http.delete<{ status_message: string }>(`tv/${series_id}/rating`),
  GetAccountStates: (series_id: number) =>
    http.delete<SuccessResponse<TVSeriesTrending[]>>(`tv/${series_id}/account_states`)
}
