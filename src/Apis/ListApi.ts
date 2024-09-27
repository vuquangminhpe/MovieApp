import { Movie, MovieTrendings, videosDetails } from '../types/Movie'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'

export const ListApi = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DataRated: () => http.get<SuccessResponse<Movie>>('movie/top_rated'),
  TrendingData: () => http.get<SuccessResponse<MovieTrendings[]>>('trending/all/day?language=en-US'),
  UpcomingList: () => http.get<SuccessResponse<MovieTrendings[]>>('movie/upcoming'),
  PopularList: () => http.get<SuccessResponse<Movie[]>>('movie/popular'),
  getVideosList: (movie_id: number) => http.get<SuccessResponse<videosDetails[]>>(`movie/${movie_id}/videos`),
  getTVLatest: () => http.get<Movie>('tv/latest')
}
