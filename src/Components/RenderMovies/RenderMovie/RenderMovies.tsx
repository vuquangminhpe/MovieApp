/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from 'react-router-dom'
import configBase from '../../../constants/config'
import { Movie, MovieTrendings } from '../../../types/Movie'
import { generateNameId } from '../../../utils/utils'

import InputStar from '@/Components/Custom/InputStar'
import { Popover as Pops, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { useMutation, useQuery } from '@tanstack/react-query'
import DetailsMovieApi from '@/Apis/DetailsMovieApi'
import { SuccessResponse } from '@/types/utils.type'
import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { useState } from 'react'
import * as React from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Button } from '@/Components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/ui/command'
import { AccountApi } from '@/Apis/AccountApi'
import { AccountApi_V4 } from '@/Apis/AccountApi_V4'
import { ActionListV3Api } from '@/Apis/ActionListV3Api'
import Skeleton from '@/Skeleton/Skeleton'
import { TVSeriesApi } from '@/Apis/TVSeriesApi'
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
  isActive?: boolean
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
  media_type,
  isActive = true
}: RenderMoviesProps) => {
  const [mediaType, setMediaType] = useState<string>(media_type as string)
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const percentage = Math.round((dataTrending as MovieTrendings).vote_average * 10)
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  const deletedRatingMutation = useMutation({ mutationFn: () => DetailsMovieApi.deleteRating(movie_id) })
  const deletedRatingMutationTV = useMutation({ mutationFn: () => TVSeriesApi.DeletedRatingTV(movie_id) })

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['dataList'],
    queryFn: async () => {
      const firstPage = (await AccountApi_V4.getListAll({ page: 1 })) as unknown as any
      const totalPages = firstPage.total_pages

      if (totalPages === 1) {
        return firstPage.data.results
      }

      const promises = Array.from({ length: totalPages - 1 }, (_, index) =>
        AccountApi_V4.getListAll({ page: index + 2 })
      )

      const otherPages = await Promise.all(promises)

      const allData = [...firstPage.data.results, ...otherPages.flatMap((page) => page.data.results)]

      return allData
    }
  })

  const dataMyList = data

  if (percentage <= 60 && percentage >= 30) {
    colorLiker = '#b9d13f'
  } else if (percentage < 30) {
    colorLiker = '#ed2133'
  }
  const addFavoriteMutation = useMutation({
    mutationFn: () =>
      AccountApi.addFavorite({
        media_id: movie_id,
        media_type: mediaType,
        favorite: true
      })
  })
  const addWatchListMutation = useMutation({
    mutationFn: () =>
      AccountApi.addWatchList({
        media_id: movie_id,
        media_type: mediaType,
        watchlist: true
      })
  })
  const date = new Date().toLocaleDateString('en-US')
  const handleDeletedRatingMovies = () => {
    if (mediaType === 'movie') {
      deletedRatingMutation.mutate(undefined, {
        onSuccess: (data: AxiosResponse<SuccessResponse<{ status_message: string }>>) => {
          toast.success(`${data.data.status_message}`)
        },
        onError: (error: Error) => {
          toast.error(`${error.message}`)
        }
      })
    } else if (mediaType === 'tv') {
      deletedRatingMutationTV.mutate(undefined, {
        onSuccess: (data: AxiosResponse<SuccessResponse<{ status_message: string }>>) => {
          toast.success(`${data.data.status_message}`)
        },
        onError: (error: Error) => {
          toast.error(`${error.message}`)
        }
      })
    }
  }
  const frameworks = Array.isArray(dataMyList)
    ? dataMyList.map((item: any) => ({
        id: item.id,
        value: `${item.name}-${item.id}`,
        label: `${item.name} (${item.number_of_items} items)`,
        displayName: item.name
      }))
    : []

  const getSelectedId = () => {
    const selected = frameworks?.find((framework) => framework.value === value)
    return selected?.id
  }
  const handleAddMovieOrTV = useMutation({
    mutationFn: (list_id: number) => ActionListV3Api.addMovie(Number(list_id), { media_id: movie_id })
  })
  const handleAddFavorite = () => {
    addFavoriteMutation.mutate(undefined, {
      onSuccess: (data) => {
        toast.success(`${data.data.status_message}`, {
          delay: 8000
        })
      },
      onError: (error: Error) => {
        toast.error(`${error.message}`)
      }
    })
  }
  const handleWatchList = () => {
    addWatchListMutation.mutate(undefined, {
      onSuccess: (data) => {
        toast.success(`${data.data.status_message}`, {
          delay: 8000
        })
      },
      onError: (error: Error) => {
        toast.error(`${error.message}`)
      }
    })
  }
  const handleAddList = async (list_id: number) => {
    handleAddMovieOrTV.mutateAsync(list_id, {
      onSuccess: (data) => {
        toast.success(`${data.data.status_message}`)
      },
      onError: () => {
        toast.error(`Can't rate the ${mediaType} at this point.`)
      }
    })
  }

  if (isLoading || isFetching) {
    return <Skeleton />
  }
  return (
    <div
      className={`${configWidth_Height} bg-gradient-to-b from-blue-900 to-black rounded-xl overflow-hidden shadow-lg relative`}
    >
      <div className='absolute top-2 right-2 z-10'>
        <div className='w-6 h-6 flex items-center justify-center cursor-pointer'>
          {isActive && (
            <Pops>
              <PopoverTrigger>
                {' '}
                <span onClick={() => setMovieId(movie_id)} className='text-black bg-gray-400/60 rounded-full text-xl'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-6 text-black bg-gray-400/60 rounded-full text-xl'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                    />
                  </svg>
                </span>
              </PopoverTrigger>
              <PopoverContent className='w-56'>
                <div className='max-w-56  bg-white h-auto shadow-xl rounded-sm'>
                  <Pops open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button variant='outline' role='combobox' aria-expanded={open} className='justify-between w-full'>
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

                        {value && frameworks
                          ? frameworks.find((framework) => framework.value === value)?.label
                          : 'Add List...'}
                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[200px] translate-x-[220px] -translate-y-[36px] p-0'>
                      <Command>
                        <CommandInput placeholder='Search List...' className='h-9' />
                        <CommandList>
                          <CommandEmpty>No list found.</CommandEmpty>
                          <CommandGroup>
                            {frameworks?.map((framework) => (
                              <CommandItem
                                key={framework.id}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                  setValue(currentValue)
                                  const selectedId = getSelectedId()
                                  console.log(selectedId)
                                  console.log(currentValue)
                                  const selectedIDs = currentValue.split('-')[1]
                                  console.log(selectedIDs)

                                  handleAddList(Number(selectedIDs))
                                  setOpen(false)
                                }}
                              >
                                {framework.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    value === framework.value ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Pops>

                  <div className='border-b-[1px]'></div>
                  <div
                    onClick={handleAddFavorite}
                    className='flex justify-start items-center text-center  px-4 py-2 my-2'
                  >
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
                  <div
                    onClick={handleWatchList}
                    className='flex justify-start items-center text-center  px-4 py-2 my-2'
                  >
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
                          <InputStar pathName={`${mediaType}`} initialRating={voteRate} id={movie_id as number} />
                        </div>
                      </div>
                    </PopoverContent>
                  </Pops>
                </div>
              </PopoverContent>
            </Pops>
          )}
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
