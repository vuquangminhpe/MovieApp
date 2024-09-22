import configBase from '../../../constants/config'
import { Movie } from '../../../types/Movie'

interface Props {
  dataMoviesTrending: Movie[]
}

export default function MovieTrending({ dataMoviesTrending }: Props) {
  console.log(dataMoviesTrending)

  return (
    <div className='pl-7 py-7 w-full'>
      <div className='text-xl font-bold'>Trending</div>
      <div className='overflow-x-auto flex w-full gap-1'>
        <div className='flex overflow-x-auto gap-3'>
          {dataMoviesTrending?.map((dataTrending: Movie) => {
            return (
              <div className='w-[150px]'>
                <img
                  className='w-full h-[225px] object-cover'
                  src={`${configBase.imageBaseUrl}${dataTrending.backdrop_path}`}
                />
              </div>
            )
          })}{' '}
        </div>
      </div>
    </div>
  )
}
