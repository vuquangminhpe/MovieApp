import { EpisodesType } from '@/types/Episodes.type'
import { Episode } from '@/types/TVSeason.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

export const EpisodesApi = {
  getDetailsEpisodes: (series_id: number, season_number: number, episode_number: number) =>
    http.get<Episode>(`tv/${series_id}/season/${season_number}/episode/${episode_number}`),
  getDetailsEpisodes_Credits: (series_id: number, season_number: number, episode_number: number) =>
    http.get<SuccessResponse<EpisodesType[]>>(
      `tv/${series_id}/season/${season_number}/episode/${episode_number}/credits`
    )
}
