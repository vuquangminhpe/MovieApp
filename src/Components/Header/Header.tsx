import { Link } from 'react-router-dom'
import path from '../../constants/path'
import Popover from '../Popover/Popover'
import icons from '../../Imgs/nonesp.webp'
import { useQuery } from '@tanstack/react-query'
import { ListApi } from '../../Apis/ListApi'
import { Movie } from '../../types/Movie'
// import { particlesCursor } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js'

export default function Header() {
  const { data: DataRated } = useQuery({
    queryKey: ['listRated'],
    queryFn: () => ListApi.DataRated()
  })

  const dataRatedMovies = DataRated?.data.results

  // const pc = particlesCursor({
  //   el: document.getElementById('app'),
  //   gpgpuSize: 512,
  //   colors: [0x00ff00, 0x0000ff],
  //   color: 0xff0000,
  //   coordScale: 0.5,
  //   noiseIntensity: 0.001,
  //   noiseTimeCoef: 0.0001,
  //   pointSize: 5,
  //   pointDecay: 0.0025,
  //   sleepRadiusX: 250,
  //   sleepRadiusY: 250,
  //   sleepTimeCoefX: 0.001,
  //   sleepTimeCoefY: 0.002
  // })

  // document.body.addEventListener('click', () => {
  //   pc.uniforms.uColor.value.set(Math.random() * 0xffffff)
  //   pc.uniforms.uCoordScale.value = 0.001 + Math.random() * 2
  //   pc.uniforms.uNoiseIntensity.value = 0.0001 + Math.random() * 0.001
  //   pc.uniforms.uPointSize.value = 1 + Math.random() * 10
  // })

  return (
    <div className='relative bg-blue-950 h-[100px] w-full p-4'>
      <div className='flex md:justify-between items-center p-4'>
        <div className='flex'>
          <Link to={path.home} className='mr-4 min-w-[154px]'>
            <img
              src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
              alt='The Movie Database (TMDB)'
              width='154'
              height='20'
            />
          </Link>
          <Popover
            children='Movies'
            className='text-white w-[60px] mr-3 font-bold ml-2'
            renderPopover={
              <div className='shadow-sm max-w-52 w-40  text-sm font-sans gap-1 border rounded-xl border-gray-300 bg-white text-black flex flex-col justify-center text-left items-center'>
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
            children='TV Shows'
            className='text-white w-[80px] mr-3 font-bold ml-2'
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
            children='People'
            className='text-white w-[60px] mr-3 font-bold ml-2'
            renderPopover={
              <div className=' shadow-sm max-w-52 w-40  text-sm font-sans gap-1 border rounded-xl border-gray-300 bg-white text-black flex flex-col justify-center text-left items-center'>
                <Link to='' className='hover:bg-gray-200 p-2 rounded-xl  w-full'>
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
        </div>
        <div className='flex ml-3 mt-1'>
          <Popover
            children={
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
            }
            show={true}
            onEvent='onClick'
            renderPopover={
              <div className=' shadow-sm max-w-52 w-40  text-sm font-sans gap-1 border rounded-xl border-gray-300 bg-white text-black flex flex-col justify-center text-left items-center'>
                {' '}
                <Link to='' className='hover:bg-blue-950 p-2 w-full rounded-xl hover:text-white'>
                  Add New Movie
                </Link>
                <Link to='' className='hover:hover:bg-blue-950 hover:text-white p-2 rounded-xl w-full'>
                  Add New TV Show
                </Link>
              </div>
            }
          />

          <Popover
            children='VI'
            className='border border-white w-7 text-center text-white font-bold mx-6 hover:text-black hover:bg-white cursor-pointer'
            renderPopover={
              <div className='w-64 h-26 p-3 bg-white border border-gray-200 shadow-sm rounded-sm'>
                <h2 className='font-bold'>Language Preferences</h2>
                <div>
                  <select className='mt-2 bg-gray-200/90 rounded-sm shadow-sm w-full p-2'>
                    <option value='Tiếng việt'>Tiếng việt</option>
                    <option value='English'>English</option>
                  </select>
                </div>
              </div>
            }
            onEvent='onClick'
            show={true}
          />
          <Popover
            onEvent='onClick'
            show={true}
            children={
              <img
                className='size-6'
                src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-441-bell-9cd2af257b98c4af3460078777d8e38a5e12bca89704eeac2f39273afcbd06ff.svg'
                alt=''
              />
            }
            renderPopover={
              <div className=' shadow-sm p-4 max-w-64 text-sm font-sans gap-1 border rounded-xl border-gray-300 bg-white text-black flex flex-col justify-center text-left items-center'>
                <div>
                  <p className='font-bold text-xl'>Unread Notifications 0</p>
                  <p className='text-sm'>
                    Good job! Looks like you're all caught up.{' '}
                    <Link className='text-white/40' to={path.home}>
                      View All
                    </Link>
                  </p>
                </div>
              </div>
            }
          />
          <Popover
            renderPopover={
              <div className='shadow-sm max-w-48 text-sm font-sans gap-1 border rounded-xl border-gray-300 bg-white text-black flex flex-col justify-center text-left items-start'>
                <div className='p-4 border-b-[1px] border-b-gray-200'>
                  <p className=' text-sm'>minhDevFE120304</p>
                  <p className='text-gray-400'>Xem hồ sơ</p>
                </div>

                <div className='text-gray-500 p-4 border-b-[1px] border-b-gray-300'>
                  <div className='mb-2'>Thảo luận</div>
                  <div className='mb-2'>Danh sách</div>
                  <div className='mb-2'>Xếp hạng</div>
                  <div>Danh sách theo dõi</div>
                </div>
                <div className='text-gray-500 p-4 border-b-[1px] border-b-gray-300'>
                  <div className='mb-2'>Chỉnh sửa hồ sơ</div>
                  <div className='mb-2'>Cài đặt</div>
                </div>
                <div className='w-full text-gray-500 p-4 '>
                  <div className='mb-2'>Đăng xuất</div>
                </div>
              </div>
            }
            onEvent='onClick'
            show={true}
            children={<img src={icons} alt='' className='ml-6 w-7 h-7 rounded-full' />}
          />
        </div>
      </div>
      <Popover
        className='w-full mr-2'
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
        show={true}
        onEvent='onClick'
        leaveEvent='onMouseLeave'
        renderPopover={
          <div className='w-full bg-gray-500 p-4'>
            <div className='flex items-center w-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='#ffff'
                className='size-6 mr-2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                />
              </svg>
              <input
                type='text'
                placeholder='Search for a movie, tv show, person....'
                className='flex-grow p-2 rounded-l-md focus:outline-none'
              />
              <button className='bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-r-md'>
                Search
              </button>
            </div>
            <div className='mt-4 space-y-2'>
              {dataRatedMovies?.slice(0, 10).map((movies: Movie) => (
                <div key={movies.id} className='text-white'>
                  {movies.title}
                </div>
              ))}
            </div>
          </div>
        }
      />
    </div>
  )
}
