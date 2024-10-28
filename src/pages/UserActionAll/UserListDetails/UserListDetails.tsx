import { AccountApi_V4 } from '@/Apis/AccountApi_V4'
import configBase from '@/constants/config'
import path from '@/constants/path'
import { MovieInfo, MovieResult } from '@/types/Movie'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { generateNameId, getIdFromNameId } from '@/utils/utils'
import { ActionListV3Api } from '@/Apis/ActionListV3Api'
import { toast } from 'react-toastify'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/Components/ui/alert-dialog'
import { useEffect, useState } from 'react'
import DetailsMovieApi from '@/Apis/DetailsMovieApi'
import HelMet from '@/Components/Custom/HelMet'
const radius = 18
const circumference = 2 * Math.PI * radius

export default function UserListDetails() {
  const [idMV, setIdMV] = useState<number[]>([])

  const { listID } = useParams()
  const listIDs = getIdFromNameId(listID as string)
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ['dataList'],
    queryFn: () => AccountApi_V4.getListAll({ page: 1 })
  })
  const deletedListMutation = useMutation({
    mutationFn: () => ActionListV3Api.deletedList(Number(listIDs))
  })
  const handleDeletedList = () => {
    deletedListMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Delete success')
        navigate({
          pathname: path.userHome
        })
      }
    })
  }

  const dataMyList = data?.data?.results

  const { data: dataListDetails } = useQuery({
    queryKey: ['dataLists'],
    queryFn: () => AccountApi_V4.getListsDetails({ page: 1 }, Number(listIDs))
  })
  const dataDetails = dataListDetails?.data

  const actionTime = (time: number) => {
    if (time >= 60) {
      return `${Math.floor(time / 60)}h ${time % 60}m`
    } else {
      return `${time}m`
    }
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
  useEffect(() => {
    if (dataListDetails?.data?.results) {
      const movieIds = dataListDetails?.data?.results.map((item) => item.id)
      setIdMV(movieIds)
    }
  }, [dataListDetails])

  const { data: moviesDetails } = useQuery({
    queryKey: ['dataMoviesDetails', idMV],
    queryFn: async () => {
      if (idMV.length === 0) return []

      const promises = idMV.map((id: number) => DetailsMovieApi.getDetailsMovie(id))

      return Promise.all(promises)
    },
    enabled: idMV.length > 0
  })
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
      <HelMet title='User list details' />
      <div className='relative w-full h-[350px]'>
        <div className='bg-[#0D2C3F]/80 w-full h-full absolute'></div>
        <div className='absolute'>
          <div className='flex ml-20  mt-12 flex-col'>
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
            <AlertDialog>
              <AlertDialogTrigger className='text-center w-[140px] my-1 cursor-pointer hover:bg-blue-950 bg-[#06b6d4] text-white font-bold p-2 text-xl rounded-sm shadow-sm'>
                Deleted list
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure deleted list?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeletedList}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className='absolute font-bold text-2xl bottom-0 h-32 w-full bg-black/55 flex gap-4'>
          <div className='flex  ml-20 pt-7 flex-col text-white'>
            {dataDetails?.results?.length} <div>Item on this list</div>
          </div>
          <div className='flex ml-20 pt-7 flex-col text-white'>
            {(dataDetails?.average_rating as number) * 10} %{' '}
            <div className='capitalize text-white font-semibold'>average rating</div>
          </div>
          <div className='flex ml-20 pt-7 flex-col text-white'>
            {actionTime(dataDetails?.runtime as number) || 0} <div className='capitalize'>total runtime</div>
          </div>
          <div className='flex ml-20 pt-7 flex-col text-white'>
            {formatNumber(dataDetails?.revenue as number) || 0} <div className='capitalize'>total revenue</div>
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
      <div className='mx-40 max-sm:mx-0 mt-20'>
        <div className='w-full flex flex-col'>
          {dataDetails?.results?.map((itemMyList: MovieResult, index) => (
            <Link
              to={`/${itemMyList?.media_type}/${generateNameId({ name: itemMyList?.original_title, id: itemMyList?.id })}`}
              key={itemMyList?.overview}
              className='flex gap-3 items-center mb-4'
            >
              <div className='text-gray-400'>{index + 1}</div>
              <div className='flex justify-between rounded-xl shadow-xl border border-gray-300 w-full items-center p-4'>
                <div className='line-clamp-1 max-sm:hidden'>{itemMyList?.original_title}</div>
                <div className='flex gap-4 max-sm:gap-2 max-sm:flex-wrap items-center'>
                  {' '}
                  <div>{dataPersent(itemMyList)}</div>
                  <span className='px-2  py-1 text-sm font-medium rounded-full text-white bg-gradient-to-r from-[#FF6B6B] via-[#FF8C5F] to-[#FF5F95]'>
                    {itemMyList?.media_type}
                  </span>
                  <div className='bg-blue-950 rounded-2xl p-1 text-sm items-center text-center text-white'>
                    {itemMyList?.release_date}
                  </div>
                  {moviesDetails?.map(({ data: movieData }, index_movie) =>
                    index_movie === index ? (
                      <div className='flex gap-3 max-sm:hidden' key={movieData.id}>
                        <div className='text-gray-400 text-sm w-[60px] text-center'>
                          {' '}
                          {actionTime(movieData?.runtime as number) || '0h 0p'}
                        </div>
                        <div className='text-gray-400 text-sm w-[60px] text-center'>
                          {' '}
                          {formatNumber(movieData?.revenue as number)}M
                        </div>
                      </div>
                    ) : (
                      ''
                    )
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
