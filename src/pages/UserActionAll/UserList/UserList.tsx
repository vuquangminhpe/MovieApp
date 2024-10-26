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
  console.log(dataMyList)
  useEffect(() => {
    refetch()
  }, [refetch, dataMyList])

  return (
    <div className='flex flex-col my-5 container'>
      <div className='flex justify-between '>
        <div className='capitalize text-xl font-bold text-black dark:text-white'>my lists</div>
        <Link to={`${path.ListCreated}`} className='bg-emerald-400 text-white p-4 rounded-sm capitalize cursor-pointer'>
          create list
        </Link>
      </div>
      <div>
        {(dataMyList?.length as number) === 0
          ? `You havent't created any lists`
          : dataMyList?.map((itemMyList: MovieInfo) => (
              <Link
                to={`/list/${generateNameId({ name: itemMyList?.name as string, id: itemMyList?.id as number })}`}
                key={itemMyList.poster_path}
                className='relative text-center mt-5 flex items-center'
              >
                <img
                  src={`${configBase.imageBaseUrl}${itemMyList?.backdrop_path}`}
                  className='h-60 rounded-xl shadow-xl w-[500px]'
                  alt=''
                />
                <div className='h-60 rounded-xl shadow-xl w-[500px] bg-black/85 absolute'></div>
                <div className='absolute w-[500px] text-white font-bold text-2xl font-serif'>
                  <div className='text-center capitalize'>{itemMyList?.name}</div>
                  <div className='flex gap-4 text-center items-center w-full translate-x-[37%]'>
                    <div className='text-center text-sm'>{dataMyList?.length} item</div>
                    <div className='p-2 uppercase text-sm bg-gray-400/40 rounded-xl'>public</div>
                  </div>
                  <div className='text-gray-400 text-sm mt-2'>
                    Updated{' '}
                    {new Date(
                      Number(new Date().getTime()) - Number(new Date(itemMyList?.updated_at).getTime())
                    ).getMinutes()}{' '}
                    minutes ago
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  )
}
