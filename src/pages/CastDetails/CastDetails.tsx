/* eslint-disable react-hooks/exhaustive-deps */
import { PersonDetailsApi } from '@/Apis/PersonDetailsApi'
import CustomScrollContainer from '@/Components/Custom/CustomScrollContainer'
import Popover from '@/Components/Custom/Popover/Popover'
import RenderMovies from '@/Components/RenderMovies/RenderMovie'
import configBase from '@/constants/config'
import path from '@/constants/path'
import { Gender } from '@/constants/person.enum'
import { Movie, MovieTrendings } from '@/types/Movie'
import { generateNameId, getIdFromNameId } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

export default function CastDetails() {
  const [filterActing, setFilterActing] = useState<string>('desc')
  const { personId } = useParams()

  const [searchParams, setSearchParams] = useSearchParams()
  const mediaType = searchParams.get('credit_media_type')
  const personIdCast = getIdFromNameId(personId as string)
  const { data: dataPersons } = useQuery({
    queryKey: ['dataPersons', personIdCast],
    queryFn: () => PersonDetailsApi.getPersonDetails(Number(personIdCast))
  })
  const { data: dataExternalIds } = useQuery({
    queryKey: ['dataExternalIds', personIdCast],
    queryFn: () => PersonDetailsApi.getExternalIds(Number(personIdCast))
  })
  const { data: dataCreditsPerson } = useQuery({
    queryKey: ['dataCreditsPerson', personIdCast],
    queryFn: () => PersonDetailsApi.getMovie_credits(Number(personIdCast))
  })
  const { data: data_tv_CreditsPerson } = useQuery({
    queryKey: ['data_tv_CreditsPerson', personIdCast],
    queryFn: () => PersonDetailsApi.getMovie_tv_credits(Number(personIdCast))
  })
  const dataCredits = dataCreditsPerson?.data.cast
  const dataPerson = dataPersons?.data
  const dataExternal = dataExternalIds?.data
  const dataTvCredits = data_tv_CreditsPerson?.data.cast
  const credits_TV = dataTvCredits?.map((item: Movie) => ({
    ...item,
    media_type: 'tv'
  }))
  const credits_Movie = dataCredits?.map((item: MovieTrendings) => ({ ...item, media_type: 'movie' }))
  const MEDIA_OPTIONS = [
    { value: 'all', label: 'All' },
    { value: 'movie', label: 'Movies' },
    { value: 'tv', label: 'TV Shows' }
  ]

  const SORT_OPTIONS = [
    { value: 'desc', label: 'Newest First' },
    { value: 'asc', label: 'Oldest First' },
    { value: 'all', label: 'All' }
  ]

  const handleSortChange = (value: string) => {
    setFilterActing(value)
  }
  const handleChangeMediaType = (type: string) => {
    if (type === 'all') {
      searchParams.delete('credit_media_type')
    } else {
      searchParams.set('credit_media_type', type)
    }
    setSearchParams(searchParams)
  }

  let allActingPerson = []
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const genderName = Object.entries(Gender).find(([key, value]) => value === dataPerson?.gender)?.[0] || 'Unknown'
  if (credits_Movie && credits_TV) {
    allActingPerson = credits_Movie.concat(credits_TV)
  }
  const filteredAndSortedList = useMemo(() => {
    let filtered = allActingPerson

    if (searchParams.get('credit_media_type')) {
      filtered = allActingPerson.filter((item: Movie) => item.media_type === searchParams.get('credit_media_type'))
    }

    if (filterActing !== 'all') {
      return filtered.sort((a: Movie, b: Movie) => {
        const dateA = new Date(a.release_date || a.first_air_date).getTime()
        const dateB = new Date(b.release_date || b.first_air_date).getTime()
        return filterActing === 'desc' ? dateB - dateA : dateA - dateB
      })
    }

    return filtered
  }, [allActingPerson, filterActing, searchParams])

  return (
    <div className='container my-5'>
      <div className='grid grid-cols-12 max-lg:flex max-lg:flex-col'>
        <div className='col-span-3 flex lg:flex-col max-lg:flex max-lg:ml-2'>
          <div className='max-lg:mr-4'>
            <img
              className='w-[300px] h-[400px] object-cover shadow-xl rounded-sm'
              src={`${configBase.imageBaseUrl}${dataPerson?.profile_path}`}
              alt=''
            />
            <div className='mt-6 flex gap-4'>
              <a href={`https://www.facebook.com/${dataExternal?.facebook_id}`} target='_blank'>
                <img
                  src='https://www.themoviedb.org/assets/2/v4/glyphicons/social/facebook-2c5718e4ece8eb3a3cc49ae97000e541c0aad50869b419b5aa579693bc0ad059.svg'
                  alt=''
                  className='size-7 cursor-pointer max-lg:size-5'
                />
              </a>
              <a href={`https://x.com/${dataExternal?.twitter_id}`} target='_blank'>
                <img
                  src='https://www.themoviedb.org/assets/2/v4/glyphicons/social/twitter-a6ff8c172b8e086f4a64578cee0a16676c1a067b47a1b1b186d58795d241a852.svg'
                  alt=''
                  className='size-7 cursor-pointer max-lg:size-5 '
                />
              </a>
              <a href={`https://www.instagram.com/${dataExternal?.instagram_id}`} target='_blank'>
                <img
                  src='https://www.themoviedb.org/assets/2/v4/glyphicons/social/instagram-74e6299c864adc384258da3b3a8eb09282b7ccda4dd1dfa9a4158ba2ea8583b9.svg'
                  alt=''
                  className='size-7 cursor-pointer max-lg:size-5'
                />
              </a>
              <a href={`https://www.tiktok.com/${dataExternal?.tiktok_id}`} target='_blank'>
                <img
                  src='https://www.themoviedb.org/assets/2/v4/glyphicons/social/tiktok-69d6a5d09a7fd09b663fa45337fa05cbfc4cbf16b45d72d9962b036a9e2702b4.svg'
                  alt=''
                  className='size-7 cursor-pointer max-lg:size-5'
                />
              </a>
              <a href={`https://www.youtube.com/${dataExternal?.youtube_id}`} target='_blank'>
                <img
                  src='https://www.themoviedb.org/assets/2/v4/glyphicons/social/youtube-de379f898e1a71c488c71075eb00f5c003699069b9cb1f38c8ac7ea99c8a6338.svg'
                  alt=''
                  className='size-7 cursor-pointer max-lg:size-5'
                />
              </a>
            </div>
          </div>

          <div className='mt-6'>
            <div className='capitalize text-xl font-semibold'>personal info</div>
            <div className='capitalize text-sm mt-2'>
              <div className='font-semibold'>known for</div>
              <div>{dataPerson?.known_for_department}</div>
            </div>
            <div className='capitalize text-sm mt-2'>
              <div className='font-semibold'>Gender</div>
              <div>{genderName}</div>
            </div>
            <div className='capitalize text-sm mt-2'>
              <div className='font-semibold'>birthday</div>
              <div>{dataPerson?.birthday}</div>
            </div>
            <div className='capitalize text-sm mt-2'>
              <div className='font-semibold'>place of birth</div>
              <div>{dataPerson?.place_of_birth}</div>
            </div>
            <div className='capitalize text-sm mt-2'>
              <div className='font-semibold'>also knows as</div>
              <div className='flex flex-col'>
                {dataPerson?.also_known_as.map((item) => (
                  <div key={`${item}`} className='mt-2'>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className='capitalize text-sm mt-2'>
              <div className='font-semibold'>content score</div>
              <div className='mt-3'>
                <div className='p-2 w-full mr-2 bg-gray-300 rounded-t-md'>100</div>
                <div className='p-2 w-full mr-2 bg-gray-500 rounded-b-md'>yes! looking good!</div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-9 flex flex-col overflow-hidden text-start'>
          <div className='text-3xl font-bold '>{dataPerson?.name}</div>
          <div className=' mt-6'>
            <div className='capitalize text-xl mb-2 font-semibold'>biography</div>
            <div className='line-clamp-6'>{dataPerson?.biography}</div>
            <div className='text-right text-customeBlue font-bold cursor-pointer hover:text-green-300'>Read More</div>
          </div>
          <div className='mt-4'>
            <div className='capitalize font-semibold text-xl'>known for</div>
            <CustomScrollContainer height={400} width='100%'>
              <div className='flex gap-3 pr-4' style={{ width: 'max-content' }}>
                {dataCredits?.map((dataPerformerDetails: Movie) => (
                  <div key={dataPerformerDetails.id} className='max-w-full rounded-t-sm bg-white shadow-xl '>
                    <RenderMovies
                      CustomIMG='object-top'
                      typeText='text-teal-500'
                      key={dataPerformerDetails.id}
                      configWidth_Height='w-[150px] h-[250px]'
                      dataTrending={dataPerformerDetails}
                      movie_id={0}
                      setMovieId={function (): void {
                        throw new Error('Function not implemented.')
                      }}
                      voteRate={0}
                    />
                    <div className='p-2 font-semibold line-clamp-3 max-w-[100px]'>
                      {(dataPerformerDetails as Movie).title || dataPerformerDetails.original_name}
                    </div>
                  </div>
                ))}
              </div>
            </CustomScrollContainer>
          </div>
          <div className='mt-4'>
            <div className='flex justify-between items-center'>
              <div className='font-bold text-xl'>Acting</div>
              <div className='flex gap-4'>
                <Popover
                  renderPopover={
                    <div className='flex flex-col items-center gap-4'>
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleSortChange(option.value)}
                          className={`px-4 py-2 rounded-md ${
                            filterActing === option.value ? 'bg-blue-600 text-white' : 'bg-gray-100'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  }
                >
                  <button className='px-4 py-2 bg-gray-100 rounded-md'>
                    {filterActing === 'desc' ? 'Newest First' : filterActing === 'asc' ? 'Oldest First' : 'All'}
                  </button>
                </Popover>

                <Popover
                  renderPopover={
                    <div className='flex flex-col cursor-pointer items-center gap-4'>
                      {MEDIA_OPTIONS.map((option) => (
                        <div
                          onClick={() => handleChangeMediaType(option.value)}
                          key={option.value}
                          className={`px-4 py-2 rounded-md ${
                            mediaType === option.value ? 'bg-blue-600 text-white' : 'bg-gray-100'
                          }`}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  }
                >
                  <button className='px-4 py-2 bg-gray-100 rounded-md'>
                    {mediaType ? MEDIA_OPTIONS.find((opt) => opt.value === mediaType)?.label : 'All Media'}
                  </button>
                </Popover>
              </div>
            </div>
            <div className='w-full'>
              {filteredAndSortedList?.map((itemActingPerson: Movie) => (
                <div key={itemActingPerson.id} className='mt-4 rounded-sm shadow-xl w-full'>
                  <div className='flex items-center p-6 gap-4'>
                    <div className='w-16 text-center'>
                      {itemActingPerson.release_date ? new Date(itemActingPerson.release_date).getFullYear() : '—'}
                    </div>

                    <div className='w-8'>
                      <Popover
                        onEvent='onClick'
                        show={true}
                        children={
                          <div className='border-2 rounded-full border-gray-950 w-3 h-3 flex items-center justify-center cursor-pointer hover:bg-gray-100'>
                            <div className='rounded-full w-[7px] h-[7px] hover:bg-black'></div>
                          </div>
                        }
                        renderPopover={
                          <div className='bg-blue-950 max-w-[700px] rounded-sm shadow-sm'>
                            <div className='p-3 flex gap-4'>
                              <img
                                className='w-[120px] h-[200px] object-cover rounded-sm'
                                src={`${configBase.imageBaseUrl}${itemActingPerson.poster_path}`}
                                alt=''
                              />
                              <div className='flex flex-col gap-2'>
                                <div className='flex items-center gap-2'>
                                  <h3 className='font-bold text-white text-xl'>{itemActingPerson.name}</h3>
                                  <div className='bg-customeBlue px-3 py-1 rounded-sm flex items-center gap-1'>
                                    <img
                                      className='w-5 h-5'
                                      src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-49-star-67a24f6d4324aa644c594653e762b1c0de2b3e1ce0852171cfa49cc2650de374.svg'
                                      alt='star'
                                    />
                                    <span className='text-white'>
                                      {Math.floor(itemActingPerson.vote_average as number)}
                                    </span>
                                  </div>
                                </div>
                                <p className='text-white line-clamp-2'>{itemActingPerson.overview}</p>
                              </div>
                            </div>
                          </div>
                        }
                      />
                    </div>

                    <div className='flex-1'>
                      <div className='flex items-center text-black'>
                        <Link
                          to={`${path.movie}/${generateNameId({ name: (itemActingPerson.original_name as string) || (itemActingPerson.original_title as string), id: itemActingPerson.id as number })}`}
                          className='font-medium hover:text-blue-600'
                        >
                          {itemActingPerson.original_name || itemActingPerson.original_title}
                        </Link>
                        <span className='text-gray-400 mx-3 '>as</span>
                        <span className='hover:text-blue-600'>
                          {itemActingPerson.character ? itemActingPerson.character : 'No Acting'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
