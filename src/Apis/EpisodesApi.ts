import { EpisodesType } from '@/types/Episodes.type'
import { Account_States } from '@/types/Movie'
import { Episode } from '@/types/TVSeason.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

export const EpisodesApi = {
  getDetailsEpisodes: (series_id: number, season_number: number, episode_number: number) =>
    http.get<Episode>(`tv/${series_id}/season/${season_number}/episode/${episode_number}`),
  getDetailsEpisodes_Credits: (series_id: number, season_number: number, episode_number: number) =>
    http.get<SuccessResponse<EpisodesType[]>>(
      `tv/${series_id}/season/${season_number}/episode/${episode_number}/credits`
    ),
  AddRatingEpisodes: (series_id: number, season_number: number, episode_number: number, ratingValue: number) =>
    http.post<SuccessResponse<{ status_message: string }>>(
      `tv/${series_id}/season/${season_number}/episode/${episode_number}/rating`,
      {
        value: ratingValue
      }
    ),
  DeletedRatingEpisodes: (series_id: number, season_number: number, episode_number: number) =>
    http.delete<SuccessResponse<{ status_message: string }>>(
      `tv/${series_id}/season/${season_number}/episode/${episode_number}/rating`
    ),
  getAccountState: (series_id: number, season_number: number, episode_number: number) =>
    http.get<Account_States>(`/tv/${series_id}/season/${season_number}/episode/${episode_number}/account_states`)
}
