/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate, useParams } from 'react-router-dom'
import { generateNameId, getIdFromNameId } from '../../utils/utils'
import { useQuery } from '@tanstack/react-query'
import { ListApi } from '../../Apis/ListApi'
import configBase from '../../constants/config'
import { BackdropImages, MovieTrendings } from '../../types/Movie'

import { useCallback, useEffect, useMemo, useState } from 'react'
import DynamicMovieBackdrop from '../../Components/Custom/DynamicMovieBackdrop'
import CustomScrollContainer from '../../Components/Custom/CustomScrollContainer'

import RenderMovies from '@/Components/RenderMovies/RenderMovie'
import path from '@/constants/path'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/Components/ui/carousel'
import { Card, CardContent } from '@/Components/ui/card'

import { Expand } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/Components/ui/dialog'
import { toast } from 'react-toastify'
import RatingTVDetails from './RatingTVDetails'
import AddOwnerTVDetails from './AddOwnerTVDetails'
import Cast_CrewTVDetails from './Cast_CrewTVDetails'
import { TVSeriesApi } from '@/Apis/TVSeriesApi'
import { Aggregate_Credits, keywordsTVSeries, ReviewTVSeries, Season, TVSeriesTrending } from '@/types/TVSeries.type'
import RenderTVDetails from '@/Components/RenderMovies/RenderTVDetails'

interface TVDetailData {
  colorLiker?: string
}
export default function TVSeriesDetails({ colorLiker = '#4CAF50' }: TVDetailData) {
  const [tvIds, setTVIds] = useState<number>()
  const { tvID } = useParams()
  const navigate = useNavigate()
  const [mouseHoverImages, setMouseHoverImages] = useState(
    'https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/SqAZjEqqBAYvyu3KSrWq1d0QLB.jpg'
  )

  const id = useMemo(() => getIdFromNameId(tvID as string), [tvID])

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

  const dataTrailerLatest = useMemo(() => dataTrailer?.data.results, [dataTrailer])

  const { data: dataTVDetails, isLoading } = useQuery({
    queryKey: ['dataTVDetail', id],
    queryFn: () => TVSeriesApi.getTVSeriesDetails(Number(id))
  })

  const { data: dataYoutube_MovieDetails } = useQuery({
    queryKey: ['videosDetails_TVDetail', id],
    queryFn: () => ListApi.getVideosList(Number(id)),
    staleTime: 0
  })

  const { data: dataCredits } = useQuery({
    queryKey: ['credit_TVDetail', id],
    queryFn: () => TVSeriesApi.getAggregateCredits(Number(id))
  })

  const { data: dataRecommendationsDetails } = useQuery({
    queryKey: ['Recommendations_TVDetails', id],
    queryFn: () => TVSeriesApi.getRecommendation(Number(id))
  })

  const { data: dataKeywords } = useQuery({
    queryKey: ['keyWords_TVDetails', id],
    queryFn: () => TVSeriesApi.getKeyWords(Number(id))
  })

  const { data: dataReviewsTV } = useQuery({
    queryKey: ['ReviewsTV_TVDetails', id],
    queryFn: () => TVSeriesApi.getReviews(Number(id))
  })

  const dataKeywordsDetails = useMemo(() => dataKeywords?.data.results, [dataKeywords])

  const dataImg = useMemo(() => dataImages?.data, [dataImages])

  const dataCredit = useMemo(() => dataCredits?.data.cast, [dataCredits])

  const data_Roles = useMemo(() => dataCredit?.map((itemRole) => itemRole.roles), [dataCredit])

  const dataReviews_TV = useMemo(() => dataReviewsTV?.data.results, [dataReviewsTV])

  const dataRecommendations = useMemo(() => dataRecommendationsDetails?.data.results, [dataRecommendationsDetails])

  const dataRecommendations_filter = useMemo(
    () => dataRecommendations?.filter((items: TVSeriesTrending) => items.backdrop_path !== null),
    [dataRecommendations]
  )

  const dataMovieDetails_Videos = useMemo(() => dataYoutube_MovieDetails?.data.results[0], [dataYoutube_MovieDetails])

  const dataTV = useMemo(() => dataTVDetails?.data, [dataTVDetails])

  const percentage = useMemo(() => Math.round((dataTV?.vote_average as number) * 10), [dataTV?.vote_average])

  const radius = 18
  const circumference = 2 * Math.PI * radius

  const strokeDashoffset = useMemo(() => circumference - (percentage / 100) * circumference, [percentage])

  colorLiker = useMemo(() => {
    if (percentage < 70 && percentage >= 30) {
      return '#b9d13f'
    } else if (percentage < 30) {
      return '#ed2133'
    }
    return '#00e600'
  }, [percentage])

  const formatRuntime = useCallback((runtime: number) => {
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    return `${hours}h ${minutes}m`
  }, [])

  const handleLikeImg = useCallback(() => {
    toast.success('You have successfully rated the image.')
  }, [])

  const extendedDataRated = useMemo(
    () => dataRecommendations?.find((item: MovieTrendings) => (item.id as number | undefined) === tvIds),
    [dataRecommendations, tvIds]
  )

  const imageUrl = useMemo(
    () => `${configBase.imageBaseUrl}${dataTV?.backdrop_path || dataTV?.poster_path}`,
    [dataTV?.backdrop_path, dataTV?.poster_path]
  )

  useEffect(() => {
    if (isLoading) {
      return
    }
  }, [isLoading])

  if (isLoading) {
    return null
  }

  return (
    <div className='my-8'>
      <div className='relative h-[520px] max-md:h-[950px]'>
        <DynamicMovieBackdrop imageUrl={imageUrl}>
          <div className='container'>
            <div className=' grid grid-cols-12 z-20 max-md:h-[930px] relative max-sm:flex max-md:flex-col'>
              <div className='col-span-3 h-[450px] '>
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
                    <DialogContent className='w-[40vw] max-sm:w-[95vw] max-w-7xl max-h-[90vh] overflow-y-auto'>
                      <DialogHeader>
                        <DialogDescription className='flex flex-col md:flex-row gap-6'>
                          <div className='w-full md:w-[60%] lg:w-[70%]'>
                            <Carousel className='w-full h-auto aspect-[3/4] md:aspect-[3/2]'>
                              <CarouselContent>
                                {(dataImg?.posters as BackdropImages[])?.map((dataImages_item: BackdropImages) => (
                                  <CarouselItem key={dataImages_item.iso_639_1}>
                                    <Card>
                                      <CardContent className='p-0'>
                                        {dataImages_item.file_path && (
                                          <img
                                            src={`${configBase.imageBaseUrl}${dataImages_item.file_path}`}
                                            alt=''
                                            className='w-full h-full object-cover object-center'
                                          />
                                        )}
                                      </CardContent>
                                    </Card>
                                  </CarouselItem>
                                ))}
                              </CarouselContent>
                              <CarouselPrevious className='left-2' />
                              <CarouselNext className='right-2' />
                            </Carousel>
                          </div>

                          <div className='w-full md:w-[40%] lg:w-[30%] space-y-6 mt-20'>
                            <div className='flex justify-between'>
                              <img
                                onClick={handleLikeImg}
                                className='w-8 h-8 cursor-pointer'
                                src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-452-hand-dislike-d97408deec38f6595c7b2e40eadb649ef2beee92df579b3f88095e9c183ca92e.svg'
                                alt='dislike'
                              />
                              <img
                                onClick={handleLikeImg}
                                className='w-8 h-8 cursor-pointer'
                                src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-451-hand-like-10db6816d1483cba3abf2e8a9e9133b3441882c804f6d3c2283aa946aca674a0.svg'
                                alt='like'
                              />
                            </div>

                            <div className='space-y-4'>
                              <div className='flex justify-between items-center'>
                                <div className='text-black font-semibold'>Info</div>
                                <img
                                  src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-218-lock-open-e3ddaaf88cb0c2f1c62bf0620eaaacd12522f0f589c77e523c659d7f3f2a1e89.svg'
                                  alt='lock'
                                  className='w-5 h-5'
                                />
                              </div>
                              <div className='border-b border-gray-200' />
                              <div>Primary?</div>
                              <div>
                                <div className='text-gray-400'>Added By</div>
                                <div className='text-black font-semibold'>{}</div>
                              </div>
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
                  <div className='ml-2'>
                    {' '}
                    Time:{' '}
                    {(dataTV?.episode_run_time[0] as number) > 0
                      ? formatRuntime(dataTV?.episode_run_time[0] as number)
                      : '0h'}
                  </div>
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
                      {percentage > 0 ? `${percentage}%` : 'NR'}
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
                <div className='opacity-50 mt-6 font-serif'>{dataTV?.tagline}</div>
                <div className=' mt-5'>
                  <h2 className='capitalize text-white font-semibold'>overview</h2>
                  <div className='text-wrap text-gray-300'>{dataTV?.overview}</div>
                </div>
                <div className='capitalize text-white font-semibold mt-3'>all creator</div>
                <div className='mt-1 w-full grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-4'>
                  {(data_Roles?.length as number) > 0 ? (
                    data_Roles?.slice(0, 8).map((AllRoles) =>
                      AllRoles?.map((itemRoles) => (
                        <div className='flex gap-1 w-full' key={itemRoles.credits_id}>
                          <div>{itemRoles.character}</div>
                          <div></div>
                        </div>
                      ))
                    )
                  ) : (
                    <div className='w-full flex'>We don't have creator data yet</div>
                  )}
                </div>
              </div>
            </div>
          </div>{' '}
        </DynamicMovieBackdrop>
      </div>
      <div className='grid grid-cols-12 container w-full max-sm:flex max-sm:flex-col'>
        <div className='col-span-9 w-full'>
          <div className='w-full'>
            <div className='mt-9 mb-3 ml-1 font-bold text-2xl '>Series Cast</div>
            {(dataCredit?.length as number) > 0 ? (
              <CustomScrollContainer height={470} width='100%'>
                <div className='max-md:px-3 flex gap-3 pr-4' style={{ width: 'max-content' }}>
                  {(dataCredit as Aggregate_Credits[])?.map((dataPerformerDetails: Aggregate_Credits) => (
                    <Link
                      to={`${path.person}/${generateNameId({ name: dataPerformerDetails?.name as string, id: dataPerformerDetails.id })}`}
                      key={dataPerformerDetails.id}
                      className='max-w-full rounded-t-2xl bg-white shadow-xl'
                    >
                      <RenderTVDetails key={dataPerformerDetails.id} dataTVDetails={dataPerformerDetails} />
                      <div className='p-2 text-black font-semibold'>
                        {dataPerformerDetails.name || dataPerformerDetails.original_name}
                      </div>
                      <div className='p-2 text-gray-400  max-w-[150px]'>{dataPerformerDetails.character}</div>
                    </Link>
                  ))}
                </div>
              </CustomScrollContainer>
            ) : (
              <div>
                <div>We don't have any cast added to this TV Show. </div>
              </div>
            )}
          </div>
          <div className='border-b-[1px] border-gray-300 my-5'></div>
          <div className='my-5'>
            <div className='font-bold capitalize'>current season</div>
            <div className='mt-2 shadow-xl max-sm:mx-3 h-auto rounded-xl'>
              {dataTV?.seasons.slice(0, 5).map((itemSeason: Season) => (
                <div className='flex max-md:flex-col gap-2 mb-4'>
                  <img
                    src={`${configBase.imageBaseUrl}${itemSeason.poster_path || dataTV.poster_path}`}
                    className='h-full w-52 rounded-l-xl'
                    alt=''
                  />
                  <div className='ml-2'>
                    <div className='font-bold text-xl'>{itemSeason.name}</div>
                    <div className='flex gap-1'>
                      <div>{new Date(itemSeason?.air_date).getFullYear()}</div>
                      <div>•</div>
                      <div>{dataTV?.number_of_episodes} Episodes</div>
                    </div>
                    <div>{dataTV?.overview}</div>
                    <div className='flex gap-1 mt-12'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='size-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z'
                        />
                      </svg>
                      <Link
                        to={`${path.OnTvSeries}/${generateNameId({ id: dataTV?.id as number, name: dataTV?.name as string })}${path.season}/${dataTV.number_of_seasons}${path.episode}/${dataTV.seasons[0].season_number}`}
                        className='border-b border-black cursor-pointer'
                      >
                        {dataTV?.next_episode_to_air?.name || dataTV?.last_episode_to_air?.name}
                      </Link>
                      <div>(1x2, {dataTV?.last_episode_to_air?.air_date})</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='border-b-[1px] border-gray-300 my-5'></div>

            <div className='my-12'>
              <div className='flex'>
                <div className='text-xl font-bold text-black'>Social</div>
                <div className='ml-20 text-xl font-bold text-black'>Reviews</div>
              </div>
              <div className='mt-2'>
                {(dataReviews_TV as ReviewTVSeries[])?.length > 0
                  ? dataReviews_TV?.map((itemReviews: ReviewTVSeries) => (
                      <div
                        key={itemReviews.id}
                        className='w-full mb-6 h-36 max-md:flex-col shadow-xl rounded-xl my-2 flex justify-between'
                      >
                        <img
                          src={`${itemReviews?.author_details?.avatar_path}`}
                          className='size-6 rounded-full object-contain'
                          alt=''
                        />
                        <Link to={itemReviews.url} className='text-sm line-clamp-2 max-w-[600px]'>
                          {itemReviews.content}
                        </Link>
                        <div>{itemReviews.author_details.rating}</div>

                        <div className='flex flex-col'>
                          <div className='mr-2'>{new Date(itemReviews.updated_at).toLocaleDateString()}</div>{' '}
                          <div>by {itemReviews.author}</div>
                        </div>
                      </div>
                    ))
                  : `We don't have any reviews for ${dataTV?.name}. Would you like to write one?`}
              </div>
            </div>
            <div className='border-b-[1px] border-gray-300 my-5'></div>
          </div>
          <Cast_CrewTVDetails dataImages={dataImg} dataTrailerLatest={dataTrailerLatest} />
          <div className='border-b-[1px] border-gray-300 my-5'></div>
          <div className='text-xl font-bold text-black dark:text-white mb-2'>Recommendation</div>
          <CustomScrollContainer height={330} width='100%'>
            <div className='flex gap-3 pr-4 max-sm:px-3' style={{ width: 'max-content' }}>
              {(dataRecommendations?.length as number) > 0 ? (
                dataRecommendations_filter?.map((dataPerformerDetails: TVSeriesTrending) => (
                  <div key={dataPerformerDetails.id} className='max-w-full rounded-t-xl bg-white shadow-xl '>
                    <RenderMovies
                      media_type='tv'
                      setMovieId={setTVIds}
                      voteRate={dataPerformerDetails?.vote_average}
                      movie_id={dataPerformerDetails?.id}
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
              <div className='grid  lg:grid-cols-3 md:grid-cols-1 max-sm:grid-cols-4 text-center'>
                {dataKeywordsDetails?.map((item: keywordsTVSeries) => (
                  <Link
                    to={`/keyword/${generateNameId({ name: item?.name as string, id: Number(item?.id) })}/tv`}
                    key={item?.id}
                    className='bg-gray-300 text-sm mr-2 mb-2 text-black shadow-sm rounded-sm p-2 truncate'
                  >
                    {item?.name}
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
