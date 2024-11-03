/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from '../../../constants/path'
import Popover from '../../Custom/Popover/Popover'
import icons from '../../../Imgs/nonesp.webp'
import { useQuery } from '@tanstack/react-query'
import { ListApi } from '../../../Apis/ListApi'
import { Movie } from '../../../types/Movie'
import { useState } from 'react'
import { generateNameId } from '@/utils/utils'
import { useLanguage } from '@/Contexts/app.context'
import { setLanguageFromLS } from '@/utils/auth'
export default function Header() {
  const { language, setLanguage } = useLanguage()

  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const navigate = useNavigate()
  const [isMenuOpen_left, setIsMenuOpen_left] = useState(false)
  const [isMenuOpen_right, setIsMenuOpen_right] = useState(false)
  const { data: DataRated } = useQuery({
    queryKey: ['listRated', language],
    queryFn: () =>
      ListApi.DataRated({
        language: language as string
      })
  })

  const dataRatedMovies = DataRated?.data.results
  const toggleMenu_left = () => {
    setIsMenuOpen_left(!isMenuOpen_left)
  }
  const toggleMenu_right = () => {
    setIsMenuOpen_right(!isMenuOpen_right)
  }
  const handleChange = (event: any) => {
    setLanguageFromLS(event.target.value)
    setLanguage(event.target.value)
    setSelectedLanguage(event.target.value)
  }
  const customMenuRight = (customClassName: string) => {
    return (
      <div className={`${customClassName} items-center flex ml-7 mt-1 z-40`}>
        <Popover
          children={`${language === 'vi' ? 'VI' : 'EN'}`}
          className='border border-white w-7 text-center text-white font-bold mx-6 hover:text-black hover:bg-white cursor-pointer'
          renderPopover={
            <div className='w-64 h-26 p-3 bg-white border border-gray-200 shadow-sm rounded-sm'>
              <h2 className='font-bold'>Language Preferences</h2>
              <div>
                <select
                  value={selectedLanguage}
                  onChange={handleChange}
                  className='mt-2 bg-gray-200/90 rounded-sm shadow-sm w-full p-2'
                >
                  <option value='vi'>Tiếng việt</option>
                  <option value='en'>English</option>
                </select>
              </div>
            </div>
          }
          onEvent='onClick'
          show={true}
        />

        <div>
          <Popover
            renderPopover={
              <div className=' shadow-sm max-w-48 text-sm font-sans gap-1 border rounded-xl border-gray-300 bg-white text-black flex flex-col justify-center text-left items-start'>
                <div className='p-4 border-b-[1px] border-b-gray-200'>
                  <Link to={path.userHome} className=' text-sm'>
                    minhDevFE120304
                  </Link>
                </div>

                <div className='text-gray-500 flex flex-col p-4 border-b-[1px] border-b-gray-300 w-full'>
                  <Link
                    to={`${path.userHome}`}
                    className='mb-2 p-2 rounded-sm hover:text-white text-gray-500 hover:bg-blue-950 w-full'
                  >
                    User Home
                  </Link>
                  <Link
                    to={`${path.userLists}`}
                    className='mb-2 p-2 rounded-sm hover:text-white text-gray-500 hover:bg-blue-950 w-full'
                  >
                    List
                  </Link>
                  <Link
                    to={`${path.userHome_watchListMovie}`}
                    className='mb-2 capitalize text-gray-500 p-2 rounded-sm hover:text-white hover:bg-blue-950 w-full'
                  >
                    watch list
                  </Link>
                  <Link
                    to={`${path.userHome_favoriteMovie}`}
                    className='mb-2 capitalize text-gray-500 p-2 rounded-sm hover:text-white hover:bg-blue-950 w-full'
                  >
                    favorite list
                  </Link>
                </div>
              </div>
            }
            onEvent='onMouseEnter'
            show={true}
            children={<img src={icons} alt='' className='ml-8 -translate-x-6 w-7 h-7 rounded-full' />}
          />
        </div>
        <Popover
          className='ml-6 -translate-x-5 z-50'
          fullWidth={true}
          children={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='#ffff'
              className='size-6 ml-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>
          }
          onEvent='onMouseEnter'
          renderPopover={
            <div className='w-full bg-white p-4'>
              <div className='flex items-center w-full'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='#000'
                  className='size-6 mr-2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>
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
                  placeholder='Search for a movie, tv show, person....'
                  className='flex-grow p-2 border border-black rounded-sm shadow-sm rounded-l-md focus:outline-none'
                />
                <button className='bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-r-md'>
                  Search
                </button>
              </div>
              <div className='mt-4 space-y-2'>
                <div className='flex items-center w-full border-b-[1px] border-b-gray-200'>
                  <img
                    src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-962-trending-d9ba6bdc2bd0f18a8762ed296e3cd58987e1970b08676b690609114d2928dd78.svg'
                    alt=''
                    className='size-6 items-center'
                  />
                  <div className='text-black font-bold text-xl ml-2'>Trending</div>
                </div>
                <div className='flex flex-col gap-3'>
                  {dataRatedMovies?.slice(0, 10).map((movies: Movie) => (
                    <div key={movies.id} className='flex border-b-gray-200 border-b-[1px]'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='#000'
                        className='size-6 mr-2'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                        />
                      </svg>
                      <Link
                        to={`${path.movie}/${generateNameId({ name: movies?.original_title as string, id: movies?.id as number })}`}
                        key={movies.id}
                        className='text-black'
                      >
                        {movies.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
        />
        {/* <ModeToggle classNameConfig='-translate-x-10 items-center' /> */}
      </div>
    )
  }
  const handleTabLink_CLear_Sort = () => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams('').toString()
    })
  }
  const customMenuLeft = (customClassName?: string) => {
    return (
      <div className={`${customClassName}`}>
        <Popover
          children='Movies'
          className='text-white w-[60px] mr-3 font-bold ml-2'
          renderPopover={
            <div className='shadow-sm max-w-52 w-40  text-sm font-sans gap-1 border rounded-xl border-gray-300 bg-white text-black flex flex-col justify-center text-left items-center'>
              <Link
                onClick={() => handleTabLink_CLear_Sort()}
                to={`${path.movie_popular}`}
                className='hover:bg-gray-200 p-2 rounded-xl  w-full'
              >
                Popular
              </Link>
              <Link
                onClick={() => handleTabLink_CLear_Sort()}
                to={`${path.movie_now_playing}`}
                className='hover:bg-gray-200 p-2  w-full'
              >
                Now Playing
              </Link>
              <Link
                onClick={() => handleTabLink_CLear_Sort()}
                to={`${path.movie_upcoming}`}
                className='hover:bg-gray-200 p-2 w-full'
              >
                Upcoming
              </Link>
              <Link
                onClick={() => handleTabLink_CLear_Sort()}
                to={`${path.movie_top_rated}`}
                className='hover:bg-gray-200 p-2 rounded-xl w-full'
              >
                Top Rated
              </Link>
            </div>
          }
        />
        <Popover
          children='TV Shows'
          className='text-white w-[80px] mr-3 font-bold ml-2'
          renderPopover={
            <div className=' shadow-sm max-w-52 w-40  text-sm font-sans gap-1 border rounded-xl border-gray-300 bg-white text-black flex flex-col justify-center text-left items-center'>
              <Link
                onClick={() => handleTabLink_CLear_Sort()}
                to={`${path.tv_popular}`}
                className='hover:bg-gray-200 p-2 rounded-xl  w-full'
              >
                Popular
              </Link>
              <Link
                onClick={() => handleTabLink_CLear_Sort()}
                to={`${path.on_tv}`}
                className='hover:bg-gray-200 p-2  w-full'
              >
                On TV
              </Link>
              <Link
                onClick={() => handleTabLink_CLear_Sort()}
                to={`${path.tv_airing_today}`}
                className='hover:bg-gray-200 p-2 w-full'
              >
                Airing Today
              </Link>
              <Link
                onClick={() => handleTabLink_CLear_Sort()}
                to={`${path.tv_top_rated}`}
                className='hover:bg-gray-200 p-2 rounded-xl w-full'
              >
                Top Rated
              </Link>
            </div>
          }
        />
        <Popover
          children='People'
          className='text-white w-[60px] mr-3 font-bold ml-2'
          renderPopover={
            <div className=' shadow-sm max-w-52 w-40  text-sm font-sans gap-1 border rounded-xl border-gray-300 bg-white text-black flex flex-col justify-center text-left items-center'>
              <Link to={`${path.peopleList}`} className='hover:bg-gray-200 p-2 rounded-xl  w-full'>
                Popular People
              </Link>
            </div>
          }
        />

        <Popover
          children='More'
          className='text-white w-[60px] mr-3 font-bold ml-2'
          renderPopover={
            <div className=' shadow-sm max-w-52 w-40  text-sm font-sans gap-1 border rounded-xl border-gray-300 bg-white text-black flex flex-col justify-center text-left items-center'>
              <Link to='' className='hover:bg-gray-200 p-2 rounded-xl w-full'>
                API
              </Link>
            </div>
          }
        />
        <Popover
          children='Contact'
          className='text-white w-[60px] mr-3 font-bold ml-2'
          renderPopover={
            <div className=' shadow-sm max-w-52 w-40  text-sm font-sans gap-1 border rounded-xl border-gray-300 bg-white text-black flex flex-col justify-center text-left items-center'>
              <Link to={`${path.contactDeveloper}`} className='hover:bg-gray-200 p-2 rounded-xl w-full'>
                Developer
              </Link>
            </div>
          }
        />
      </div>
    )
  }
  return (
    <div className='relative z-auto bg-blue-950 flex h-[100px] md:justify-between items-center w-full p-4  min-w-full'>
      {' '}
      <div className='flex'>
        <Link to={path.home} className='mr-4 min-w-[154px]'>
          <img
            src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
            alt='The Movie Database (TMDB)'
            width='154'
            height='20'
          />
        </Link>
        {customMenuLeft('hidden lg:flex')}
      </div>
      <div className='w-full flex justify-between lg:hidden'>
        <button className=' transition-all text-white p-2' onClick={toggleMenu_left}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
          </svg>
        </button>
        <button className=' transition-all text-white p-2' onClick={toggleMenu_right}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
          </svg>
        </button>
      </div>
      {customMenuRight('max-lg:translate-x-32 hidden  items-center lg:flex')}
      {isMenuOpen_left && (
        <div className='lg:hidden transition-all absolute top-[100px] left-0 right-0 bg-blue-950 p-4'>
          {customMenuLeft('flex gap-4')}
        </div>
      )}
      {isMenuOpen_right && (
        <div className='lg:hidden transition-all absolute top-[100px] left-0 right-0 bg-blue-950 p-4'>
          <div className='flex flex-col space-y-4'> {customMenuRight('translate-x-20')}</div>
        </div>
      )}
    </div>
  )
}
