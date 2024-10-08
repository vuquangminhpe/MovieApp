import { CollectionApi } from '@/Apis/CollectionApi'
import { getIdFromNameId } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useParams } from 'react-router-dom'
import CollectionDetail from './CollectionDetail'
import { Part } from '@/types/Collection.type'
import { CastMember, DetailsImages, MovieCast } from '@/types/Movie'
import { SuccessResponse } from '@/types/utils.type'
import DetailsMovieApi from '@/Apis/DetailsMovieApi'

export default function CollectionMovies() {
  const location = useLocation()
  console.log(location.state.collectionId)

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
  const { data: dataCredits } = useQuery({
    queryKey: ['credit_MovieDetail', location.state.collectionId],
    queryFn: () => DetailsMovieApi.getCreditMovie(Number(location.state.collectionId))
  })
  const dataTopCast_Crew = (arrayData: MovieCast | undefined) => {
    if (!Array.isArray(arrayData)) {
      console.error('Invalid array data', arrayData)
      return []
    }

    return arrayData.sort((a: CastMember, b: CastMember) => {
      const value_A = Math.floor(a.popularity)
      const value_B = Math.floor(b.popularity)

      return value_B - value_A
    })
  }

  return (
    <div>
      <CollectionDetail dataImg={dataImg} collection={dataCollection} />
      <div className='mt-12'>
        <div className='container p-3'>
          <div className='text-black font-semibold dark:text-white capitalize'>featured cast</div>
          <div className='grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-2'>
            {dataTopCast_Crew(dataCredits?.data?.cast as MovieCast)
              .slice(0, 14)
              .map((itemCast: CastMember) => (
                <div className='flex w-full h-[40px] shadow-xl rounded-xl bg-white'>
                  <div>{itemCast.name}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
