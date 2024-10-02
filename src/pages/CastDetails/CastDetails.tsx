import { PersonDetailsApi } from '@/Apis/PersonDetailsApi'
import CustomScrollContainer from '@/Components/Custom/CustomScrollContainer'
import Popover from '@/Components/Custom/Popover/Popover'
import RenderMovies from '@/Components/RenderMovies/RenderMovie'
import configBase from '@/constants/config'
import { Gender } from '@/constants/person.enum'
import { Movie } from '@/types/Movie'
import { getIdFromNameId } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'

export default function CastDetails() {
  const { personId } = useParams()
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
  let allActingPerson = []
  if (dataTvCredits && dataCredits) {
    allActingPerson = dataTvCredits.concat(dataCredits)
  }
  console.log(allActingPerson)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const genderName = Object.entries(Gender).find(([key, value]) => value === dataPerson?.gender)?.[0] || 'Unknown'

  return (
    <div className='container my-5'>
      <div className='grid grid-cols-12'>
        <div className='col-span-3 flex flex-col'>
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
                className='size-7 cursor-pointer'
              />
            </a>
            <a href={`https://x.com/${dataExternal?.twitter_id}`} target='_blank'>
              <img
                src='https://www.themoviedb.org/assets/2/v4/glyphicons/social/twitter-a6ff8c172b8e086f4a64578cee0a16676c1a067b47a1b1b186d58795d241a852.svg'
                alt=''
                className='size-7 cursor-pointer '
              />
            </a>
            <a href={`https://www.instagram.com/${dataExternal?.instagram_id}`} target='_blank'>
              <img
                src='https://www.themoviedb.org/assets/2/v4/glyphicons/social/instagram-74e6299c864adc384258da3b3a8eb09282b7ccda4dd1dfa9a4158ba2ea8583b9.svg'
                alt=''
                className='size-7 cursor-pointer'
              />
            </a>
            <a href={`https://www.tiktok.com/${dataExternal?.tiktok_id}`} target='_blank'>
              <img
                src='https://www.themoviedb.org/assets/2/v4/glyphicons/social/tiktok-69d6a5d09a7fd09b663fa45337fa05cbfc4cbf16b45d72d9962b036a9e2702b4.svg'
                alt=''
                className='size-7 cursor-pointer'
              />
            </a>
            <a href={`https://www.youtube.com/${dataExternal?.youtube_id}`} target='_blank'>
              <img
                src='https://www.themoviedb.org/assets/2/v4/glyphicons/social/youtube-de379f898e1a71c488c71075eb00f5c003699069b9cb1f38c8ac7ea99c8a6338.svg'
                alt=''
                className='size-7 cursor-pointer'
              />
            </a>
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
                {dataPerson?.also_known_as.map((item) => <div className='mt-2'>{item}</div>)}
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
            <div className='flex justify-between'>
              <div className='font-bold text-xl'>Acting</div>
              <div className='flex gap-2'>
                <div className='hidden bg-customeBlue'>Clear</div>
                <label htmlFor='All'>All</label>
                <select>
                  <option value=''></option>
                  <option value=''></option>
                </select>
              </div>
            </div>
            {allActingPerson?.map((itemActingPerson: Movie) => (
              <div className='mt-4 rounded-sm shadow-xl w-full h-auto'>
                <div className='flex justify-start gap-4 items-center text-center align-top p-6'>
                  <div className='mr-5'>
                    {itemActingPerson.release_date ? new Date(itemActingPerson.release_date).getFullYear() : '—'}
                  </div>
                  <Popover
                    onEvent='onClick'
                    show={true}
                    children={
                      <div className='border-2 rounded-full border-gray-950 size-3 flex justify-center items-center text-center mr-5'>
                        <div className='rounded-full items-center w-[7px] h-[7px] hover:bg-black translate-x-[0.5px] translate-y-[0.3px]'></div>
                      </div>
                    }
                    renderPopover={
                      <div className='bg-blue-950 w-auto h-auto max-w-[700px] rounded-sm shadow-sm'>
                        <div className='p-3 flex gap-2'>
                          <img
                            className='w-[120px] h-[200px] object-cover rounded-sm shadow-sm'
                            src={`${configBase.imageBaseUrl}${itemActingPerson.poster_path}`}
                            alt=''
                          />

                          <div className='ml-3'>
                            <div className='flex gap-2'>
                              <div className='font-bold text-white text-xl'>{itemActingPerson.name}</div>
                              <div className='w-[40px] rounded-sm shadow-sm h-5 p-3 bg-customeBlue flex items-center text-center justify-center'>
                                <img
                                  className='text-white size-5'
                                  src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-49-star-67a24f6d4324aa644c594653e762b1c0de2b3e1ce0852171cfa49cc2650de374.svg'
                                  alt=''
                                />{' '}
                                <div>{Math.floor(itemActingPerson.vote_average as number)}</div>
                              </div>
                            </div>
                            <div className='text-white text-wrap line-clamp-2'>{itemActingPerson.overview}</div>
                          </div>
                        </div>
                      </div>
                    }
                  />
                  <Link to={''} className='text-black flex'>
                    {itemActingPerson.original_name} <div className='text-gray-400 mx-3'>as</div>{' '}
                    {itemActingPerson.character}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
