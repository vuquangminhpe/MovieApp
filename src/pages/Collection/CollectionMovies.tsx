import { CollectionApi } from '@/Apis/CollectionApi'
import { generateNameId, getIdFromNameId } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { Link, useLocation, useParams } from 'react-router-dom'
import CollectionDetail from './CollectionDetail'
import { Part } from '@/types/Collection.type'
import { CastMember, DetailsImages, MovieCast } from '@/types/Movie'
import { SuccessResponse } from '@/types/utils.type'
import DetailsMovieApi from '@/Apis/DetailsMovieApi'
import configBase from '@/constants/config'
import path from '@/constants/path'
import Skeleton from '@/Skeleton/Skeleton'
import HelMet from '@/Components/Custom/HelMet'

export default function CollectionMovies() {
  const location = useLocation()

  const { collection_id } = useParams()
  const id = getIdFromNameId(collection_id as string)
  const { data: dataCollectionDetails, isLoading: dataCLDetails } = useQuery({
    queryKey: ['collectionData', id],
    queryFn: () => CollectionApi.getDetailsCollection(Number(id))
  })
  const dataCollectionAll = dataCollectionDetails?.data.parts
  const dataCollection = dataCollectionDetails?.data.parts[0] as Part
  const { data: dataCollectionIMG } = useQuery({
    queryKey: ['collectionIMGData', id],
    queryFn: () => CollectionApi.getImagesCollection(Number(id))
  })
  const dataImg: SuccessResponse<DetailsImages[]> | undefined = dataCollectionIMG?.data
  const { data: dataCredits, isLoading } = useQuery({
    queryKey: ['credit_MovieDetail', location.state.collectionId],
    queryFn: () => DetailsMovieApi.getCreditMovie(Number(location.state.collectionId))
  })
  function findUniqueCastId(arrayData: MovieCast[]): boolean {
    const countMap: { [key: string]: number } = {}

    arrayData.forEach((item) => {
      const castIdStr = String(item.id)
      countMap[castIdStr] = (countMap[castIdStr] || 0) + 1
    })

    const uniqueCastIds = Object.values(countMap).filter((count) => count === 1)

    return uniqueCastIds.length === 1
  }
  const dataTopCast_Crew = (arrayData: MovieCast | undefined) => {
    if (!Array.isArray(arrayData)) {
      console.error('Invalid array data', arrayData)
      return []
    }

    return arrayData.sort((a: CastMember, b: CastMember) => {
      const value_A = Math.floor(a.popularity)
      const value_B = Math.floor(b.popularity)

      if (findUniqueCastId(arrayData)) {
        return value_B - value_A
      }

      return 0
    })
  }
  if (dataCLDetails && isLoading) {
    return <Skeleton />
  }
  return (
    <div>
      <HelMet title='Collection' />
      <CollectionDetail dataImg={dataImg} collection={dataCollection} />
      <div className='mt-12'>
        <div className='container p-3'>
          <div className='text-black font-semibold dark:text-white capitalize'>featured cast</div>
          <div className='grid mt-3 grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-2'>
            {dataTopCast_Crew(dataCredits?.data?.cast as MovieCast)
              .slice(0, 14)
              .map((itemCast: CastMember) => (
                <Link
                  to={`${path.person}/${generateNameId({ name: itemCast.name as string, id: itemCast.id })}`}
                  className='flex w-full h-[50px] shadow-xl rounded-2xl bg-white'
                >
                  <div>
                    <img
                      src={`${configBase.imageBaseUrl}${itemCast.profile_path}`}
                      className='h-full w-10 mr-6 rounded-l-md'
                      alt=''
                    />
                  </div>
                  <div>
                    <div className='text-sm font-bold'>{itemCast.name}</div>
                    <div className='text-sm text-gray-500'>{itemCast.character}</div>
                  </div>
                </Link>
              ))}
          </div>
          <div className='w-full border-b-2 my-14 border-gray-100'></div>
          <div className='text-black font-semibold dark:text-white capitalize'>featured crew</div>
          <div className='grid mt-3 grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-2'>
            {dataTopCast_Crew(dataCredits?.data?.crew as MovieCast)
              .slice(0, 14)
              .map((itemCrew: CastMember) => (
                <Link
                  to={`${path.person}/${generateNameId({ name: itemCrew.name as string, id: itemCrew.id })}`}
                  className='flex w-full h-[50px] shadow-xl rounded-2xl bg-white'
                >
                  <div>
                    <img
                      src={`${configBase.imageBaseUrl}${itemCrew.profile_path}`}
                      className='h-full w-10 mr-6 rounded-l-md'
                      alt=''
                    />
                  </div>
                  <div>
                    <div className='text-sm font-bold'>{itemCrew.name}</div>
                    <div className='text-sm text-gray-500'>{itemCrew.known_for_department}</div>
                  </div>
                </Link>
              ))}
          </div>
          <div className='w-full border-b-2 my-14 border-gray-100'></div>
          <div className='text-black font-semibold dark:text-white capitalize'>
            {dataCollection?.genre_ids.length} {''}movies
          </div>
          <div className='mt-5'>
            {dataCollectionAll?.map((item: Part) => (
              <Link
                to={`${path.movie}/${generateNameId({ name: item.original_title as string, id: item.id })}`}
                className='shadow-xl h-[100px] rounded-xl mt-2 flex'
              >
                <img
                  className='h-full min-w-[80px] rounded-l-xl'
                  src={`${configBase.imageBaseUrl}${item.poster_path}`}
                  alt=''
                />
                <div className='ml-5'>
                  <div className='font-bold text-xl'>{item.title}</div>
                  <div className='text-gray-400 text-sm'>{item.release_date}</div>
                  <div className='line-clamp-2'>{item.overview}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
