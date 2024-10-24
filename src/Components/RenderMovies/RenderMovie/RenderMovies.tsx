/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from 'react-router-dom'
import configBase from '../../../constants/config'
import { Movie, MovieTrendings } from '../../../types/Movie'
import { generateNameId } from '../../../utils/utils'

import InputStar from '@/Components/Custom/InputStar'
import { Popover as Pops, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { useMutation } from '@tanstack/react-query'
import DetailsMovieApi from '@/Apis/DetailsMovieApi'
import { SuccessResponse } from '@/types/utils.type'
import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { useState } from 'react'

interface RenderMoviesProps {
  dataTrending: MovieTrendings | Movie
  colorLiker?: string
  isShow?: boolean
  configWidth_Height?: string
  typeText?: string
  CustomIMG?: string
  movie_id: number
  setMovieId: React.Dispatch<React.SetStateAction<number | undefined>>
  voteRate: number
  media_type?: string
}

const RenderMovies = ({
  movie_id,
  dataTrending,
  colorLiker = '#4CAF50',
  isShow = true,
  configWidth_Height = 'w-48 h-72',
  typeText = 'text-white',
  CustomIMG = '',
  setMovieId,
  voteRate,
  media_type
}: RenderMoviesProps) => {
  const [mediaType, setMediaType] = useState<string>(media_type || 'movie')

  const percentage = Math.round((dataTrending as MovieTrendings).vote_average * 10)
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  const deletedRatingMutation = useMutation({ mutationFn: () => DetailsMovieApi.deleteRating(movie_id) })
  if (percentage <= 60 && percentage >= 30) {
    colorLiker = '#b9d13f'
  } else if (percentage < 30) {
    colorLiker = '#ed2133'
  }
  const date = new Date().toLocaleDateString('en-US')
  const handleDeletedRatingMovies = () => {
    deletedRatingMutation.mutate(undefined, {
      onSuccess: (data: AxiosResponse<SuccessResponse<{ status_message: string }>>) => {
        toast.success(`${data.data.status_message}`)
      },
      onError: (error: Error) => {
        toast.error(`${error.message}`)
      }
    })
  }
  return (
    <div
      className={`${configWidth_Height} bg-gradient-to-b from-blue-900 to-black rounded-xl overflow-hidden shadow-lg relative`}
    >
      <div className='absolute top-2 right-2 z-10'>
        <div className='w-6 h-6 flex items-center justify-center cursor-pointer'>
          <Pops>
            <PopoverTrigger>
              {' '}
              <span onClick={() => setMovieId(movie_id)} className='text-gray-400 text-xl'>
                ⋮
              </span>
            </PopoverTrigger>
            <PopoverContent>
              <div className='max-w-56  bg-white h-auto shadow-xl rounded-sm'>
                <div className='flex justify-start items-center text-center px-4 py-2 my-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='black'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5 mr-2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
                    />
                  </svg>
                  Add to List
                </div>
                <div className='border-b-[1px]'></div>
                <div className='flex justify-start items-center text-center  px-4 py-2 my-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='#B22222'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='#B22222'
                    className='size-5 mr-2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                    />
                  </svg>
                  Favorite
                </div>
                <div className='border-b-[1px]'></div>
                <div className='flex justify-start items-center text-center  px-4 py-2 my-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='black'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5 mr-2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
                    />
                  </svg>
                  Watchlist
                </div>
                <div className='border-b-[1px]'></div>

                <Pops>
                  <PopoverTrigger>
                    {' '}
                    <div className='flex justify-start items-center text-center  px-4 py-2 my-2'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='orange'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='orange'
                        className='size-5 mr-2'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
                        />
                      </svg>
                      Your Rating
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className='bg-blue-950 inline-block p-3 rounded-xl shadow-sm translate-x-20'>
                      <div className='text-white text-sm'>Rated on {date}</div>
                      <div className='flex justify-start items-center text-center'>
                        <svg
                          onClick={handleDeletedRatingMovies}
                          xmlns='http://www.w3.org/2000/svg'
                          fill='#fff'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='#000'
                          className='size-6 mr-2'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                          />
                        </svg>
                        <InputStar initialRating={voteRate} id={movie_id as number} />
                      </div>
                    </div>
                  </PopoverContent>
                </Pops>
              </div>
            </PopoverContent>
          </Pops>
        </div>
      </div>
      <Link
        to={`/${mediaType}/${generateNameId({ name: (dataTrending.original_name as string) || (dataTrending.original_title as string), id: dataTrending.id as number })}`}
      >
        <img
          className={`${CustomIMG} h-full w-full object-cover`}
          src={
            dataTrending.poster_path == null
              ? 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
              : `${configBase.imageBaseUrl}${dataTrending.poster_path}`
          }
          alt={dataTrending.original_name || dataTrending.original_title}
        />
      </Link>
      {isShow && (
        <div className='absolute bottom-2 left-2 w-12 h-12'>
          <svg className='w-full h-full' viewBox='0 0 40 40'>
            <circle
              className='text-gray-700'
              strokeWidth='3'
              stroke='currentColor'
              fill='black'
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
          </svg>
          <div className='absolute inset-0 flex items-center justify-center'>
            <span className={`text-xs font-bold ${typeText}`}>{percentage > 0 ? `${percentage}%` : 'NR'}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default RenderMovies
