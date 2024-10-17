/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate, useParams } from 'react-router-dom'
import { formatNumberToSocialStyle, generateNameId, getIdFromNameId } from '../../utils/utils'
import { useQuery } from '@tanstack/react-query'
import { ListApi } from '../../Apis/ListApi'
import configBase from '../../constants/config'
import { BackdropImages, CastMember, videosDetails } from '../../types/Movie'

import { useEffect, useState } from 'react'
import DynamicMovieBackdrop from '../../Components/Custom/DynamicMovieBackdrop'
import RenderDetailsMovie from '../../Components/RenderMovies/RenderDetailsMovie'
import CustomScrollContainer from '../../Components/Custom/CustomScrollContainer'

import RenderMovies from '@/Components/RenderMovies/RenderMovie'
import path from '@/constants/path'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/Components/ui/carousel'
import { Card, CardContent } from '@/Components/ui/card'

import { SuccessResponse } from '@/types/utils.type'
import { Expand } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/Components/ui/dialog'
import { toast } from 'react-toastify'
import RatingTVDetails from './RatingTVDetails'
import AddOwnerTVDetails from './AddOwnerTVDetails'
import Cast_CrewTVDetails from './Cast_CrewTVDetails'
import { TVSeriesApi } from '@/Apis/TVSeriesApi'
import { BackdropImagesTVSeries, CastTV, TVSeries, TVSeriesTrending } from '@/types/TVSeries.type'

interface TVDetailData {
  colorLiker?: string
}

export default function TVSeriesDetails({ colorLiker = '#4CAF50' }: TVDetailData) {
  const { tvID } = useParams()
  const navigate = useNavigate()

  const [mouseHoverImages, setMouseHoverImages] = useState(
    'https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/SqAZjEqqBAYvyu3KSrWq1d0QLB.jpg'
  )
  const id = getIdFromNameId(tvID as string)
  const { data: dataImages } = useQuery({
    queryKey: ['IMG_TVDetail', id],
    queryFn: () => TVSeriesApi.getIMG(Number(id))
  })
  const { data: dataTrailer } = useQuery({
    queryKey: ['dataTrailerLatest', []],
    queryFn: () =>
      ListApi.UpcomingList({
        language: 'en'
      })
  })
  const dataTrailerLatest = dataTrailer?.data.results
  const { data: dataTVDetails, isLoading } = useQuery({
    queryKey: ['dataTVDetail', id],
    queryFn: () => TVSeriesApi.getTVSeriesDetails(Number(id))
  })
  const { data: dataYoutube_MovieDetails } = useQuery({
    queryKey: ['videosDetails_MovieDetail', id],
    queryFn: () => ListApi.getVideosList(Number(id)),
    staleTime: 0
  })
  const { data: dataCredits } = useQuery({
    queryKey: ['credit_MovieDetail', id],
    queryFn: () => TVSeriesApi.getSeason(Number(id))
  })
  const { data: dataRecommendationsDetails } = useQuery({
    queryKey: ['Recommendations_MovieDetails', id],
    queryFn: () => TVSeriesApi.getRecommendation(Number(id))
  })
  const { data: dataKeywords } = useQuery({
    queryKey: ['keyWords_MovieDetails', id],
    queryFn: () => TVSeriesApi.getKeyWords(Number(id))
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataKeywordsDetails = dataKeywords?.data.results.map((ele: any) => ele.name)
  const dataImg: SuccessResponse<BackdropImagesTVSeries[]> | undefined = dataImages?.data
  const dataCredit = dataCredits?.data.cast

  const dataRecommendations = dataRecommendationsDetails?.data.results

  const dataRecommendations_filter = dataRecommendations?.filter(
    (items: TVSeriesTrending) => items.backdrop_path !== null
  )
  console.log('dataRecommendations', dataRecommendations)

  const dataMovieDetails_Videos: videosDetails | undefined = dataYoutube_MovieDetails?.data.results[0]

  const dataTV: TVSeries | undefined = dataTVDetails?.data

  const percentage = Math.round((dataTV?.vote_average as number) * 10)
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  if (percentage < 70 && percentage >= 30) {
    colorLiker = '#b9d13f'
  } else if (percentage < 30) {
    colorLiker = '#ed2133'
  }
  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    return `${hours}h ${minutes}m`
  }
  const handleLikeImg = () => {
    toast.success('You have successfully rated the image.')
  }

  const imageUrl = `${configBase.imageBaseUrl}${dataTV?.backdrop_path || dataTV?.poster_path}`
  useEffect(() => {
    if (isLoading) {
      return
    }
  }, [dataTV])

  return (
    <div className='my-8'>
      <div className='relative h-[520px] '>
        <DynamicMovieBackdrop imageUrl={imageUrl}>
          <div className='container'>
            <div className=' grid grid-cols-12 z-20 relative'>
              <div className='col-span-3 h-[450px]'>
                <div className='relative group w-full h-full'>
                  <Dialog>
                    <DialogTrigger className='h-full w-full'>
                      <img src={imageUrl} alt='' className='object-cover h-full w-full rounded-xl shadow-sm' />

                      <div className='absolute inset-0 bg-[#001a1a]/80 backdrop-blur-[2px] group-hover:opacity-100 opacity-0 transition-all duration-300 rounded-xl flex items-center justify-center'>
                        <button className='flex items-center gap-2 px-5 py-2.5 bg-[#001a1a]/60 backdrop-blur-sm rounded-lg border border-white/10 text-white/90 hover:text-white'>
                          <Expand size={16} />
                          <span>Expand</span>
                        </button>
                      </div>
                    </DialogTrigger>
                    <DialogContent className='max-w-[900px] w-[80vw]'>
                      <DialogHeader>
                        <DialogDescription className='flex'>
                          <Carousel className='w-[500px] h-[450px] mr-10'>
                            <CarouselContent>
                              {(dataImg?.posters as BackdropImages[])?.map((dataImages_item: BackdropImages) => (
                                <CarouselItem key={dataImages_item.iso_639_1}>
                                  <Card>
                                    <CardContent>
                                      {dataImages_item.file_path && (
                                        <img
                                          src={`${configBase.imageBaseUrl}${dataImages_item.file_path}`}
                                          alt=''
                                          className='h-[440px] w-[600px] object-cover object-center'
                                        />
                                      )}
                                    </CardContent>
                                  </Card>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                          </Carousel>

                          <div className='w-[70%] mt-[100px] ml-8'>
                            <div className='flex w-full justify-between'>
                              <img
                                onClick={handleLikeImg}
                                className=' size-8'
                                src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-452-hand-dislike-d97408deec38f6595c7b2e40eadb649ef2beee92df579b3f88095e9c183ca92e.svg'
                                alt=''
                              />
                              <img
                                onClick={handleLikeImg}
                                className='size-8'
                                src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-451-hand-like-10db6816d1483cba3abf2e8a9e9133b3441882c804f6d3c2283aa946aca674a0.svg'
                                alt=''
                              />
                            </div>

                            <div className='flex mt-12 justify-between'>
                              <div className='text-black font-semibold'>Info</div>
                              <img
                                src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-218-lock-open-e3ddaaf88cb0c2f1c62bf0620eaaacd12522f0f589c77e523c659d7f3f2a1e89.svg'
                                alt=''
                                className='size-5'
                              />
                            </div>
                            <div className='border-b-[1px] border-gray-200 mt-4'></div>
                            <div className='mt-3'>Primary?</div>
                            <div className='mt-3'>
                              <div className='text-gray-400'>Added By</div>
                              <div className='text-black font-semibold'>{}</div>
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className='col-span-9 ml-6 text-white'>
                <div className='capitalize font-semibold text-2xl'>{dataTV?.original_name}</div>
                <div className='flex'>
                  {dataTV?.first_air_date}({dataTV?.origin_country[0]})<div className='ml-1 text-white'>{'•'}</div>
                  {dataTV?.genres.map((item) => (
                    <div key={item.id} className='flex'>
                      <div className='cursor-pointer mx-1 '>{item.name}</div>,
                    </div>
                  ))}
                  <div className='ml-2'> Time: {formatRuntime(dataTV?.episode_run_time[0] as number)}</div>
                </div>
                <div className='w-[310px] h-20 flex mt-3 items-center text-center justify-center'>
                  <svg className='w-auto h-full hover:scale-150 transition-all cursor-pointer' viewBox='0 0 40 40'>
                    <circle
                      className='text-gray-700'
                      strokeWidth='3'
                      stroke='currentColor'
                      fill='transparent'
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
                    <text
                      x='20.15'
                      y='24.45'
                      className='percentage font-semibold'
                      textAnchor='middle'
                      fill='white'
                      fontSize='13'
                    >
                      {percentage}%
                    </text>{' '}
                  </svg>
                  <div className=''>User Score</div>
                  <div className=' flex w-full ml-4 translate-x-3  text-white items-center'>
                    <div className='flex w-[90%] cursor-pointer bg-blue-950 rounded-xl text-center justify-center items-center'>
                      <RatingTVDetails idTV={Number(id)} percentage={percentage} dataTV={dataTV} />

                      <img
                        className='size-4 translate-y-[1px] ml-1 bg-white rounded-full '
                        src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-636-circle-info-06837a451a09552349b182d84ae84f26308efee8f7e8ddca255bd5dbc4a66ea4.svg'
                        alt=''
                      />
                    </div>
                  </div>
                </div>

                <AddOwnerTVDetails dataTV={dataTV} dataMovieDetails_Videos={dataMovieDetails_Videos} />
                <div className='opacity-50 mt-6'>{dataTV?.tagline}</div>
                <div className=' mt-5'>
                  <h2 className='capitalize text-white font-semibold'>overview</h2>
                  <div className='text-wrap text-gray-300'>{dataTV?.overview}</div>
                </div>
              </div>
            </div>
          </div>{' '}
        </DynamicMovieBackdrop>
      </div>
      <div className='grid grid-cols-12 container w-full'>
        <div className='col-span-9 w-full'>
          <div className='w-full'>
            <div className='mt-9 mb-3 ml-1 font-bold text-2xl'>Top Billed Cast</div>
            <CustomScrollContainer height={470} width='100%'>
              <div className='flex gap-3 pr-4' style={{ width: 'max-content' }}>
                {(dataCredit as CastMember[])?.map((dataPerformerDetails: CastMember) => (
                  <Link
                    to={`${path.person}/${generateNameId({ name: dataPerformerDetails?.name as string, id: dataPerformerDetails.id })}`}
                    key={dataPerformerDetails.cast_id}
                    className='max-w-full rounded-t-sm bg-white shadow-xl'
                  >
                    <RenderDetailsMovie key={dataPerformerDetails.id} dataMovieDetails={dataPerformerDetails} />
                    <div className='p-2 text-black font-semibold'>
                      {dataPerformerDetails.name || dataPerformerDetails.original_name}
                    </div>
                    <div className='p-2 text-gray-400  max-w-[150px]'>{dataPerformerDetails.character}</div>
                  </Link>
                ))}
              </div>
            </CustomScrollContainer>
          </div>
          <Cast_CrewTVDetails
            setMouseHoverImages={setMouseHoverImages}
            dataImages={dataImg}
            dataTrailerLatest={dataTrailerLatest}
          />
          <div className='border-b-[1px] border-gray-300 my-5'></div>
          <div className='border-b-[1px] border-gray-300 my-5'></div>
          <div className='text-xl font-bold text-black'>Recommendation</div>
          <CustomScrollContainer height={330} width='100%'>
            <div className='flex gap-3 pr-4' style={{ width: 'max-content' }}>
              {dataRecommendations ? (
                dataRecommendations_filter?.map((dataPerformerDetails: TVSeriesTrending) => (
                  <div key={dataPerformerDetails.id} className='max-w-full rounded-t-sm bg-white shadow-xl '>
                    <RenderMovies
                      CustomIMG='object-top'
                      typeText='text-teal-500'
                      key={dataPerformerDetails.id}
                      configWidth_Height='w-[400px] h-[270px]'
                      dataTrending={dataPerformerDetails}
                    />
                    <div className='p-2 font-semibold'>
                      {(dataPerformerDetails as TVSeriesTrending).title || dataPerformerDetails.original_name}
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  We don't have enough data to suggest any TV shows based on Hidden. You can help by rating TV shows
                  you've seen.
                </div>
              )}
            </div>
          </CustomScrollContainer>
        </div>
        <div className='col-span-3 flex flex-col text-black p-6 ml-3'>
          <div className='mt-6'>
            <div className='capitalize font-semibold text-sm mb-1'>original name</div>
            <div className='text-sm'>{dataTV?.original_name}</div>
          </div>
          <div className='mt-6'>
            <div className='capitalize font-semibold text-sm mb-1'>Status</div>
            <div className='text-sm'>{dataTV?.status}</div>
          </div>
          <div className='mt-6'>
            <div className='capitalize font-semibold text-sm mb-1'>Original Language</div>
            <div className='text-sm'>{dataTV?.original_language}</div>
          </div>
          <div className='mt-6'>
            <div className='capitalize font-semibold text-sm mb-1'>network</div>
            <div className='text-xl text-red-800 font-bold'>NOW</div>
          </div>
          <div className='mt-6'>
            <div className='capitalize font-semibold text-sm mb-1'>type</div>

            <div className='text-sm'>{dataTV?.type}</div>
          </div>
          <div className='mt-10'>
            <div>Keywords</div>
            {dataKeywordsDetails?.length ? (
              <div className='grid  lg:grid-cols-3 md:grid-cols-1 text-center'>
                {dataKeywordsDetails?.map((item: string) => (
                  <Link to={''} className='bg-gray-300 text-sm mr-2 mb-2 text-black shadow-sm rounded-sm p-2 truncate'>
                    {item}
                  </Link>
                ))}
              </div>
            ) : (
              <div className='text-sm w-full flex'>No keywords have been added</div>
            )}
          </div>
          <div className='border-b-[1px] border-gray-300 my-5'></div>
          <div>
            <div className='text-xl font-semibold capitalize'>content score</div>
            <div className='mt-2 block'>
              <div className='rounded-t-sm text-white w-full p-2 font-semibold bg-black'>100</div>
              <div className='rounded-b-sm bg-gray-300 text-sm p-2'>Yes! Looking good!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
