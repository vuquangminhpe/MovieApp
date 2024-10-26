import { listAction } from '@/types/Account.type'
import { ListInfo, ListInfoWithSort, ListMovieSearch, ListTVSearch } from '@/types/List.type'
import { searchAll_Config } from '@/types/Search.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'
import http_v4 from '@/utils/http_v4'

export const ActionListApi = {
  AddItems: (list_id: number, params: listAction) => http_v4.post(`list/${list_id}/items`, params),
  ClearItemInTheList: (list_id: number) => http_v4.get(`list/${list_id}/clear`),
  CreatedList: (params: ListInfo) => http_v4.post('list', params),
  DeletedList: (list_id: number) => http_v4.delete(`${list_id}`),
  RemoveItemsList: (list_id: number, params: listAction) => http_v4.delete(`list/${list_id}/items`, { params }),
  UpdateList: (list_id: number, params: ListInfoWithSort) => http_v4.put(`list/${list_id}`, { params }),
  UpdateItemsList: (list_id: number, params: listAction) => http_v4.put(`list/${list_id}items`, { params }),
  Search_AllMovie: (params: searchAll_Config) =>
    http.get<SuccessResponse<ListMovieSearch[]>>('search/movie', { params }),
  SearchTV: (params: searchAll_Config) => http.get<SuccessResponse<ListTVSearch[]>>('search/tv', { params })
}
