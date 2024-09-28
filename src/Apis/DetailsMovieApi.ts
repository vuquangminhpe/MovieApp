import { DetailsImages, MovieCast, movieDetail } from '../types/Movie'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'

const DetailsMovieApi = {
  getDetailsMovie: (movie_id: number) => http.get<movieDetail>(`movie/${movie_id}`),
  getCreditMovie: (movie_id: number) => http.get<SuccessResponse<MovieCast>>(`movie/${movie_id}/credits`),
  getReviewsMovie: (movie_id: number) => http.get<SuccessResponse<MovieCast>>(`movie/${movie_id}/reviews`),
  getRecommendations: (movie_id: number) => http.get<SuccessResponse<MovieCast>>(`movie/${movie_id}/recommendations`),
  getImages: (movie_id: number) => http.get<SuccessResponse<DetailsImages>>(`movie/${movie_id}/images`)
}

export default DetailsMovieApi
