import http from '../utils/http'

export const ListApi = {
  DataRated: () => http.get('movie/top_rated')
}
