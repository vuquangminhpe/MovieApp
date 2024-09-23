import CustomScrollContainer from '../../../../Components/CustomScrollContainer'
import RenderMovies from '../../../../Components/RenderMovies'
import { MovieTrendings } from '../../../../types/Movie'

interface PropsData {
  dataPopulars?: MovieTrendings[]
}
export default function PopularMovie({ dataPopulars }: PropsData) {
  return (
    <div className='pl-7 py-7 w-full'>
      <div className='text-xl font-bold mb-4'>Latest Trailer</div>

      <div className='' style={{ height: '350px' }}>
        <CustomScrollContainer height={350} width='100%'>
          <div className='flex gap-9 pr-4' style={{ width: 'max-content' }}>
            {dataPopulars?.map((dataTrending) => (
              <div key={dataTrending.id} className='max-w-full relative '>
                <RenderMovies isShow={false} key={dataTrending.id} dataTrending={dataTrending} />
                <div className='text-sm text-white font-semibold max-w-[220px] truncate'>
                  {dataTrending.original_name || dataTrending.original_title}
                </div>
                <div className='w-full h-full flex justify-center items-center text-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='#FFF'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-12 cursor-pointer text-white absolute top-0 translate-y-[250%] -translate-x-[20%]'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z'
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </CustomScrollContainer>
      </div>
    </div>
  )
}
