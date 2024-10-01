import { PersonDetailsApi } from '@/Apis/PersonDetailsApi'
import CustomScrollContainer from '@/Components/Custom/CustomScrollContainer'
import RenderMovies from '@/Components/RenderMovies/RenderMovie'
import configBase from '@/constants/config'
import { Gender } from '@/constants/person.enum'
import { Movie } from '@/types/Movie'
import { getIdFromNameId } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

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
  const dataCredits = dataCreditsPerson?.data.cast
  const dataPerson = dataPersons?.data
  const dataExternal = dataExternalIds?.data
  console.log('data', dataExternal)

  console.log(dataPerson)
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
        </div>
      </div>
    </div>
  )
}
