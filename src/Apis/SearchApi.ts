import { Movie, MovieConfig } from '@/types/Movie'
import { typeSearchKeyWord } from '@/types/Search.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

export const SearchApi = {
  Search_AllMovie: (params: MovieConfig) => http.get<SuccessResponse<Movie>>('search/movie', { params }),
  SearchKeyWord: (params: { query: string }) => http.get<typeSearchKeyWord>('/search/keyword', { params })
}
