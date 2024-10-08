import configBase from '@/constants/config'
import { addListAccount } from '@/types/Account.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

export const AccountApi = {
  addFavorite: (params: addListAccount) =>
    http.post<SuccessResponse<{ status_message: string }>>(`account/${configBase.baseIdName}/favorite`, params),
  addWatchList: (params: addListAccount) =>
    http.post<SuccessResponse<{ status_message: string }>>(`account/${configBase.baseIdName}/watchlist`, params)
}
