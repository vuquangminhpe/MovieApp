/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavLink, useParams } from 'react-router-dom'
import { getIdFromNameId } from '../../utils/utils'
import { useQuery } from '@tanstack/react-query'
import { ListApi } from '../../Apis/ListApi'
import configBase from '../../constants/config'
import { CastMember, movieDetail, videosDetails } from '../../types/Movie'
import Popover from '../../Components/Custom/Popover/Popover'
import YouTubePlayer from '../../Components/Custom/YouTubePlayerProps'
import { getYouTubeId } from '../../constants/regex'
import { Children, useEffect, useState } from 'react'
import DynamicMovieBackdrop from '../../Components/Custom/DynamicMovieBackdrop'
import DetailsMovieApi from '../../Apis/DetailsMovieApi'
import RenderDetailsMovie from '../../Components/RenderMovies/RenderDetailsMovie'
import CustomScrollContainer from '../../Components/Custom/CustomScrollContainer'
import TabsSet from '@/Components/Custom/TabsEnable/TabsSet'
import RenderMovies from '@/Components/RenderMovies/RenderMovie'
interface MovieDetailData {
  colorLiker?: string
}
export default function MovieDetails({ colorLiker = '#4CAF50' }: MovieDetailData) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { movieId } = useParams()
  const id = getIdFromNameId(movieId as string)

  const { data: dataMovieDetails } = useQuery({
    queryKey: ['movieDetail', id],
    queryFn: () => DetailsMovieApi.getDetailsMovie(Number(id))
  })
  const { data: dataYoutube_MovieDetails, refetch } = useQuery({
    queryKey: ['videosDetails_MovieDetail', id],
    queryFn: () => ListApi.getVideosList(Number(id)),
    staleTime: 0
  })
  const { data: dataCredits } = useQuery({
    queryKey: ['credit_MovieDetail', id],
    queryFn: () => DetailsMovieApi.getCreditMovie(Number(id))
  })
  const dataCredit = dataCredits?.data.cast
  console.log(dataCredit)

  const dataMovieDetails_Videos: videosDetails | undefined = dataYoutube_MovieDetails?.data.results[0]

  useEffect(() => {
    if (isModalOpen) {
      refetch()
    }
  }, [isModalOpen, refetch])
  const dataMovie = dataMovieDetails?.data
  const percentage = Math.round((dataMovie as movieDetail)?.vote_average * 10)
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  const MapSet = [
    {
      id: 'Most_Poplar',
      name: 'Most Poplar',
      Children: (
        <CustomScrollContainer height={400} width='100%'>
          <div className='flex gap-3 pr-4' style={{ width: 'max-content' }}>
            {dataYoutube_MovieDetails?.data.results?.map((dataPerformerDetails: videosDetails) => (
              <div className='max-w-full rounded-t-sm bg-white shadow-xl'>
                <RenderDetailsMovie key={dataPerformerDetails.id} dataMovieDetails={dataPerformerDetails} />
              </div>
            ))}
          </div>
        </CustomScrollContainer>
      )
    }
  ]

  if (percentage < 70 && percentage >= 30) {
    colorLiker = '#b9d13f'
  } else if (percentage < 30) {
    colorLiker = '#ed2133'
  }
  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    return `${hours}h ${minutes}m`
  }
  const handlePlayerError = (error: string) => {
    console.error('YouTube Player Error:', error)
  }
  const imageUrl = `${configBase.imageBaseUrl}${dataMovie?.backdrop_path || dataMovie?.poster_path}`

  return (
    <div className='my-8'>
      <div className='relative h-[520px] '>
        <DynamicMovieBackdrop imageUrl={imageUrl}>
          <div className='container'>
            <div className=' grid grid-cols-12 z-20 relative'>
              <div className='col-span-3 h-[450px]'>
                <img
                  src={`${configBase.imageBaseUrl}${dataMovie?.poster_path}`}
                  alt=''
                  className=' object-cover h-full rounded-xl shadow-sm'
                />
              </div>
              <div className='col-span-9 ml-6 text-white'>
                <div className='capitalize font-semibold text-2xl'>{dataMovie?.original_title}</div>
                <div className='flex'>
                  {dataMovie?.release_date}({dataMovie?.origin_country[0]})<div className='ml-1 text-white'>{'•'}</div>
                  {dataMovie?.genres.map((item) => (
                    <div className='flex'>
                      <div className='cursor-pointer mx-1 '>{item.name}</div>,
                    </div>
                  ))}
                  <div className='ml-2'> Time: {formatRuntime(dataMovie?.runtime as number)}</div>
                </div>
                <div className='w-24 h-20 flex mt-3 items-center text-center justify-center'>
                  <svg className='w-[70%] h-full hover:scale-150 transition-all cursor-pointer' viewBox='0 0 40 40'>
                    <circle
                      className='text-gray-700'
                      strokeWidth='3'
                      stroke='currentColor'
                      fill='transparent'
                      r={radius}
                      cx='20'
                      cy='20'
                    />
                    <circle
                      className='text-lime-400'
                      strokeWidth='3'
                      strokeLinecap='round'
                      stroke={colorLiker}
                      fill='transparent'
                      r={radius}
                      cx='20'
                      cy='20'
                      style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: strokeDashoffset,
                        transform: 'rotate(-90deg)',
                        transformOrigin: '50% 50%'
                      }}
                    />
                    <text
                      x='20.15'
                      y='24.45'
                      className='percentage font-semibold'
                      textAnchor='middle'
                      fill='white'
                      fontSize='13'
                    >
                      {percentage}%
                    </text>{' '}
                  </svg>
                  <div className='w-[5%] translate-x-6'>User Score</div>
                </div>
                <div className='flex gap-6 mt-7'>
                  <Popover
                    onEvent='onClick'
                    renderPopover={
                      <div className='bg-blue-950 p-8 rounded-sm flex'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='#fff'
                          className='size-6 mr-2 cursor-pointer'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                        </svg>
                        <span className='text-white cursor-pointer'>Create new List</span>
                      </div>
                    }
                    className='rounded-full bg-blue-950 size-8 justify-center items-center text-center flex'
                    show={true}
                    children={
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='white'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='#fff'
                        className='size-6 cursor-pointer'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
                        />
                      </svg>
                    }
                  />
                  <Popover
                    renderPopover={
                      <div className='bg-blue-950 p-1 rounded-sm flex'>
                        <span className='text-white cursor-pointer'>Mark as favorite</span>
                      </div>
                    }
                    className='rounded-full bg-blue-950 size-8 justify-center items-center text-center flex'
                    show={true}
                    children={
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='#fff'
                        className='size-6 cursor-pointer'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                        />
                      </svg>
                    }
                  />{' '}
                  <Popover
                    renderPopover={
                      <div className='bg-blue-950 p-1 rounded-sm flex'>
                        <span className='text-white cursor-pointer'>Add to your watchlist</span>
                      </div>
                    }
                    className='rounded-full bg-blue-950 size-8 justify-center items-center text-center flex'
                    show={true}
                    children={
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='#fff'
                        className='size-6 cursor-pointer'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
                        />
                      </svg>
                    }
                  />
                  <div
                    onClick={() => setIsModalOpen(true)}
                    className='hover:opacity-50 cursor-pointer flex justify-center items-center'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={5}
                      stroke='#fff'
                      className='size-6 font-bold'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z'
                      />
                    </svg>
                    <span className='capitalize text-white font-bold'>play trailer</span>
                  </div>
                </div>
                <div className='opacity-50 mt-6'>{dataMovie?.tagline}</div>
                <div className=' mt-5'>
                  <h2 className='capitalize text-white font-semibold'>overview</h2>
                  <div className='text-wrap text-gray-300'>{dataMovie?.overview}</div>
                </div>
              </div>
            </div>
          </div>{' '}
        </DynamicMovieBackdrop>
      </div>
      <div className='grid grid-cols-12 container w-full'>
        <div className='col-span-9 w-full'>
          <div className='w-full'>
            <div className='mt-9 mb-3 ml-1 font-bold text-2xl'>Top Billed Cast</div>
            <CustomScrollContainer height={400} width='100%'>
              <div className='flex gap-3 pr-4' style={{ width: 'max-content' }}>
                {dataCredit?.map((dataPerformerDetails: CastMember) => (
                  <div className='max-w-full rounded-t-sm bg-white shadow-xl'>
                    <RenderDetailsMovie key={dataPerformerDetails.id} dataMovieDetails={dataPerformerDetails} />
                    <div className='p-2 text-black font-semibold'>
                      {dataPerformerDetails.name || dataPerformerDetails.original_name}
                    </div>
                    <div className='p-2 text-gray-400'>{dataPerformerDetails.character}</div>
                  </div>
                ))}
              </div>
            </CustomScrollContainer>
          </div>
          <div className='capitalize py-5 font-bold'>full cast & crew</div>
          <div className='border-b-[1px] border-gray-300'></div>
          <div className='mt-5 capitalize flex'>
            <div className='font-semibold'>Media</div>
          </div>
        </div>
        <div className='col-span-3 inline-block text-black'></div>
      </div>
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-4 rounded-lg items-center text-center'>
            {
              <YouTubePlayer
                key={dataMovieDetails_Videos?.key}
                videoId={getYouTubeId(dataMovieDetails_Videos?.key as string) || ''}
                onError={handlePlayerError}
              />
            }
            <button
              onClick={() => setIsModalOpen(false)}
              className='mt-4 px-4 py-2 bg-red-500 hover:bg-red-950 text-white text-center items-center rounded'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
