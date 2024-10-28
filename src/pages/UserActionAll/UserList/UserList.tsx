import { AccountApi_V4 } from '@/Apis/AccountApi_V4'
import configBase from '@/constants/config'
import path from '@/constants/path'
import { MovieInfo } from '@/types/Movie'
import { generateNameId } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function UserList() {
  const { data, refetch } = useQuery({
    queryKey: ['dataList'],
    queryFn: () => AccountApi_V4.getListAll({ page: 1 })
  })
  const dataMyList = data?.data.results
  useEffect(() => {
    refetch()
  }, [refetch, dataMyList])
  const getTimeAgo = (updatedAt: string) => {
    const timeDiff = new Date().getTime() - new Date(updatedAt).getTime()
    const minutes = Math.floor(timeDiff / (1000 * 60))
    const hours = Math.floor(timeDiff / (1000 * 60 * 60))
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

    if (days > 0) {
      return `${days} ngày trước`
    } else if (hours > 0) {
      return `${hours} giờ trước`
    } else {
      return `${minutes} phút trước`
    }
  }

  return (
    <div className='flex flex-col my-5 container'>
      <div className='flex justify-between '>
        <div className='capitalize text-xl font-bold text-black dark:text-white'>my lists</div>
        <Link to={`${path.ListCreated}`} className='bg-emerald-400 text-white p-4 rounded-sm capitalize cursor-pointer'>
          create list
        </Link>
      </div>
      <div className='grid grid-cols-2 max-sm:grid-cols-1 max-sm:w-full gap-2 justify-around '>
        {(dataMyList?.length as number) === 0
          ? `You havent't created any lists`
          : dataMyList?.map((itemMyList: MovieInfo) => (
              <Link
                to={`/list/${generateNameId({ name: itemMyList?.name as string, id: itemMyList?.id as number })}`}
                key={itemMyList.poster_path}
                className='relative  max-sm:w-[90%] max-sm:ml-7 max-md:w-[100%] max-lg:w-[100%] text-center mt-5 w-[600px] flex items-center'
              >
                <img
                  src={`${configBase.imageBaseUrl}${itemMyList?.backdrop_path}`}
                  className='h-60 rounded-xl shadow-xl w-full'
                  alt=''
                />
                <div className='h-60 rounded-xl shadow-xl w-full bg-black/85 absolute'></div>
                <div className='absolute w-full text-white font-bold text-2xl font-serif'>
                  <div className='text-center capitalize'>{itemMyList?.name}</div>
                  <div className='flex gap-4 text-center items-center w-full translate-x-[37%]'>
                    <div className='text-center text-sm'>{itemMyList?.number_of_items} item</div>
                    <div className='p-2 uppercase text-sm bg-gray-400/40 rounded-xl'>public</div>
                  </div>
                  <div className='text-gray-400 text-sm mt-2'>Updated {getTimeAgo(itemMyList.updated_at)}</div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  )
}
