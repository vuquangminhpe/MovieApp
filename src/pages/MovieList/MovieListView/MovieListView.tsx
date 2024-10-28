import configBase from '@/constants/config'
import path from '@/constants/path'
import { Movie, MovieTrendings } from '@/types/Movie'
import { generateNameId } from '@/utils/utils'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
interface Props {
  colorLiker?: string
  listData: Movie | MovieTrendings
  pathName: string
}
export default function MovieListView({ colorLiker = '#4CAF50', listData, pathName }: Props) {
  const [paths, setPaths] = useState<string>(`${path.movie}`)
  const percentage = Math.round((listData as MovieTrendings).vote_average * 10)
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  if (percentage <= 60 && percentage >= 30) {
    colorLiker = '#b9d13f'
  } else if (percentage < 30) {
    colorLiker = '#ed2133'
  }
  useEffect(() => {
    if (pathName.includes('/tv')) setPaths(`${path.OnTvSeries}`)
  }, [pathName])
  return (
    <Link
      to={`${paths}/${generateNameId({ name: (listData.original_title || listData.original_name) as string, id: listData.id })}`}
      className='w-full shadow-xl rounded-xl'
    >
      <img
        src={`${configBase.imageBaseUrl}${listData.poster_path}`}
        alt={listData.title || ''}
        className='w-full h-auto object-cover shadow-sm rounded-t-xl z-20'
        loading='lazy'
      />
      <div className='absolute -translate-y-7 translate-x-2 w-12 h-12 z-50'>
        <svg className='w-full h-full' viewBox='0 0 40 40'>
          <circle
            className='text-gray-700'
            strokeWidth='3'
            stroke='currentColor'
            fill='black'
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
          <span className={`text-xs font-bold text-white`}>{percentage}%</span>
        </div>
      </div>
      <div className='mt-2 p-3'>
        <div className='font-bold text-sm'>{listData.title || listData.name}</div>
        <div className='text-gray-300'>{listData.release_date || listData.first_air_date}</div>
      </div>
    </Link>
  )
}
