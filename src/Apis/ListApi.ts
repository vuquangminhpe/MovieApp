import { Movie, MovieTrendings } from '../types/Movie'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'

export const ListApi = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DataRated: () => http.get<SuccessResponse<Movie>>('movie/top_rated'),
  TrendingData: () => http.get<SuccessResponse<MovieTrendings[]>>('trending/all/day?language=en-US'),
  PopularList: () => http.get<SuccessResponse<MovieTrendings[]>>('tv/popular')
}
