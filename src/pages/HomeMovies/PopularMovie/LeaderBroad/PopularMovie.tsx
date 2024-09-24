import { Link } from 'react-router-dom'
import { Movie } from '../../../../types/Movie'
import CustomScrollContainer from '../../../../Components/CustomScrollContainer'
import path from '../../../../constants/path'
import RenderMovies from '../../../../Components/RenderMovies'

interface MovieTrendingProps {
  dataPopulars?: Movie[]
}

const MovieTrending = ({ dataPopulars }: MovieTrendingProps) => {
  return (
    <div className='pl-7 py-7 w-full'>
      <div className='text-xl font-bold mb-4'>What's Popular</div>

      <div className='relative' style={{ height: '350px' }}>
        <CustomScrollContainer height={350} width='100%'>
          <div className='flex gap-3 pr-4' style={{ width: 'max-content' }}>
            {dataPopulars?.map((dataTrending) => (
              <Link key={dataTrending.id} to={path.home} className='max-w-full'>
                <RenderMovies key={dataTrending.id} dataTrending={dataTrending} />
                <div className='text-sm font-semibold max-w-[220px]'>
                  {dataTrending.original_name || dataTrending.original_title}
                </div>
                <div className='text-gray-300'>
                  {dataTrending.first_air_date || (dataTrending as Movie).release_date}
                </div>
              </Link>
            ))}
          </div>
        </CustomScrollContainer>
      </div>
    </div>
  )
}

export default MovieTrending
