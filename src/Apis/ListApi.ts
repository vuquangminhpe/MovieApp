import { typeParams } from '@/types/reference.type'
import { Movie, MovieTrendings, typeGenres, videosDetails } from '../types/Movie'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'

export const ListApi = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DataRated: (params: typeParams) => http.get<SuccessResponse<Movie>>('movie/top_rated', { params }),
  TrendingData: () => http.get<SuccessResponse<MovieTrendings[]>>('trending/all/day?language=en-US'),
  UpcomingList: (params: typeParams) => http.get<SuccessResponse<MovieTrendings[]>>('movie/upcoming', { params }),
  PopularList: (params: typeParams) => http.get<SuccessResponse<Movie>>('movie/popular', { params }),
  NowPlaying_List: (params: typeParams) => http.get<SuccessResponse<Movie>>('movie/now_playing', { params }),
  getVideosList: (movie_id: number) => http.get<SuccessResponse<videosDetails[]>>(`movie/${movie_id}/videos`),
  getTVLatest: () => http.get<Movie>('tv/latest'),
  getGenres: (params: Pick<typeParams, 'language'>) => http.get<typeGenres>('genre/movie/list', { params }),
  getAiringToday: () => http.get<SuccessResponse<MovieTrendings>>('tv/airing_today'),
  getOnTheAir: () => http.get<SuccessResponse<MovieTrendings>>('tv/on_the_air'),
  getTVPopular: () => http.get<SuccessResponse<MovieTrendings>>('tv/popular'),
  getTVTopRated: () => http.get<SuccessResponse<MovieTrendings>>('tv/top_rated')
}
