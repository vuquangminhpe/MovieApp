import { Discover_Movie, DiscoverTV } from '@/types/Discover.type'
import { Movie } from '@/types/Movie'
import { TVSeries } from '@/types/TVSeries.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

export const DiscoverApi = {
  getListDiscover_Movie: (params: Discover_Movie) => http.get<SuccessResponse<Movie>>('discover/movie', { params }),
  getListDiscoverTV: (params: DiscoverTV) => http.get<SuccessResponse<TVSeries>>('discover/tv', { params })
}
