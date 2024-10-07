import configBase from '@/constants/config'
import http from '@/utils/http'

export const AccountApi = {
  addFavorite: () => http.post(`account/${configBase.baseIdName}/favorite`),
  addWatchList: () => http.post(`account/${configBase.baseIdName}/watchlist`)
}
