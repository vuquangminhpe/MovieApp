import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import UseFilteredMovies from '../MovieList/UseFilteredMovies'
import { MovieTrendings } from '@/types/Movie'
import { AccountApi_V4 } from '@/Apis/AccountApi_V4'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion'
import { cn } from '@/lib/utils'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { Button } from '@/Components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import useQueryConfig from '@/hooks/useQueryConfig'
import configBase from '@/constants/config'
import InputStar from '@/Components/Custom/InputStar'
import { TVSeries } from '@/types/TVSeries.type'
import DetailsMovieApi from '@/Apis/DetailsMovieApi'
import { TVSeriesApi } from '@/Apis/TVSeriesApi'

import { toast } from 'react-toastify'
import { AccountApi } from '@/Apis/AccountApi'
import Skeleton from '@/Skeleton/Skeleton'
import { useLanguage } from '@/Contexts/app.context'
import { ActionListV3Api } from '@/Apis/ActionListV3Api'
import HelMet from '@/Components/Custom/HelMet'

const filterSort = [
  { value: 'popularity.desc', label: 'Popularity Descending' },
  { value: 'popularity.asc', label: 'Popularity Ascending' },
  { value: 'vote_average.desc', label: 'Rating Descending' },
  { value: 'vote_average.asc', label: 'Rating Ascending' },
  { value: 'release_date.desc', label: 'Release Date Descending' },
  { value: 'release_date.asc', label: 'Release Date Ascending' }
]
const radius = 18
const circumference = 2 * Math.PI * radius
export default function UserActionAll() {
  const [listsByItem, setListsByItem] = useState({})
  const { language } = useLanguage()
  const [loading, setLoading] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setQueryParams } = useQueryConfig()
  const [idRating, setIdRating] = useState<number>()

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const observerRef = useRef<IntersectionObserver>()
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  const getApiFunction = useCallback(() => {
    switch (true) {
      case pathname.includes('u/minhDevFE120304/lists'):
        return AccountApi_V4.getListAll
      case pathname.includes('u/minhDevFE120304/favorite/movie'):
        return AccountApi_V4.getFavoriteMovies
      case pathname.includes('u/minhDevFE120304/favorite/tv'):
        return AccountApi_V4.getFavoriteTV
      case pathname.includes('u/minhDevFE120304/rating/movie'):
        return AccountApi_V4.getRatedMovie
      case pathname.includes('u/minhDevFE120304/rating/tv'):
        return AccountApi_V4.getRatedTV
      case pathname.includes('u/minhDevFE120304/watchlists/movie'):
        return AccountApi_V4.getWatchListMovie
      case pathname.includes('u/minhDevFE120304/watchlists/tv'):
        return AccountApi_V4.getWatchListTV
      case pathname.includes('u/minhDevFE120304/recommendations/movie'):
        return AccountApi_V4.getRecommendationsMovie
      case pathname.includes('u/minhDevFE120304/recommendations/tv'):
        return AccountApi_V4.getRecommendationsTV
      default:
        return AccountApi_V4.getFavoriteMovies
    }
  }, [pathname])
  const getAPIRating = useCallback(() => {
    switch (true) {
      case pathname.includes('/movie'):
        return DetailsMovieApi.deleteRating
      case pathname.includes('/tv'):
        return TVSeriesApi.DeletedRatingTV
      default:
        return DetailsMovieApi.deleteRating
    }
  }, [pathname])
  const getRating = useCallback(() => {
    switch (true) {
      case pathname.includes('/movie'):
        return DetailsMovieApi.getAccount_States
      case pathname.includes('/tv'):
        return TVSeriesApi.GetAccountStates
      default:
        return DetailsMovieApi.getAccount_States
    }
  }, [pathname])

  const addFavoriteMutation = useMutation({
    mutationFn: () =>
      AccountApi.addFavorite({
        media_id: idRating as number,
        media_type: pathname.split('/')[4],
        favorite: true
      })
  })
  const addWatchListMutation = useMutation({
    mutationFn: () =>
      AccountApi.addWatchList({
        media_id: idRating as number,
        media_type: pathname.split('/')[4],
        watchlist: true
      })
  })

  const {
    data: PopularData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch
  } = useInfiniteQuery({
    queryKey: [pathname],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getApiFunction()({
        page: pageParam,
        language: language
      })
      return result
    },
    getNextPageParam: (lastPage) => {
      if (loading && lastPage.data.page < lastPage.data.total_pages) {
        return Number(lastPage.data.page) + 1
      }
      return undefined
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000
  })

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  )

  useEffect(() => {
    const element = loadMoreRef.current

    if (element) {
      observerRef.current = new IntersectionObserver(handleObserver, {
        threshold: 0.8
      })

      observerRef.current.observe(element)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleObserver])
  useEffect(() => {
    setLoading(false)
    setQueryParams({ sort: undefined })
  }, [pathname])
  const allMovies = useMemo(
    () => PopularData?.pages.flatMap((page) => page.data.results as MovieTrendings | readonly MovieTrendings[]) ?? [],
    [PopularData]
  )
  const deletedRatingMutation = useMutation({
    mutationFn: () => getAPIRating()(Number(idRating))
  })
  const handleDeletedRating = () => {
    deletedRatingMutation.mutate(undefined, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: (data: any) => {
        toast.success(`${data.data.status_message}`)
      },
      onError: (error: Error) => {
        toast.error(`${error.message}`)
      }
    })
  }
  const { data: dataRatingAll, isLoading: dataRatingAllLoading } = useQuery({
    queryKey: ['dataRatingAll', idRating],
    queryFn: () => getRating()(idRating as number)
  })
  const dataRating_ITEM = dataRatingAll?.data

  const filteredMovies = UseFilteredMovies(allMovies)

  useEffect(() => {
    refetch()
  }, [language])
  const persentPrint = (circumferences: number, percentages: number, colorAdjust: string) => {
    return (
      <div className='w-12 h-12'>
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
            stroke={colorAdjust}
            fill='transparent'
            r={radius}
            cx='20'
            cy='20'
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumferences,
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%'
            }}
          />
        </svg>
        <div className='-translate-y-8 z-50 text-white flex items-center justify-center'>
          <span className={`text-xs font-bold `}>{percentages > 0 ? `${percentages * 10}%` : 'NR'}</span>
        </div>
      </div>
    )
  }
  const dataPersent = (vote: number) => {
    let colorLiker = '#4CAF50'

    if (vote <= 6 && vote >= 3) {
      colorLiker = '#b9d13f'
    } else if (vote < 3) {
      colorLiker = '#ed2133'
    }
    const Circumference = circumference - (vote / 10) * circumference

    return persentPrint(Circumference, vote, colorLiker)
  }
  const handleAddFavorite = () => {
    addFavoriteMutation.mutate(undefined, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: (data: any) => {
        toast.success(`${data.data.status_message}`)
      },
      onError: (error: Error) => {
        toast.error(`${error.message}`)
      }
    })
  }
  const handleAddWatchList = () => {
    addWatchListMutation.mutate(undefined, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: (data: any) => {
        toast.success(`${data.data.status_message}`)
      },
      onError: (error: Error) => {
        toast.error(`${error.message}`)
      }
    })
  }
  const handleAddMovieOrTV = useMutation({
    mutationFn: (list_id: number) => ActionListV3Api.addMovie(Number(list_id), { media_id: idRating as number })
  })
  const { data, isLoading: dataListLoading } = useQuery({
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
  const handleAddList = (list_id: number) => {
    handleAddMovieOrTV.mutate(list_id, {
      onSuccess: (data) => {
        toast.success(`${data.data.status_message}`)
      },
      onError: (error: Error) => {
        toast.error(`${error}`)
      }
    })
  }
  if ((dataRatingAllLoading && isLoading) || dataListLoading) {
    return <Skeleton />
  }
  return (
    <div className='mt-5 flex flex-col'>
      <HelMet title='All list in User' />
      <div className='flex justify-around'>
        <div className='flex gap-4 max-sm:flex-col items-center'>
          <div className='mb-12  -translate-x-10 capitalize font-bold text-xl'>my {pathname.split('/')[3]}</div>
          <div className='flex gap-3'>
            <NavLink
              to={`/${pathname.split('/').slice(1, 4).join('/')}/movie`}
              className={({ isActive }) =>
                `flex justify-between p-3 gap-3 ${isActive ? 'border-b-4 border-emerald-600 text-black font-bold' : ''}`
              }
            >
              Movie
            </NavLink>
            <NavLink
              to={`/${pathname.split('/').slice(1, 4).join('/')}/tv`}
              className={({ isActive }) =>
                `flex justify-between p-3 gap-3 ${isActive ? 'border-b-4 border-emerald-600 text-black font-bold' : ''}`
              }
            >
              TV
            </NavLink>
          </div>
        </div>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger>
              <div className='font-semibold text-sm px-3'>Sort</div>
            </AccordionTrigger>
            <AccordionContent>
              <div className='border-t-[1px] border-gray-200'></div>
              <div className='mt-2 capitalize text-sm px-3'>sort results by</div>
              <div className='p-2'>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger className='max-md:w-full' asChild>
                    <Button
                      variant='outline'
                      role='combobox'
                      aria-expanded={open}
                      className='w-[200px] justify-between'
                    >
                      {value ? filterSort.find((item) => item.value === value)?.label : 'Select sort...'}
                      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-[200px] p-0'>
                    <Command>
                      <CommandInput placeholder='Search sort...' />
                      <CommandList>
                        <CommandEmpty>Sort found.</CommandEmpty>
                        <CommandGroup>
                          {filterSort.map((item) => (
                            <CommandItem
                              key={item.value}
                              value={item.value}
                              onSelect={(currentValue) => {
                                setQueryParams({ sort: currentValue })
                                setValue(currentValue === value ? '' : currentValue)
                                setOpen(false)
                              }}
                            >
                              <Check
                                className={cn('mr-2 h-4 w-4', value === item.value ? 'opacity-100' : 'opacity-0')}
                              />
                              {item.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className='w-full container mt-12 flex flex-col'>
        {filteredMovies?.map((itemMovies: MovieTrendings | TVSeries) => (
          <div
            className='w-full max-sm:flex-col border border-gray-200 rounded-xl flex gap-2 shadow-xl mb-4'
            key={itemMovies?.id}
            onClick={() => setIdRating(itemMovies?.id)}
          >
            <img
              className='max-w-[200px] h-[230px] max-sm:max-w-full max-sm:rounded-xl object-cover rounded-l-xl shadow-xl object-center'
              src={`${configBase.imageBaseUrl}${itemMovies?.backdrop_path}`}
              alt=''
            />
            <div className='flex flex-col'>
              <div className='flex gap-3'>
                <div className='mt-3 ml-2 translate-x-1'>{dataPersent(Math.round(itemMovies?.vote_average))}</div>
                <div className='flex flex-col'>
                  <div className='text-black font-bold my-2'>
                    {(itemMovies as MovieTrendings)?.title || itemMovies?.name}
                  </div>
                  <div className='text-gray-400'>
                    {(itemMovies as MovieTrendings)?.release_date || itemMovies?.first_air_date}
                  </div>
                  <div className='-translate-x-16 mt-3'>{itemMovies?.overview}</div>
                  <div className=' flex gap-3'>
                    <Popover>
                      <PopoverTrigger className='flex gap-3 items-center -translate-x-16 mt-4'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='size-5 border border-gray-400 rounded-full'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
                          />
                        </svg>

                        <div>Rate it!</div>
                      </PopoverTrigger>
                      <PopoverContent className='bg-blue-950 flex gap-6 items-center'>
                        <div
                          onClick={handleDeletedRating}
                          className='text-white text-sm cursor-pointer rounded-sm hover:text-black hover:bg-blue-700 text-center items-center capitalize font-bold bg-gray-400/60'
                        >
                          Clear rating?{' '}
                        </div>
                        <div className='cursor-pointer'>
                          <InputStar
                            pathName={pathname}
                            initialRating={dataRating_ITEM?.rated.value}
                            id={itemMovies?.id}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    {pathname.includes('favorite') ? (
                      <div onClick={handleAddFavorite} className='flex gap-3 items-center -translate-x-16 mt-4'>
                        {' '}
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='size-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                          />
                        </svg>
                        <div>Favorite</div>
                      </div>
                    ) : (
                      <div onClick={handleAddWatchList} className='flex gap-3 items-center -translate-x-16 mt-4'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='size-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                          />
                        </svg>

                        <div>WatchList</div>
                      </div>
                    )}
                    <Popover>
                      <PopoverTrigger className='flex gap-3 items-center -translate-x-16 mt-4'>
                        <Button
                          variant='outline'
                          role='combobox'
                          aria-expanded={open}
                          className='justify-between w-full'
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
                              d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
                            />
                          </svg>
                          Add List
                          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-[200px] p-0'>
                        <Command>
                          <CommandInput placeholder='Search List...' className='h-9' />
                          <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {frameworks?.map((framework) => (
                                <CommandItem
                                  key={framework.id}
                                  value={framework.value}
                                  onSelect={(currentValue) => {
                                    setValue(currentValue)
                                    const selectedId = getSelectedId()
                                    handleAddList(Number(selectedId))
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
                      </PopoverContent>{' '}
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredMovies.length > 14 && (
        <div ref={loadMoreRef} className='w-full my-12 py-4 text-center flex justify-center items-center'>
          <div
            onClick={() => setLoading(true)}
            className={`text-white font-semibold cursor-pointer leading-7 capitalize h-8 bg-blue-400/90 w-80 items-center rounded-xl shadow-xl text-center ${loading ? 'hidden' : 'inline-block'}`}
          >
            load more video ?
          </div>

          {isFetchingNextPage ? (
            <div className='flex justify-center'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
            </div>
          ) : hasNextPage ? (
            <div className='text-gray-500 '>Scroll for more movies...</div>
          ) : (
            loading && <div className='text-gray-500'>No more movies to load</div>
          )}
        </div>
      )}
    </div>
  )
}
