import { ListApi } from '@/Apis/ListApi'
import { useQuery } from '@tanstack/react-query'
import MovieListView from './MovieListView'
import { Movie } from '@/types/Movie'
import { useLocation } from 'react-router-dom'

export default function MovieList() {
  const location = useLocation()
  const nameLocation = location.pathname.split('/')[2]
  const { data: PopularData } = useQuery({
    queryKey: ['dataPopularList'],
    queryFn: ListApi.PopularList
  })
  const listData = PopularData?.data.results

  console.log(listData)
  return (
    <div className='container py-5'>
      <div className='flex'>
        <div className='w-[500px]'>
          <div className='font-bold text-xl capitalize'>{nameLocation} movies</div>
          <div className='shadow-xl rounded-xl flex p-3 justify-between items-center'>
            <div className='font-semibold text-sm'>Sort</div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-4 cursor-pointer'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
            </svg>
          </div>
          <div className='shadow-xl rounded-xl flex p-3 justify-between items-center'>
            <div className='font-semibold text-sm'>Filter</div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-4 cursor-pointer'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
            </svg>
          </div>
        </div>
        <div className='grid grid-cols-5 gap-5 ml-7 mt-8'>
          {listData?.map((itemListData: Movie) => <MovieListView key={itemListData.id} listData={itemListData} />)}
        </div>
      </div>
    </div>
  )
}
