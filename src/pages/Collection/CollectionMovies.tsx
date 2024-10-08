import { CollectionApi } from '@/Apis/CollectionApi'
import { getIdFromNameId } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import CollectionDetail from './CollectionDetail'
import { Part } from '@/types/Collection.type'
import { DetailsImages } from '@/types/Movie'
import { SuccessResponse } from '@/types/utils.type'

export default function CollectionMovies() {
  const { collection_id } = useParams()
  const id = getIdFromNameId(collection_id as string)
  const { data: dataCollectionDetails } = useQuery({
    queryKey: ['collectionData', id],
    queryFn: () => CollectionApi.getDetailsCollection(Number(id))
  })
  const dataCollection = dataCollectionDetails?.data.parts[0] as Part
  const { data: dataCollectionIMG } = useQuery({
    queryKey: ['collectionIMGData', id],
    queryFn: () => CollectionApi.getImagesCollection(Number(id))
  })
  const dataImg: SuccessResponse<DetailsImages[]> | undefined = dataCollectionIMG?.data

  return <CollectionDetail dataImg={dataImg} collection={dataCollection} />
}
