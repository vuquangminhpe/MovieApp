import { TVSeason } from '@/types/TVSeason.type'
import http from '@/utils/http'

export const TVSeasonsDetailsApi = {
  getDetailsSeasons: (series_id: number, season_number: number) =>
    http.get<TVSeason>(`tv/${series_id}/season/${season_number}`)
}
