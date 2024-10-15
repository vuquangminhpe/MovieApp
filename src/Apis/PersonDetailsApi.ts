import { Movie, MovieTrendings } from '@/types/Movie'
import { PersonDetail, PopularPeopleList, SocialMediaIds } from '@/types/Person'
import { typeParams } from '@/types/reference.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

export const PersonDetailsApi = {
  getPersonDetails: (person_id: number) => http.get<PersonDetail>(`person/${person_id}`),
  getExternalIds: (person_id: number) => http.get<SocialMediaIds>(`person/${person_id}/external_ids`),
  getMovie_credits: (person_id: number) => http.get<SuccessResponse<Movie>>(`person/${person_id}/movie_credits`),
  getMovie_tv_credits: (person_id: number) =>
    http.get<SuccessResponse<MovieTrendings>>(`person/${person_id}/tv_credits`),
  getPeopleList: (params: typeParams) => http.get<SuccessResponse<PopularPeopleList[]>>('/person/popular', { params })
}
