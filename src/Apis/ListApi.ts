import { typeParams } from '@/types/reference.type'
import { Movie, MovieTrendings, typeGenres, videosDetails } from '../types/Movie'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'
import { TVSeries } from '@/types/TVSeries.type'
import { PersonDetail } from '@/types/Person'

export const ListApi = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DataRated: (params: typeParams) => http.get<SuccessResponse<Movie>>('movie/top_rated', { params }),
  TrendingDataMovie: (time_window: string, params: { language: string }) =>
    http.get<SuccessResponse<MovieTrendings[]>>(`trending/movie/${time_window}`, { params }),
  TrendingDataTV: (time_window: string, params: { language: string }) =>
    http.get<SuccessResponse<TVSeries[]>>(`trending/tv/${time_window}`, { params }),
  TrendingDataPerson: (time_window: string, params: { language: string }) =>
    http.get<SuccessResponse<PersonDetail[]>>(`trending/person/${time_window}`, { params }),
  UpcomingList: (params: typeParams) => http.get<SuccessResponse<MovieTrendings[]>>('movie/upcoming', { params }),
  PopularList: (params: typeParams) => http.get<SuccessResponse<Movie>>('movie/popular', { params }),
  NowPlaying_List: (params: typeParams) => http.get<SuccessResponse<Movie>>('movie/now_playing', { params }),
  getVideosList: (movie_id: number) => http.get<SuccessResponse<videosDetails[]>>(`movie/${movie_id}/videos`),
  getTVLatest: () => http.get<Movie>('tv/latest'),
  getGenres: (params: Pick<typeParams, 'language'>) => http.get<typeGenres>('genre/movie/list', { params }),
  getAiringToday: (params: typeParams) => http.get<SuccessResponse<MovieTrendings[]>>('tv/airing_today', { params }),
  getOnTheAir: (params: typeParams) => http.get<SuccessResponse<MovieTrendings[]>>('tv/on_the_air', { params }),
  getTVPopular: (params: typeParams) => http.get<SuccessResponse<MovieTrendings[]>>('tv/popular', { params }),
  getTVTopRated: (params: typeParams) => http.get<SuccessResponse<MovieTrendings[]>>('tv/top_rated', { params })
}
