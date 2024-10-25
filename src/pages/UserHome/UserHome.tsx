import { AccountApi_V4 } from '@/Apis/AccountApi_V4'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import UseFilteredMovies from '../MovieList/UseFilteredMovies'
import { MovieTrendings } from '@/types/Movie'

export default function UserHome() {
  const [loading, setLoading] = useState(false)

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
      default:
        return
    }
  }, [pathname])

  const {
    data: PopularData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: [pathname],
    queryFn: async ({ pageParam = 1 }) => {
      const apiFunction = getApiFunction()
      if (apiFunction) {
        return apiFunction({ page: pageParam })
      }
      throw new Error('No API function matched the pathname')
    },
    getNextPageParam: (lastPage) => {
      if (loading && Number(lastPage.data.page) < 2) {
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

  const allMovies = useMemo(
    () => PopularData?.pages.flatMap((page) => page.data as MovieTrendings | readonly MovieTrendings[]) ?? [],
    [PopularData]
  )
  const filteredMovies = UseFilteredMovies(allMovies)
  console.log(allMovies)

  return (
    <div>
      <div className='p-2'>{filteredMovies?.map((item) => <div key={item.id}>{item?.name}</div>)}</div>
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
  )
}
