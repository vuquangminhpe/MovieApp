import { EpisodesApi } from '@/Apis/EpisodesApi'
import { TVSeasonsDetailsApi } from '@/Apis/TVSeasonsDetailsApi'
import configBase from '@/constants/config'
import Skeleton from '@/Skeleton/Skeleton'
import { CastMember } from '@/types/Movie'
import { CrewMember, GuestStar, TVSeason } from '@/types/TVSeason.type'
import { getIdFromNameId } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { Link, useLocation, useParams } from 'react-router-dom'

export default function Episodes_Season() {
  const location = useLocation()
  const pathName = location.pathname.slice(0, location.pathname.length - 6)
  const { season_ID, tv_ID, episode_ID } = useParams()
  const tvID = getIdFromNameId(tv_ID as string)
  const { data: dataDetailsEpisodes_Credits, isLoading: loadingDATADETAILS } = useQuery({
    queryKey: ['dataDetailsEpisodes_Credits'],
    queryFn: () => EpisodesApi.getDetailsEpisodes_Credits(Number(tvID), Number(season_ID), Number(episode_ID))
  })
  const { data: data_Episodes_All, isLoading: loadingDATA_ALL } = useQuery({
    queryKey: ['dataDetailsEpisodes_All'],
    queryFn: () => EpisodesApi.getDetailsEpisodes(Number(tvID), Number(season_ID), Number(episode_ID))
  })
  const { data: dataSeason, isLoading } = useQuery({
    queryKey: ['dataSeason_Detail'],
    queryFn: () => TVSeasonsDetailsApi.getDetailsSeasons(Number(tvID), Number(season_ID))
  })
  const dataSeasonDetail: TVSeason = dataSeason?.data as TVSeason

  const dataEpisodes_Details = dataDetailsEpisodes_Credits?.data
  const data_EpisodesAll = data_Episodes_All?.data
  if (loadingDATADETAILS && loadingDATA_ALL && isLoading) {
    return <Skeleton />
  }
  return (
    <div className='my-1'>
      <div className='bg-blue-950 items-center h-[100px] w-full flex justify-start'>
        <img
          src={
            data_EpisodesAll?.still_path
              ? `${configBase.imageBaseUrl}${data_EpisodesAll?.still_path}`
              : configBase.noImagesPoster
          }
          alt=''
          className='w-[200px] h-[90%] object-cover'
        />
        <div className='ml-3'>
          <div className='flex gap-3 items-center'>
            <div className='text-white font-serif'>1x{episode_ID}</div>
            <div className='text-white font-bold text-xl'>Episode {episode_ID}</div>
            <div className='text-white text-xl'>({new Date(data_EpisodesAll?.air_date as string).getFullYear()})</div>
          </div>
          <div className='flex'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='#fff'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75'
              />
            </svg>

            <Link className='text-white hover:text-gray-500' to={`${pathName}${episode_ID}`}>
              Back to episode
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`my-10 border-b w-full border-gray-300 flex ${Number(episode_ID) > 1 ? 'justify-between' : 'justify-end'}`}
      >
        <div>
          {Number(episode_ID) > 1 ? (
            <Link to={`${pathName}${Number(episode_ID) - 1}/cast`}>
              Episode {Number(episode_ID) - 1} (1x{Number(episode_ID) - 1})
            </Link>
          ) : (
            ''
          )}
        </div>
        <div>
          {Number(episode_ID) < dataSeasonDetail?.episodes.length ? (
            <Link to={`${pathName}${Number(episode_ID) + 1}/cast`}>
              Episode {Number(episode_ID) + 1} (1x{Number(episode_ID) + 1})
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className=' container my-8'>
        <div className='flex justify-around'>
          <div>
            {dataEpisodes_Details?.cast.map((itemCast: CastMember) => (
              <div key={itemCast.id} className='flex flex-col h-auto'>
                <div className='mb-5 w-60 h-full flex max-md:flex-col'>
                  <img
                    src={
                      itemCast?.profile_path
                        ? `${configBase.imageBaseUrl}${itemCast?.profile_path}`
                        : configBase.noImagesUser
                    }
                    className='w-[60%] h-[60%] object-contain rounded-sm'
                    alt=''
                  />
                  <div className='w-full max-md:w-[56%] ml-4'>
                    <div className='font-bold'>{itemCast?.name}</div>
                    <div className='font-semibold'>{itemCast?.character}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className='capitalize font-bold'>guest stars {dataEpisodes_Details?.guest_stars.length}</div>
            <div>
              {(dataEpisodes_Details?.guest_stars.length as number) > 0
                ? dataEpisodes_Details?.guest_stars.map((itemCast: GuestStar) => (
                    <div key={itemCast.id} className='flex flex-col  h-auto'>
                      <div className='mb-5 w-60 h-40 flex max-md:flex-col'>
                        <img
                          src={`${configBase.imageBaseUrl}${itemCast?.profile_path}`}
                          className='w-[60%] h-[60%] object-contain rounded-sm'
                          alt=''
                        />
                        <div className='w-full max-md:w-[56%] ml-4'>
                          <div className='font-bold'>{itemCast?.name}</div>
                          <div className='font-semibold'>{itemCast?.character}</div>
                        </div>
                      </div>
                    </div>
                  ))
                : `There are no cast records added to Episode ${episode_ID}.`}
            </div>
          </div>
          <div>
            <div className='capitalize font-bold'>Crew {dataEpisodes_Details?.guest_stars.length}</div>
            <div>
              {(dataEpisodes_Details?.crew.length as number) > 0
                ? dataEpisodes_Details?.crew.map((itemCast: CrewMember) => (
                    <div key={itemCast.credit_id} className='flex flex-col h-auto'>
                      <div className='mb-5 w-60 h-40 flex max-md:flex-col'>
                        <img
                          src={`${configBase.imageBaseUrl}${itemCast?.profile_path}`}
                          className='w-[60%] h-[60%] object-contain rounded-sm'
                          alt=''
                        />
                        <div className='w-full max-md:w-[56%] ml-4'>
                          <div className='font-bold'>{itemCast?.name}</div>
                          <div className='font-semibold'>{itemCast?.department}</div>
                        </div>
                      </div>
                    </div>
                  ))
                : `There are no cast records added to Episode ${episode_ID}.`}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
