import { Movie } from '@/types/Movie'
import { SuccessResponse } from '@/types/utils.type'
import http_v4 from '@/utils/http_v4'

export const ListActionApi = {
  listDetailAction: (list_id: number) => http_v4.get<SuccessResponse<Movie>>(`list/${list_id}`)
}
