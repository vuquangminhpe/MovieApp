import configBase from '@/constants/config'
import { listActionV3 } from '@/types/Account.type'
import { ListInfo } from '@/types/List.type'
import { typeParams } from '@/types/reference.type'
import http from '@/utils/http'

export const ActionListV3Api = {
  getDetails: (list_id: number, params: typeParams) => http.get(`list/${list_id}`, { params }),
  createdList: (params: ListInfo) => http.post(`list?session_id=${configBase.session_ID}`, params),
  deletedList: (list_id: number) => http.delete(`list/${list_id}?session_id=${configBase.session_ID}`),
  removeMovie: (list_id: number, params: listActionV3) =>
    http.post(`list/${list_id}/remove_item?session_id=${configBase.session_ID}`, params),
  clearMovie: (list_id: number, confirm: boolean) =>
    http.post(`list/${list_id}/clear?session_id=${configBase.session_ID}&confirm=${confirm}`),
  addMovie: (list_id: number, params: listActionV3) =>
    http.post(`list/${list_id}/add_item?session_id=${configBase.session_ID}`, params)
}
