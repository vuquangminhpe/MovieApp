import { DiscoverApi } from '@/Apis/DiscoverApi'
import { ListApi } from '@/Apis/ListApi'
import configBase from '@/constants/config'
import path from '@/constants/path'
import { MovieTrendings } from '@/types/Movie'
import { TVSeries, TVSeriesTrending } from '@/types/TVSeries.type'
import { generateNameId, getIdFromNameId } from '@/utils/utils'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

export default function KeyWordsMovie_TV_All() {
  const observerRef = useRef<IntersectionObserver>()
  const location = useLocation()
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)

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
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: [location.pathname, KeyWordsID],
    queryFn: async ({ pageParam = 1 }) => {
      const result = getApiFunction()({
        page: pageParam,
        language: 'en-US',
        with_keywords: KeyWordsID
      })
      return result
    },
    getNextPageParam: (lastPage) => {
      if (loading && Number(lastPage.data.page) < 5) {
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
  console.log(allMovies)

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
            {countMovies as unknown as number} {location.pathname.includes('/movie') ? ' movies' : ' shows'}
          </div>
        </div>

        <div className='mt-6 px-12'>
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
                    <div className='font-bold'>{itemMovie?.original_title}</div>
                    <div className='text-gray-400'>({itemMovie?.original_title})</div>
                  </div>
                  <div className='text-gray-500'>{itemMovie?.release_date}</div>
                  <div className='mt-7'>{itemMovie?.overview}</div>
                </div>
              </Link>
            ))}
        </div>
        <div className='mt-6 px-12'>
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
                    <div className='font-bold'>{itemMovie?.name}</div>
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
