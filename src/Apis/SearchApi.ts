import { Collection } from '@/types/Collection.type'
import { Movie, MovieTrendings } from '@/types/Movie'
import { PersonDetail } from '@/types/Person'
import { companies, searchAll_Config, typeSearchKeyWord } from '@/types/Search.type'
import { TVSeries } from '@/types/TVSeries.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

export const SearchApi = {
  Search_AllMovie: (params: searchAll_Config) => http.get<SuccessResponse<Movie>>('search/movie', { params }),
  SearchCollection: (params: searchAll_Config) =>
    http.get<SuccessResponse<Collection>>('search/collection', { params }),
  SearchCompany: (params: searchAll_Config) => http.get<SuccessResponse<companies>>('search/company', { params }),
  SearchMulti: (params: searchAll_Config) =>
    http.get<SuccessResponse<MovieTrendings | Movie>>('search/multi', { params }),
  SearchPerson: (params: searchAll_Config) => http.get<SuccessResponse<PersonDetail>>('search/person', { params }),
  SearchTV: (params: searchAll_Config) => http.get<SuccessResponse<TVSeries>>('search/tv', { params }),
  SearchKeyWord: (params: { query: string }) => http.get<typeSearchKeyWord>('/search/keyword', { params }),
  SearchKeyWord_ALL: (params: searchAll_Config) =>
    http.get<SuccessResponse<typeSearchKeyWord>>('/search/keyword', { params })
}
