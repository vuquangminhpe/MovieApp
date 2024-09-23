import configBase from '../../constants/config'
import { MovieTrendings } from '../../types/Movie'

interface RenderMoviesProps {
  dataTrending: MovieTrendings
  colorLiker?: string
  isShow?: boolean
  configWidth_Height?: string
}

const RenderMovies = ({
  dataTrending,
  colorLiker = '#4CAF50',
  isShow = true,
  configWidth_Height = 'w-48 h-72'
}: RenderMoviesProps) => {
  const percentage = Math.round(dataTrending.vote_average * 10)

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
      <img
        className='w-full h-full object-cover'
        src={`${configBase.imageBaseUrl}${dataTrending.poster_path}`}
        alt={dataTrending.original_name || dataTrending.original_title}
      />
      {isShow && (
        <div className='absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-4'>
          <div className='flex items-center justify-center'>
            <svg className='w-10 h-10' viewBox='0 0 36 36'>
              <path
                d='M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831'
                fill='none'
                stroke={colorLiker}
                strokeWidth='3'
                strokeDasharray={`${percentage}, 100`}
              />
              <text x='18' y='20.35' className='percentage' textAnchor='middle' fill='white' fontSize='10'>
                {percentage}%
              </text>
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

export default RenderMovies
