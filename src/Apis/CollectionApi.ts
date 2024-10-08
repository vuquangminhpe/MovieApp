import { Collection } from '@/types/Collection.type'
import { DetailsImages } from '@/types/Movie'
import { SuccessResponse } from '@/types/utils.type'

import http from '@/utils/http'

export const CollectionApi = {
  getDetailsCollection: (collection_id: number) => http.get<Collection>(`collection/${collection_id}`),
  getImagesCollection: (collection_id: number) =>
    http.get<SuccessResponse<DetailsImages[]>>(`collection/${collection_id}/images`)
}
