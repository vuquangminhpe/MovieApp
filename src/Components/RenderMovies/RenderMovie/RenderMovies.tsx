import { Link } from 'react-router-dom'
import configBase from '../../../constants/config'
import { Movie, MovieTrendings } from '../../../types/Movie'
import path from '../../../constants/path'
import { generateNameId } from '../../../utils/utils'

interface RenderMoviesProps {
  dataTrending: MovieTrendings | Movie
  colorLiker?: string
  isShow?: boolean
  configWidth_Height?: string
  typeText?: string
  CustomIMG?: string
}

const RenderMovies = ({
  dataTrending,
  colorLiker = '#4CAF50',
  isShow = true,
  configWidth_Height = 'w-48 h-72',
  typeText = 'text-white',
  CustomIMG = ''
}: RenderMoviesProps) => {
  const percentage = Math.round((dataTrending as MovieTrendings).vote_average * 10)
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  if (percentage <= 60 && percentage >= 30) {
    colorLiker = '#b9d13f'
  } else if (percentage < 30) {
    colorLiker = '#ed2133'
  }

  return (
    <div
      className={`${configWidth_Height} bg-gradient-to-b from-blue-900 to-black rounded-xl overflow-hidden shadow-lg relative`}
    >
      <div className='absolute top-2 right-2 z-10'>
        <div className='w-6 h-6 flex items-center justify-center cursor-pointer'>
          <span className='text-gray-400 text-xl'>⋮</span>
        </div>
      </div>
      <Link
        to={`${path.home}${generateNameId({ name: (dataTrending.original_name as string) || (dataTrending.original_title as string), id: dataTrending.id as number })}`}
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
              fill='transparent'
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
            <span className={`text-xs font-bold ${typeText}`}>{percentage}%</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default RenderMovies
