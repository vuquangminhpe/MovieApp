import { Link } from 'react-router-dom'
import path from '../../constants/path'
import Popover from '../Popover/Popover'
import { GoBell } from 'react-icons/go'
export default function Header() {
  return (
    <div className='bg-blue-950 h-[100px] p-10 flex items-center'>
      <Link to={path.home}>
        <img
          src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
          alt='The Movie Database (TMDB)'
          width='154'
          height='20'
        />
      </Link>

      <div className='flex ml-3'>
        <Popover
          children='Movies'
          className='text-white w-[100px] font-bold ml-2'
          renderPopover={
            <div className=' shadow-sm max-w-52 w-40  text-sm font-sans gap-1 border rounded-xl border-gray-300 bg-white text-black flex flex-col justify-center text-left items-center'>
              <Link to='' className='hover:bg-gray-200 p-2 rounded-xl  w-full'>
                Popdivar
              </Link>
              <Link to='' className='hover:bg-gray-200 p-2  w-full'>
                Now Playing
              </Link>
              <Link to='' className='hover:bg-gray-200 p-2 w-full'>
                Upcoming
              </Link>
              <Link to='' className='hover:bg-gray-200 p-2 rounded-xl w-full'>
                Top Rated
              </Link>
            </div>
          }
        />
        <Popover
          children='Movies'
          className='text-white w-[100px] font-bold ml-2'
          renderPopover={
            <div className=' shadow-sm max-w-52 w-40  text-sm font-sans gap-1 border rounded-xl border-gray-300 bg-white text-black flex flex-col justify-center text-left items-center'>
              <Link to='' className='hover:bg-gray-200 p-2 rounded-xl  w-full'>
                Popular
              </Link>
              <Link to='' className='hover:bg-gray-200 p-2  w-full'>
                On TV
              </Link>
              <Link to='' className='hover:bg-gray-200 p-2 w-full'>
                Airing Today
              </Link>
              <Link to='' className='hover:bg-gray-200 p-2 rounded-xl w-full'>
                Top Rated
              </Link>
            </div>
          }
        />
        <Popover
          children='Movies'
          className='text-white w-[100px] font-bold ml-2'
          renderPopover={
            <div className=' shadow-sm max-w-52 w-40  text-sm font-sans gap-1 border rounded-xl border-gray-300 bg-white text-black flex flex-col justify-center text-left items-center'>
              <Link to='' className='hover:bg-gray-200 p-2 rounded-xl  w-full'>
                Popular People
              </Link>
            </div>
          }
        />
        <Popover
          children='Movies'
          className='text-white w-[100px] font-bold ml-2'
          renderPopover={
            <div className=' shadow-sm max-w-52 w-40  text-sm font-sans gap-1 border rounded-xl border-gray-300 bg-white text-black flex flex-col justify-center text-left items-center'>
              <Link to='' className='hover:bg-gray-200 p-2 rounded-xl  w-full'>
                Discussions
              </Link>
              <Link to='' className='hover:bg-gray-200 p-2  w-full'>
                Leaderbroard
              </Link>
              <Link to='' className='hover:bg-gray-200 p-2 w-full'>
                Support
              </Link>
              <Link to='' className='hover:bg-gray-200 p-2 rounded-xl w-full'>
                API
              </Link>
            </div>
          }
        />
        <div className='text-white '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </div>
        <div className='border border-white w-7 text-center text-white font-bold ml-3 hover:text-black hover:bg-white cursor-pointer'>
          VI
        </div>
        <div>
          <GoBell />
        </div>
      </div>
    </div>
  )
}
