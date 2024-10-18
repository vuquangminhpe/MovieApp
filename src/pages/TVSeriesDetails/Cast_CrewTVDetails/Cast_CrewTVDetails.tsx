import CustomScrollContainer from '@/Components/Custom/CustomScrollContainer'
import TabsSet from '@/Components/Custom/TabsEnable/TabsSet'
import RenderDetailsMovie from '@/Components/RenderMovies/RenderDetailsMovie'
import MovieTrailer from '@/pages/HomeMovies/MovieTrailer'
import { DetailsImages, MovieTrendings } from '@/types/Movie'
import { BackdropImagesTVSeries } from '@/types/TVSeries.type'
import { SuccessResponse } from '@/types/utils.type'
import { SetStateAction } from 'react'
interface Props {
  dataImages: SuccessResponse<BackdropImagesTVSeries[]> | undefined
  dataTrailerLatest: MovieTrendings[] | undefined
}
export default function Cast_CrewTVDetails({ dataImages, dataTrailerLatest }: Props) {
  const addDataRender = (dataRenders: DetailsImages[], isShow?: boolean) => {
    isShow = false
    return (dataRenders?.length as number) > 0 ? (
      <CustomScrollContainer height={400} width='100%'>
        <div className='flex gap-3 pr-4' style={{ width: 'max-content' }}>
          {dataRenders?.slice(0, 8).map((dataDetails: DetailsImages) => (
            <div
              key={crypto.randomUUID()}
              className='max-w-full hover:scale-125 transition-all hover:m-10 rounded-2xl bg-white shadow-xl'
            >
              <RenderDetailsMovie isShow={isShow} dataShowDetails={dataDetails} />
            </div>
          ))}
        </div>
      </CustomScrollContainer>
    ) : (
      <div>we don't have data images in here</div>
    )
  }
  const MapSet = [
    {
      id: 'videos',
      name: 'Videos',
      children: (
        <MovieTrailer
          dataPopulars={dataTrailerLatest}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          setMouseHoverImages={function (value: SetStateAction<string>): void {
            throw new Error('Function not implemented.')
          }}
        />
      )
    },
    {
      id: 'Most_Poplar',
      name: 'Most Poplar',
      children: addDataRender(dataImages?.backdrops as DetailsImages[])
    },
    {
      id: 'backdrops',
      name: 'Backdrops',
      children: addDataRender(dataImages?.logos as DetailsImages[])
    },
    {
      id: 'posters',
      name: 'Posters',
      children: addDataRender(dataImages?.posters as DetailsImages[])
    }
  ]
  return (
    <div>
      <div className='capitalize py-5 font-bold'>full cast & crew</div>
      <div className='border-b-[1px] border-gray-300'></div>
      <div className='mt-5 capitalize flex'>
        <div className='font-semibold'>Media</div>
        <TabsSet key={crypto.randomUUID()} ItemProps={MapSet} />
      </div>
    </div>
  )
}
