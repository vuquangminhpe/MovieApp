import { AccountApi_V4 } from '@/Apis/AccountApi_V4'
import configBase from '@/constants/config'
import path from '@/constants/path'
import { MovieInfo, MovieResult } from '@/types/Movie'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { getIdFromNameId } from '@/utils/utils'

const radius = 18
const circumference = 2 * Math.PI * radius

export default function UserListDetails() {
  const { listID } = useParams()
  const listIDs = getIdFromNameId(listID as string)
  const { data } = useQuery({
    queryKey: ['dataList'],
    queryFn: () => AccountApi_V4.getListAll({ page: 1 })
  })

  const dataMyList = data?.data.results

  const { data: dataListDetails } = useQuery({
    queryKey: ['dataLists'],
    queryFn: () => AccountApi_V4.getListsDetails({ page: 1 }, Number(listIDs))
  })
  const dataDetails = dataListDetails?.data
  console.log(dataDetails)

  const actionTime = (time: number) => {
    if (time > 60) return `${Math.floor(time / 60)}h ${time - 60}m`
  }
  const formatNumber = (num: number) => {
    return `$${(num / 1000000).toFixed(1)}`
  }
  const persentPrint = (circumferences: number, percentages: number, colorAdjust: string) => {
    return (
      <div className='w-12 h-12'>
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
            stroke={colorAdjust}
            fill='transparent'
            r={radius}
            cx='20'
            cy='20'
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumferences,
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%'
            }}
          />
        </svg>
        <div className='-translate-y-8 z-50 text-white flex items-center justify-center'>
          <span className={`text-xs font-bold `}>{percentages > 0 ? `${Math.round(percentages * 10)}%` : 'NR'}</span>
        </div>
      </div>
    )
  }
  const dataPersent = (array: MovieResult) => {
    const percentage = array?.vote_average
    let colorLiker = '#4CAF50'
    if (percentage <= 6 && percentage >= 3) {
      colorLiker = '#b9d13f'
    } else if (percentage < 3) {
      colorLiker = '#ed2133'
    }
    const Circumference = circumference - (percentage / 10) * circumference

    return persentPrint(Circumference, percentage, colorLiker)
  }
  return (
    <div className='flex flex-col'>
      <div className='relative w-full h-[350px]'>
        <div className='bg-[#0D2C3F]/80 w-full h-full absolute'></div>
        <div className='absolute'>
          <div className='flex ml-20 mt-12 flex-col'>
            <div className='text-white text-xl font-bold capitalize cursor-pointer mb-3'>{dataDetails?.name}</div>
            <div className='text-white text-xl font-semibold mb-3'>{dataDetails?.description}</div>
            <div className='flex gap-3 items-center'>
              <div className='rounded-full bg-emerald-300 text-white font-bold items-center text-center size-10 leading-10'>
                M
              </div>
              <div className='text-white text-xl font-semibold'>
                A list by <Link to={`${path.userHome}`}>minhDevFE120304</Link>
              </div>
            </div>
          </div>
        </div>

        <div className='absolute font-bold text-2xl bottom-0 h-32 w-full bg-black/55 flex gap-4'>
          <div className='flex  ml-20 pt-7 flex-col text-white'>
            {dataMyList?.length} <div>Item on this list</div>
          </div>
          <div className='flex ml-20 pt-7 flex-col text-white'>
            {(dataDetails?.average_rating as number) * 10} %{' '}
            <div className='capitalize text-white font-semibold'>average rating</div>
          </div>
          <div className='flex ml-20 pt-7 flex-col text-white'>
            {actionTime(dataDetails?.runtime as number)} <div className='capitalize'>total runtime</div>
          </div>
          <div className='flex ml-20 pt-7 flex-col text-white'>
            {formatNumber(dataDetails?.revenue as number)} <div className='capitalize'>total revenue</div>
          </div>
        </div>

        {dataMyList && (
          <img
            src={`${configBase.imageBaseUrl}${(dataMyList as MovieInfo[])[0]?.backdrop_path}`}
            className='w-full h-full object-cover object-top'
            alt=''
          />
        )}
      </div>
      <div className='mx-40 mt-20'>
        <div className='w-full flex flex-col'>
          {dataDetails?.results?.map((itemMyList: MovieResult, index) => (
            <div key={itemMyList?.overview} className='flex gap-3 items-center'>
              <div className='text-gray-400'>{index + 1}</div>
              <div className='flex justify-between rounded-xl shadow-xl border border-gray-300 w-full items-center p-4'>
                <div>{itemMyList?.original_title}</div>
                <div className='flex gap-4 items-center'>
                  <div>{dataPersent(itemMyList)}</div>
                  <span className='px-2 py-1 text-sm font-medium rounded-full text-white bg-gradient-to-r from-[#FF6B6B] via-[#FF8C5F] to-[#FF5F95]'>
                    {itemMyList?.media_type}
                  </span>
                  <div className='bg-blue-950 rounded-2xl p-1 text-sm items-center text-center text-white'>
                    {itemMyList?.release_date}
                  </div>
                  <div className='text-gray-400 text-sm'> {actionTime(dataDetails?.runtime as number)}</div>
                  <div className='text-gray-400 text-sm'> {formatNumber(dataDetails?.revenue as number)}M</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
