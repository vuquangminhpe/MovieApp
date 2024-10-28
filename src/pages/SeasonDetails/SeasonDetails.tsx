import { TVSeasonsDetailsApi } from '@/Apis/TVSeasonsDetailsApi'
import configBase from '@/constants/config'
import { Episode, TVSeason } from '@/types/TVSeason.type'
import { getIdFromNameId } from '@/utils/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion'
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover'
import RatingInputStarEpisode from './RatingInputStarEpisode'
import EpisodesApi from '../Episodes_Season'
import { useEffect, useState } from 'react'
import { SuccessResponse } from '@/types/utils.type'
import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import Skeleton from '@/Skeleton/Skeleton'
import HelMet from '@/Components/Custom/HelMet'

export default function SeasonDetails() {
  const location = useLocation()
  const pathname = location.pathname.slice(0, location.pathname.length - 1)
  const navigate = useNavigate()
  const [episodeID, setEpisodeID] = useState<number>(1)

  const { season_ID, tv_ID } = useParams()
  const tvID = getIdFromNameId(tv_ID as string)

  const { data: dataSeason, isLoading: dataSeasonLoading } = useQuery({
    queryKey: ['dataSeason_Detail'],
    queryFn: () => TVSeasonsDetailsApi.getDetailsSeasons(Number(tvID), Number(season_ID))
  })

  const dataSeasonDetail: TVSeason = dataSeason?.data as TVSeason
  const {
    data: dataAccountState,
    refetch,
    isLoading: dataAccountStateLoading
  } = useQuery({
    queryKey: ['dataAccountState', episodeID],
    queryFn: () => EpisodesApi.getAccountState(Number(tvID), Number(season_ID), Number(episodeID))
  })
  const dataRated = dataAccountState?.data
  useEffect(() => {
    refetch()
  }, [refetch, episodeID])
  const deletedRatingEpisodesMutation = useMutation({
    mutationFn: () => EpisodesApi.DeletedRatingEpisodes(Number(tvID), Number(season_ID), Number(episodeID))
  })
  const handleEpisode = (episode_number: number) => {
    navigate(`${pathname}${episode_number}/cast`, {
      state: {
        episodes_All_Season: dataSeasonDetail?.episodes.length
      }
    })
  }
  const handleDeletedRating = () => {
    deletedRatingEpisodesMutation.mutate(undefined, {
      onSuccess: (data: AxiosResponse<SuccessResponse<{ status_message: string }>>) => {
        toast.success(`${data.data.status_message}`)
        refetch()
      },
      onError: (error: Error) => {
        toast.error(`${error}`)
      }
    })
  }
  if (dataSeasonLoading && dataAccountStateLoading) {
    return <Skeleton />
  }
  return (
    <div className='flex flex-col w-full'>
      <HelMet title='Season details' />
      <div className='bg-gray-600 w-full'>
        <div className='container my-2 flex '>
          <img
            src={`${configBase.imageBaseUrl}${dataSeasonDetail?.poster_path}`}
            className='w-28 h-auto object-contain'
            alt=''
          />
          <div className='ml-4'>
            <div className='font-bold text-xl text-white'>
              {dataSeasonDetail?.name} ({new Date(dataSeasonDetail?.air_date).getFullYear()})
            </div>
            <div className='flex text-gray-200 cursor-pointer hover:opacity-50'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18' />
              </svg>
              Back to season list
            </div>
          </div>
        </div>
      </div>
      <div className='container max-xl:mx-2 my-5'>
        <div className='flex justify-between mb-4'>
          <div className='font-bold text-xl'>Episodes {dataSeasonDetail?.episodes?.length}</div>
        </div>
        <div className='space-y-4'>
          {dataSeasonDetail?.episodes?.map((itemEpisodes: Episode) => (
            <div key={itemEpisodes?.id} className='flex flex-col rounded-xl shadow-xl'>
              <div className='flex gap-3 py-4 mb-5 w-full'>
                <img
                  className='w-[150px] object-cover rounded-tl-xl'
                  src={
                    itemEpisodes?.still_path
                      ? `${configBase?.imageBaseUrl}${itemEpisodes?.still_path}`
                      : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`
                  }
                  alt=''
                />
                <div className='flex flex-col flex-grow'>
                  <div className='flex font-bold text-sm gap-4'>
                    {itemEpisodes?.episode_number}
                    <div className='flex font-bold text-sm'>Episode {itemEpisodes?.episode_number}</div>
                  </div>
                  <div className='flex gap-3'>
                    <div className='flex'>
                      <div className='flex gap-2 bg-blue-950 p-1 rounded-l-xl'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='#fff'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='#fff'
                          className='size-4'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z'
                          />
                        </svg>
                        <div className='text-sm text-white'>
                          <div>{itemEpisodes.vote_average ? itemEpisodes.vote_average : '0'}%</div>
                        </div>
                      </div>
                      <Popover>
                        <PopoverTrigger>
                          {' '}
                          <div
                            onClick={() => setEpisodeID(itemEpisodes?.episode_number as number)}
                            className='bg-cyan-400 rounded-r-xl text-sm p-1 cursor-pointer text-white'
                          >
                            Rate
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className='flex flex-col gap-2 bg-blue-950 shadow-xl rounded-xl'>
                          <div className='text-white text-sm'>Rated on {new Date().toLocaleDateString()}</div>
                          <div className='flex items-center gap-2'>
                            <svg
                              onClick={handleDeletedRating}
                              xmlns='http://www.w3.org/2000/svg'
                              fill='#fff'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='#000'
                              className='size-6 cursor-pointer'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                              />
                            </svg>
                            <RatingInputStarEpisode
                              tvID={Number(tvID)}
                              season_ID={Number(season_ID)}
                              episodes_Id={Number(episodeID)}
                              initialRating={Number(dataRated?.rated.value)}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>{itemEpisodes?.air_date}</div>
                  </div>
                  <div>
                    {itemEpisodes?.overview
                      ? itemEpisodes?.overview
                      : `We don't have an overview translated in English. Help us expand our database by adding one.`}
                  </div>
                </div>
              </div>
              <div className='border-t border-gray-400 w-[95%] mx-auto'></div>
              <Accordion className='p-3' type='single' collapsible>
                <AccordionItem value='item-1'>
                  <AccordionTrigger className='flex justify-center'>Expand</AccordionTrigger>
                  <AccordionContent className='mt-10'>
                    <div className='flex justify-between '>
                      <div className='flex text-black font-semibold'>Crew {itemEpisodes.crew.length}</div>
                      <div className='font-semibold'>Guest Stars {itemEpisodes.guest_stars.length}</div>
                      <div
                        onClick={() => handleEpisode(itemEpisodes?.episode_number)}
                        className='capitalize cursor-pointer font-semibold'
                      >
                        full cast & crew
                      </div>
                    </div>
                    <div className='border-b border-gray-200'></div>
                    <div className='mt-6'>
                      <div className='flex justify-between'>
                        <div className='flex flex-col gap-1'>
                          <div className='capitalize text-sm font-semibold'>
                            episode images{' '}
                            <img
                              src={
                                itemEpisodes?.still_path
                                  ? `${configBase?.imageBaseUrl}${itemEpisodes?.still_path}`
                                  : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`
                              }
                              className='w-[150px] h-[100px] object-contain'
                              alt=''
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
