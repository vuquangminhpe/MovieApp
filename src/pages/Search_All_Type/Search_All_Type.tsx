import { Key, useMemo, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover'
import { useQuery } from '@tanstack/react-query'
import { SearchApi } from '@/Apis/SearchApi'
import configBase from '@/constants/config'
import { companies, typeSearchKeyWord } from '@/types/Search.type'
import { Movie, MovieTrendings } from '@/types/Movie'
import { PersonDetail } from '@/types/Person'
import { TVSeries } from '@/types/TVSeries.type'
import { Collection } from '@/types/Collection.type'
type ActiveLinkDataType = {
  [x: string]: any
  name: string
  link: string
  data_results?: number
  dataAll?: Movie | Collection | companies | MovieTrendings | PersonDetail | TVSeries
}
export default function Search_All_Type() {
  const navigate = useNavigate()
  const location = useLocation()
  const [suggest, setSuggest] = useState<boolean>(false)
  const querySearch = location.search.split('=')[1]
  const { data: dataSearchMovie } = useQuery({
    queryKey: ['dataSearchMovie', querySearch],
    queryFn: () =>
      SearchApi.Search_AllMovie({
        query: querySearch,
        language: 'en',
        page: 1
      })
  })
  const { data: dataSearchCollection } = useQuery({
    queryKey: ['dataSearchCollection', querySearch],
    queryFn: () =>
      SearchApi.SearchCollection({
        query: querySearch,
        language: 'en',
        page: 1
      })
  })
  const { data: dataSearchCompany } = useQuery({
    queryKey: ['dataSearchCompany', querySearch],
    queryFn: () =>
      SearchApi.SearchCompany({
        query: querySearch,
        language: 'en',
        page: 1
      })
  })
  const { data: dataSearchNetWorks } = useQuery({
    queryKey: ['dataSearchNetWorks', querySearch],
    queryFn: () =>
      SearchApi.SearchMulti({
        query: querySearch,
        language: 'en',
        page: 1
      })
  })
  const { data: dataSearchPerson } = useQuery({
    queryKey: ['dataSearchPerson', querySearch],
    queryFn: () =>
      SearchApi.SearchPerson({
        query: querySearch,
        language: 'en',
        page: 1
      })
  })
  const { data: dataSearchTV } = useQuery({
    queryKey: ['dataSearchTV', querySearch],
    queryFn: () =>
      SearchApi.SearchTV({
        query: querySearch,
        language: 'en',
        page: 1
      })
  })
  const { data: dataSearchKeywords } = useQuery({
    queryKey: ['dataSearchKeywords', querySearch],
    queryFn: () =>
      SearchApi.SearchKeyWord_ALL({
        query: querySearch,
        language: 'en',
        page: 1
      })
  })
  const dataS_MV = dataSearchMovie?.data
  const dataS_CLT = dataSearchCollection?.data
  const dataS_CPN = dataSearchCompany?.data
  const dataS_NW = dataSearchNetWorks?.data
  const dataS_PS = dataSearchPerson?.data
  const dataS_TV = dataSearchTV?.data
  const dataS_KW = dataSearchKeywords?.data
  const activeLink = [
    {
      name: 'TV Shows',
      link: 'tv',
      data_results: dataS_TV?.total_results,
      dataAll: dataS_TV?.results
    },
    {
      name: 'People',
      link: 'person',
      data_results: dataS_PS?.total_results,
      dataAll: dataS_PS?.results
    },
    {
      name: 'Movies',
      link: 'movie',
      data_results: dataS_MV?.total_results,
      dataAll: dataS_MV?.results
    },
    {
      name: 'Collections',
      link: 'collection',
      data_results: dataS_CLT?.total_results,
      dataAll: dataS_CLT?.results
    },
    { name: 'Companies', link: 'company', data: dataS_CPN?.total_results, dataAll: dataS_CPN?.results },
    {
      name: 'Keywords',
      link: 'keyword',
      data_results: dataS_KW?.total_results,
      dataAll: dataS_KW?.results
    },
    { name: 'Networks', link: 'network', data_results: dataS_NW?.total_results, dataAll: dataS_NW?.results }
  ]
  const currentPath = location.pathname.split('/')[2]

  const filteredLinks = useMemo(() => {
    return activeLink.filter((item: any) => item.link === currentPath)
  }, [currentPath])
  console.log(filteredLinks)

  return (
    <div className='flex flex-col'>
      <Popover>
        <PopoverTrigger>
          {' '}
          <div className='flex w-full justify-around pt-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-5 w-[10%] lg:translate-x-[90px] lg:translate-y-3 '
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>

            <input
              onChange={() => setSuggest(true)}
              type='text'
              placeholder={`${querySearch}...`}
              className='w-[90%]  p-3'
            />
          </div>
        </PopoverTrigger>
        {suggest && <PopoverContent>Place content for the popover here.</PopoverContent>}
      </Popover>

      <div className='border-b border-gray-300'></div>

      <div className='mt-7 container flex'>
        <div className='flex flex-col ml-3 w-56'>
          <div className='rounded-t-xl bg-[#00bcd4] capitalize h-14 font-semibold text-sm text-start items-center p-4'>
            Search Results
          </div>
          <div className='flex flex-col shadow-xl mt-1 rounded-b-xl'>
            {activeLink.map((itemActive: any) => (
              <NavLink
                key={itemActive.name}
                to={`/search/${itemActive.link}?query=${querySearch}`}
                className={({ isActive }) =>
                  `flex justify-between p-3 gap-3 ${isActive ? 'bg-gray-200 text-black font-bold' : ''}`
                }
              >
                <div>{itemActive.name}</div>
                <div className='text-end bg-gray-100 rounded-sm px-3'>
                  {itemActive.data_results as unknown as number}
                </div>
              </NavLink>
            ))}
          </div>
        </div>
        <div className=''>
          {(filteredLinks[0]?.dataAll as any)?.map((itemActive: any) => {
            return (
              <div className='flex rounded-xl shadow-xl h-32 w-full' key={itemActive.name}>
                (
                <img
                  src={`${configBase.imageBaseUrl}${
                    itemActive?.backdrop_path ||
                    itemActive?.logo_path ||
                    itemActive?.profile_path ||
                    itemActive.known_for.poster_path ||
                    itemActive?.known_for[0].poster_path
                  }`}
                  alt=''
                />
                )
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
