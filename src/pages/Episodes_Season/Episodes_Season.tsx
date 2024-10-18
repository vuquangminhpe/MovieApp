import { EpisodesApi } from '@/Apis/EpisodesApi'
import configBase from '@/constants/config'
import { CastMember } from '@/types/Movie'
import { getIdFromNameId } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export default function Episodes_Season() {
  const { season_ID, tv_ID, episode_ID } = useParams()
  const tvID = getIdFromNameId(tv_ID as string)
  console.log(season_ID, tvID, episode_ID)
  const { data: dataDetailsEpisodes_Credits } = useQuery({
    queryKey: ['dataDetailsEpisodes_Credits'],
    queryFn: () => EpisodesApi.getDetailsEpisodes_Credits(Number(tvID), Number(season_ID), Number(episode_ID))
  })

  const dataEpisodes_Details = dataDetailsEpisodes_Credits?.data
  console.log(dataEpisodes_Details)

  return (
    <div className='flex justify-between container my-8'>
      <div>
        {dataEpisodes_Details?.cast.map((itemCast: CastMember) => (
          <div key={itemCast.cast_id} className='flex flex-col'>
            <div className='mb-5 w-60 h-40 flex'>
              <img
                src={`${configBase.imageBaseUrl}${itemCast.profile_path}`}
                className='w-[70%] h-full object-contain rounded-sm'
                alt=''
              />
              <div className='w-full ml-4'>
                <div className='font-bold'>{itemCast?.name}</div>
                <div className='font-semibold'>{itemCast?.character}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
