import React from 'react'
import { TVSeasonsDetailsApi } from '@/Apis/TVSeasonsDetailsApi'
import configBase from '@/constants/config'
import { Episode, TVSeason } from '@/types/TVSeason.type'
import { getIdFromNameId } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion'

export default function SeasonDetails() {
  const { season_ID, tv_ID } = useParams()
  const tvID = getIdFromNameId(tv_ID as string)

  const { data: dataSeason } = useQuery({
    queryKey: ['dataSeason_Detail'],
    queryFn: () => TVSeasonsDetailsApi.getDetailsSeasons(Number(tvID), Number(season_ID))
  })
  const dataSeasonDetail: TVSeason = dataSeason?.data as TVSeason

  return (
    <div className='flex flex-col w-full'>
      <div className='bg-gray-600 w-full'>
        <div className='container my-2 flex'>
          <img
            src={`${configBase.imageBaseUrl}${dataSeasonDetail?.poster_path}`}
            className='w-28 h-auto object-contain'
            alt=''
          />
          <div>
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
          <div className='font-semibold text-sm'>Episodes {dataSeasonDetail?.episodes?.length}</div>
          <Popover>
            <PopoverTrigger>Sort</PopoverTrigger>
            <PopoverContent className='flex flex-col'>
              <Popover>
                <PopoverTrigger>Open</PopoverTrigger>
                <PopoverContent>Place content for the popover here.</PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger>Open</PopoverTrigger>
                <PopoverContent>Place content for the popover here.</PopoverContent>
              </Popover>
            </PopoverContent>
          </Popover>
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
                        <div className='text-sm text-white'>0%</div>
                      </div>
                      <div className='bg-cyan-400 rounded-r-xl text-sm p-1 cursor-pointer text-white'>Rate</div>
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
                  <AccordionTrigger>Expand</AccordionTrigger>
                  <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
