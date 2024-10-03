import { Movie, MovieConfig } from '@/types/Movie'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

export const SearchApi = {
  Search_AllMovie: (params: MovieConfig) => http.get<SuccessResponse<Movie>>('search/movie', { params })
}
