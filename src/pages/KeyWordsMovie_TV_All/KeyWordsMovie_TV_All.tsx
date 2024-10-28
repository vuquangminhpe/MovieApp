import { DiscoverApi } from '@/Apis/DiscoverApi'
import { ListApi } from '@/Apis/ListApi'
import configBase from '@/constants/config'
import path from '@/constants/path'
import { MovieTrendings } from '@/types/Movie'
import { TVSeries } from '@/types/TVSeries.type'
import { generateNameId, getIdFromNameId } from '@/utils/utils'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createSearchParams, Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover'
import { SortBy, SortBy_TV } from '@/types/Discover.type'
import Skeleton from '@/Skeleton/Skeleton'
const SortKeyWords_Movie = [
  {
    name_Parent: 'Popularity',
    contain: [
      { name: 'popularity.asc', label: 'Ascending' },
      { name: 'popularity.desc', label: 'Descending' }
    ]
  },
  {
    name_Parent: 'Rating',
    contain: [
      { name: 'vote_average.asc', label: 'Ascending' },
      { name: 'vote_average.desc', label: 'Descending' }
    ]
  },
  {
    name_Parent: 'Release Date',
    contain: [
      { name: 'primary_release_date.asc', label: 'Ascending' },
      { name: 'primary_release_date.desc', label: 'Descending' }
    ]
  }
]
const SortKeyWords_TV = [
  {
    name_Parent: 'Popularity',
    contain: [
      { name: 'popularity.asc', label: 'Ascending' },
      { name: 'popularity.desc', label: 'Descending' }
    ]
  },
  {
    name_Parent: 'Rating',
    contain: [
      { name: 'vote_average.asc', label: 'Ascending' },
      { name: 'vote_average.desc', label: 'Descending' }
    ]
  },
  {
    name_Parent: 'Release Date',
    contain: [
      { name: 'first_air_date.asc', label: 'Ascending' },
      { name: 'first_air_date.desc', label: 'Descending' }
    ]
  }
]
export default function KeyWordsMovie_TV_All() {
  const observerRef = useRef<IntersectionObserver>()

  const location = useLocation()
  const [sortBy, setSortBy] = useState<SortBy | SortBy_TV | string>('')
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [locationValue, setLocationValue] = useState<string>(location.pathname.split('/')[3])

  const { keyword_id } = useParams()
  const KeyWordsID = getIdFromNameId(keyword_id as string)

  const nameKeyWord = keyword_id
    ?.slice(KeyWordsID.length, keyword_id.length as number)
    .split('-')
    .join(' ')
  const getApiFunction = useCallback(() => {
    switch (true) {
      case location.pathname.includes('/movie'):
        return DiscoverApi.getListDiscover_Movie
      case location.pathname.includes('/tv'):
        return DiscoverApi.getListDiscoverTV
      default:
        return ListApi.DataRated
    }
  }, [location.pathname])

  const {
    data: dataDiscover_Movie,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteQuery({
    queryKey: [location.pathname, KeyWordsID, sortBy],
    queryFn: async ({ pageParam = 1 }) => {
      const result = getApiFunction()({
        page: pageParam,
        language: 'en-US',
        with_keywords: KeyWordsID,
        sort_by: sortBy || 'popularity.desc'
      })
      return result
    },
    getNextPageParam: (lastPage) => {
      if (loading && Number(lastPage.data.page) < 20) {
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

  const countMovies = useMemo(
    () =>
      dataDiscover_Movie?.pages.flatMap(
        (page) => page.data.total_results as MovieTrendings | readonly MovieTrendings[] | TVSeries | readonly TVSeries[]
      ) ?? [],
    [dataDiscover_Movie]
  )

  const allMovies = useMemo(
    () =>
      dataDiscover_Movie?.pages.flatMap(
        (page) => page.data.results as MovieTrendings | readonly MovieTrendings[] | TVSeries | readonly TVSeries[]
      ) ?? [],
    [dataDiscover_Movie]
  )

  const handleSortby = (valueSort: SortBy | SortBy_TV | string) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        sort_by: valueSort
      }).toString()
    })
    setSortBy(valueSort)
  }

  const clearSortBy = () => {
    navigate({ pathname: location.pathname, search: createSearchParams('').toString() })
    setSortBy('')
    setLoading(false)
  }
  if (isLoading) {
    return <Skeleton />
  }
  return (
    <div className='flex flex-grow'>
      <div className='w-full'>
        <img
          src={`https://www.themoviedb.org/assets/2/v4/account_pipes/light_blue-a230b623827400e967c6eb7241d88086f2eb9264c0789d0dab15ae6f1df1421a.svg`}
          alt=''
          className='w-full h-24 object-cover bg-blue-950/90'
        />
        <div className='flex -translate-y-16  justify-between mx-5'>
          <div className='text-white font-bold text-xl capitalize'>{nameKeyWord}</div>
          <div className='text-gray-400 font-bold text-xl'>
            {countMovies[0] as unknown as number[]} {location.pathname.includes('/movie') ? ' movies' : ' shows'}
          </div>
        </div>
        <div className='flex justify-center gap-4'>
          <Popover>
            <PopoverTrigger className='flex rounded-sm items-center shadow-xl bg-blue-950 px-3 py-2 text-white'>
              <div className='capitalize'>{locationValue}</div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
              </svg>
            </PopoverTrigger>
            <PopoverContent>
              <Popover>
                <PopoverTrigger className='flex rounded-sm shadow-xl hover:bg-gray-200 px-3 py-2 text-black w-full'>
                  <NavLink to={`/keyword/${keyword_id}/movie`}>Movie</NavLink>
                </PopoverTrigger>
                <PopoverTrigger className='flex rounded-sm shadow-xl hover:bg-gray-200 px-3 py-2 text-black w-full'>
                  <NavLink to={`/keyword/${keyword_id}/tv`}>TV shows</NavLink>
                </PopoverTrigger>
              </Popover>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger className='flex items-center rounded-sm shadow-xl bg-blue-950 px-3 py-2 text-white'>
              Sort{' '}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
              </svg>
            </PopoverTrigger>
            <PopoverContent>
              {location.pathname.includes('/movie') &&
                SortKeyWords_Movie.map((itemListSort) => (
                  <div key={itemListSort.name_Parent}>
                    <Popover>
                      <PopoverTrigger className='hover:bg-emerald-500 flex items-center rounded-sm shadow-xl  px-3 py-2 text-black w-full'>
                        {itemListSort.name_Parent}
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='size-4 translate-y-[2px]'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                        </svg>
                      </PopoverTrigger>
                      <PopoverContent className='translate-x-[290px] -translate-y-[61px]'>
                        <Popover>
                          <PopoverTrigger className='flex flex-col justify-start w-full'>
                            {itemListSort.contain.map((itemNameParent) => (
                              <div
                                onClick={() => handleSortby(itemNameParent.name)}
                                className='text-black flex gap-3 mt-3 rounded-xl shadow-xl p-2 bg-gray-100 hover:bg-emerald-400 w-full'
                                key={itemNameParent.name}
                              >
                                {itemNameParent.label}
                              </div>
                            ))}
                          </PopoverTrigger>
                        </Popover>
                      </PopoverContent>
                    </Popover>
                  </div>
                ))}
              {location.pathname.includes('/tv') &&
                SortKeyWords_TV.map((itemListSort) => (
                  <div key={itemListSort.name_Parent}>
                    <Popover>
                      <PopoverTrigger className='hover:bg-emerald-500 flex items-center rounded-sm shadow-xl  px-3 py-2 text-black w-full'>
                        {itemListSort.name_Parent}
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='size-4 translate-y-[2px]'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                        </svg>
                      </PopoverTrigger>
                      <PopoverContent className='translate-x-[290px] -translate-y-[61px]'>
                        <Popover>
                          <PopoverTrigger className='flex flex-col justify-start w-full'>
                            {itemListSort.contain.map((itemNameParent) => (
                              <div
                                onClick={() => handleSortby(itemNameParent.name)}
                                className='text-black flex gap-3 mt-3 rounded-xl shadow-xl p-2 bg-gray-100 hover:bg-emerald-400 w-full'
                                key={itemNameParent.name}
                              >
                                {itemNameParent.label}
                              </div>
                            ))}
                          </PopoverTrigger>
                        </Popover>
                      </PopoverContent>
                    </Popover>
                  </div>
                ))}
            </PopoverContent>
          </Popover>
          <div
            className='bg-blue-950 items-center text-center flex p-3 cursor-pointer rounded-sm shadow-xl text-white hover:text-slate-300'
            onClick={clearSortBy}
          >
            Clear Sort
          </div>
        </div>

        <div className='mt-6 px-12 container'>
          {location.pathname.includes('/movie') &&
            (allMovies as MovieTrendings[])?.map((itemMovie: MovieTrendings) => (
              <Link
                to={`${path.movie}/${generateNameId({ name: itemMovie?.original_title as string, id: itemMovie?.id as number })}`}
                key={itemMovie?.id}
                className='w-full flex gap-3 rounded-2xl shadow-black/60 shadow-2xl  my-7'
              >
                <img
                  src={`${configBase.imageBaseUrl}${itemMovie?.backdrop_path}`}
                  alt=''
                  className='w-[100px] h-[150px] rounded-l-xl object-cover '
                />
                <div className='py-2'>
                  <div className='flex text-black gap-2'>
                    <div className='font-bold hover:text-emerald-500'>{itemMovie?.original_title}</div>
                    <div className='text-gray-400'>({itemMovie?.original_title})</div>
                  </div>
                  <div className='text-gray-500'>{itemMovie?.release_date}</div>
                  <div className='mt-7'>{itemMovie?.overview}</div>
                </div>
              </Link>
            ))}
        </div>
        <div className='mt-6 px-12 container'>
          {location.pathname.includes('/tv') &&
            (allMovies as TVSeries[])?.map((itemMovie: TVSeries) => (
              <Link
                to={`${path.OnTvSeries}/${generateNameId({ name: itemMovie?.name as string, id: itemMovie?.id as number })}`}
                key={itemMovie?.id}
                className='w-full flex gap-3 rounded-2xl shadow-black/60 shadow-2xl  my-7'
              >
                <img
                  src={`${configBase.imageBaseUrl}${itemMovie?.poster_path}`}
                  alt=''
                  className='w-[100px] h-[150px] rounded-l-xl object-cover '
                />
                <div className='py-2'>
                  <div className='flex text-black gap-2'>
                    <div className='font-bold hover:text-emerald-500'>{itemMovie?.name}</div>
                    <div className='text-gray-400'>({itemMovie?.original_name})</div>
                  </div>
                  <div className='text-gray-500'>{itemMovie?.first_air_date}</div>
                  <div className='mt-7'>{itemMovie?.overview}</div>
                </div>
              </Link>
            ))}
        </div>
        <div ref={loadMoreRef} className='w-full py-4 text-center flex justify-center items-center'>
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
      </div>
    </div>
  )
}
