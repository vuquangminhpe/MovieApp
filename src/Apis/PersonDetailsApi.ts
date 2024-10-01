import { Movie } from '@/types/Movie'
import { PersonDetail, SocialMediaIds } from '@/types/Person'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

export const PersonDetailsApi = {
  getPersonDetails: (person_id: number) => http.get<PersonDetail>(`person/${person_id}`),
  getExternalIds: (person_id: number) => http.get<SocialMediaIds>(`person/${person_id}/external_ids`),
  getMovie_credits: (person_id: number) => http.get<SuccessResponse<Movie>>(`person/${person_id}/movie_credits`)
}
