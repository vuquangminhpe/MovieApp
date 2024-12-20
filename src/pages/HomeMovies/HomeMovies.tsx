import { useQuery, useQueryClient } from '@tanstack/react-query'
import MovieTrending from './MovieTrending'
import { ListApi } from '../../Apis/ListApi'
import MouseAnimate from '../../Components/Custom/MouseAnimate'
import PopularMovie from './PopularMovie/LeaderBroad'
import { useEffect, useState } from 'react'
import MovieTrailer from './MovieTrailer'
import { Movie, MovieTrendings } from '@/types/Movie'
import { AccountApi } from '@/Apis/AccountApi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from '@/constants/path'
import SkeletonLoading from '@/Skeleton'
import { useLanguage } from '@/Contexts/app.context'
import HelMet from '@/Components/Custom/HelMet'

export default function HomeMovies() {
  const { language } = useLanguage()

  const navigate = useNavigate()
  const [movieId, setMovieId] = useState<number>()
  const queryClient = useQueryClient()

  const [trendingMovie, setTrendingMovie] = useState<string>('day')
  const [mouseHoverImages, setMouseHoverImages] = useState(
    'https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/SqAZjEqqBAYvyu3KSrWq1d0QLB.jpg'
  )
  const { data: dataRated, refetch } = useQuery({
    queryKey: ['dataTrending', trendingMovie, language],
    queryFn: () => ListApi.TrendingDataMovie(`${trendingMovie}`, { language: language as string }),
    staleTime: 0,
    refetchOnWindowFocus: false
  })
  const dataTrending = dataRated?.data.results

  const { data: dataTrailer } = useQuery({
    queryKey: ['dataTrailerLatest', language],
    queryFn: () =>
      ListApi.UpcomingList({
        language: language as string
      }),
    staleTime: 0,
    refetchOnWindowFocus: false
  })

  const dataTrailerLatest = dataTrailer?.data.results
  const { data: dataPopular } = useQuery({
    queryKey: ['dataPopularList', language],
    queryFn: () =>
      ListApi.PopularList({
        language: language as string
      }),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  })

  const dataPopulars = dataPopular?.data.results

  const { data: dataRatedMovies } = useQuery({
    queryKey: ['dataRatedMovies_popular'],
    queryFn: AccountApi.getRatedMoviesAccount,
    staleTime: 0,
    refetchOnWindowFocus: false
  })
  useEffect(() => {
    const handleLoad = () => {
      queryClient.invalidateQueries({ queryKey: ['dataTrending'] })
      queryClient.invalidateQueries({ queryKey: ['dataTrailerLatest'] })
      queryClient.invalidateQueries({ queryKey: ['dataPopularList'] })
      queryClient.invalidateQueries({ queryKey: ['dataRatedMovies_popular'] })
    }

    window.addEventListener('load', handleLoad)

    return () => {
      window.removeEventListener('load', handleLoad)
    }
  }, [language, queryClient])
  const dataRateds = dataRatedMovies?.data.results
  const extendedDataRated = dataRateds?.find((item: MovieTrendings) => (item.id as number | undefined) === movieId)
  if (!dataPopulars && !dataRateds && !extendedDataRated) {
    return <SkeletonLoading />
  }
  return (
    <div className='flex flex-col'>
      <HelMet title='Home Movie' />
      <div className='relative h-[350px] max-sm:h-[600px] overflow-hidden'>
        <MouseAnimate className='h-full object-contain z-10' />

        <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-20'></div>

        <img
          className='absolute inset-0 w-full h-full object-cover z-0'
          src={
            'https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/SqAZjEqqBAYvyu3KSrWq1d0QLB.jpg'
          }
          alt='Background'
        />

        <div className='relative z-30 flex flex-col h-full justify-center items-start p-11'>
          <h1 className='text-[40px] text-white mb-6'>
            <div className='font-bold'>Welcome.</div>
            Millions of movies, TV shows and people to discover. Explore now.
          </h1>
          <div className='w-full max-w-[80%] relative'>
            <input
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate({
                    pathname: path.searchAll,
                    search: createSearchParams({ query: e.currentTarget.value }).toString()
                  })
                }
              }}
              type='text'
              placeholder='Search for movie, tv show, person ...'
              className='w-full h-11 rounded-xl pl-4 pr-24'
            />
            <button className='absolute right-0 top-0 text-white h-11 px-4 rounded-r-xl bg-gradient-to-r from-green-400 to-blue-400/90'>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className='container w-full'>
        <Tabs defaultValue='MV_TD' className='w-full mt-6'>
          <TabsContent value='MV_TD'>
            <Tabs defaultValue='MV_TD_DAY'>
              <TabsList>
                <TabsTrigger
                  value='MV_TD_DAY'
                  onClick={() => {
                    setTrendingMovie('day')
                    refetch()
                  }}
                >
                  Movie Trending Day
                </TabsTrigger>
                <TabsTrigger
                  value='MV_TD_WEEK'
                  onClick={() => {
                    setTrendingMovie('week')
                    refetch()
                  }}
                >
                  Movie Trending Week
                </TabsTrigger>
              </TabsList>
              <TabsContent value='MV_TD_DAY'>
                <MovieTrending
                  setMovieId={setMovieId}
                  rating={extendedDataRated?.rating as number}
                  dataMoviesTrending={dataTrending}
                />
              </TabsContent>
              <TabsContent value='MV_TD_WEEK'>
                <div>
                  {' '}
                  <MovieTrending
                    setMovieId={setMovieId}
                    rating={extendedDataRated?.rating as number}
                    dataMoviesTrending={dataTrending}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value='TV_TD'>
            <Tabs defaultValue='MV_TD_DAY'>
              <TabsList>
                <TabsTrigger
                  value='MV_TD_DAY'
                  onClick={() => {
                    setTrendingMovie('day')
                    refetch()
                  }}
                >
                  Movie Trending Day
                </TabsTrigger>
                <TabsTrigger
                  value='MV_TD_WEEK'
                  onClick={() => {
                    setTrendingMovie('week')
                    refetch()
                  }}
                >
                  Movie Trending Week
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </TabsContent>
        </Tabs>
        <div className=' relative rounded-xl shadow-sm w-full'>
          <img
            src={mouseHoverImages}
            alt=''
            className='absolute h-[400px] opacity-80 object-center w-full object-cover'
          />
          <MovieTrailer setMouseHoverImages={setMouseHoverImages} dataPopulars={dataTrailerLatest} />
        </div>
        <PopularMovie
          setMovieId={setMovieId}
          rating={extendedDataRated?.rating as number}
          dataPopulars={dataPopulars as Movie[] | undefined}
        />
      </div>
    </div>
  )
}
