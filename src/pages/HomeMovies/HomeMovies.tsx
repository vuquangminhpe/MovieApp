import { useQuery } from '@tanstack/react-query'
import MovieTrending from './MovieTrending'
import { ListApi } from '../../Apis/ListApi'
import MouseAnimate from '../../Components/MouseAnimate'
import PopularMovie from './PopularMovie/LeaderBroad'
import { useEffect, useState } from 'react'
import MovieTrailer from './MovieTrailer'

export default function HomeMovies() {
  const [mouseHoverImages, setMouseHoverImages] = useState(
    'https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/SqAZjEqqBAYvyu3KSrWq1d0QLB.jpg'
  )
  const { data: dataRated } = useQuery({ queryKey: ['dataTrending', []], queryFn: ListApi.TrendingData })
  const dataTrending = dataRated?.data.results
  const { data: dataTrailer } = useQuery({ queryKey: ['dataTrailerLatest', []], queryFn: ListApi.UpcomingList })
  const dataTrailerLatest = dataTrailer?.data.results
  const { data: dataPopular } = useQuery({ queryKey: ['dataPopularList', []], queryFn: ListApi.PopularList })
  const dataPopulars = dataPopular?.data.results
  const { data: dataLatest } = useQuery({ queryKey: ['dataLatest'], queryFn: ListApi.getTVLatest })

  useEffect(() => {}, [mouseHoverImages])

  return (
    <div className='flex flex-col'>
      <div className='relative h-[350px] max-sm:h-[600px] overflow-hidden'>
        <MouseAnimate className='absolute inset-0 z-10' />

        <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-20'></div>

        <img
          className='absolute inset-0 w-full h-full object-cover z-0'
          src={
            dataLatest?.data.poster_path !== null
              ? dataLatest?.data.poster_path
              : 'https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/SqAZjEqqBAYvyu3KSrWq1d0QLB.jpg'
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
        {' '}
        <MovieTrending dataMoviesTrending={dataTrending} />
        <div className=' relative rounded-xl shadow-sm w-full'>
          <img
            src={mouseHoverImages}
            alt=''
            className='absolute h-[400px] opacity-80 object-center w-full object-cover'
          />
          <MovieTrailer setMouseHoverImages={setMouseHoverImages} dataPopulars={dataTrailerLatest} />
        </div>
        <PopularMovie dataPopulars={dataPopulars} />
      </div>
    </div>
  )
}
