import { typeSearchKeyWord } from '@/types/Search.type'
import { Account_States, DetailsImages, MovieCast, movieDetail, MovieTrendings } from '../types/Movie'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'
import { typeParams } from '@/types/reference.type'

const DetailsMovieApi = {
  getDetailsMovie: (movie_id: number, params?: typeParams) => http.get<movieDetail>(`movie/${movie_id}`, { params }),
  getCreditMovie: (movie_id: number) => http.get<SuccessResponse<MovieCast>>(`movie/${movie_id}/credits`),
  getReviewsMovie: (movie_id: number, params?: typeParams) =>
    http.get<SuccessResponse<MovieCast>>(`movie/${movie_id}/reviews`, { params }),
  getRecommendations: (movie_id: number, params?: typeParams) =>
    http.get<SuccessResponse<MovieTrendings>>(`movie/${movie_id}/recommendations`, { params }),
  getImages: (movie_id: number) => http.get<SuccessResponse<DetailsImages[]>>(`movie/${movie_id}/images`),
  getKeywords: (movie_id: number, params?: typeParams) =>
    http.get<SuccessResponse<typeSearchKeyWord[]>>(`movie/${movie_id}/keywords`, { params }),
  addRatingMovieDetails: (movie_id: number, ratingNumber: number) =>
    http.post<SuccessResponse<{ status_message: string }>>(`movie/${movie_id}/rating`, {
      value: ratingNumber
    }),
  getAccount_States: (movie_id: number) => http.get<Account_States>(`movie/${movie_id}/account_states`),
  deleteRating: (movie_id: number) =>
    http.delete<SuccessResponse<{ status_message: string }>>(`movie/${movie_id}/rating`)
}

export default DetailsMovieApi
