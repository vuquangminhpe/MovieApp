import { useMemo, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { SearchApi } from '@/Apis/SearchApi'
import configBase from '@/constants/config'

interface SearchResult {
  overview?: string
  name?: string
  original_title?: string
  backdrop_path?: string
  logo_path?: string
  profile_path?: string
  known_for?: any[]
  first_air_date?: string
  release_date?: string
}

interface SearchCategory {
  name: string
  link: string
  queryKey: string
  searchFn: (query: string) => Promise<any>
}

export default function SearchAllType() {
  const location = useLocation()
  const [suggest, setSuggest] = useState(false)
  const querySearch = location.search.split('=')[1]
  const currentPath = location.pathname.split('/')[2]

  const searchCategories: SearchCategory[] = [
    {
      name: 'TV Shows',
      link: 'tv',
      queryKey: 'dataSearchTV',
      searchFn: (query) => SearchApi.SearchTV({ query, language: 'en', page: 1 })
    },
    {
      name: 'People',
      link: 'person',
      queryKey: 'dataSearchPerson',
      searchFn: (query) => SearchApi.SearchPerson({ query, language: 'en', page: 1 })
    },
    {
      name: 'Movies',
      link: 'movie',
      queryKey: 'dataSearchMovie',
      searchFn: (query) => SearchApi.Search_AllMovie({ query, language: 'en', page: 1 })
    },
    {
      name: 'Collections',
      link: 'collection',
      queryKey: 'dataSearchCollection',
      searchFn: (query) => SearchApi.SearchCollection({ query, language: 'en', page: 1 })
    },
    {
      name: 'Companies',
      link: 'company',
      queryKey: 'dataSearchCompany',
      searchFn: (query) => SearchApi.SearchCompany({ query, page: 1 })
    },
    {
      name: 'Keywords',
      link: 'keyword',
      queryKey: 'dataSearchKeywords',
      searchFn: (query) => SearchApi.SearchKeyWord_ALL({ query, language: 'en', page: 1 })
    },
    {
      name: 'Networks',
      link: 'network',
      queryKey: 'dataSearchNetworks',
      searchFn: (query) => SearchApi.SearchMulti({ query, language: 'en', page: 1 })
    }
  ]

  const searchResults = searchCategories.map((category) => {
    const { data } = useQuery({
      queryKey: [category.queryKey, querySearch],
      queryFn: () => category.searchFn(querySearch),
      placeholderData: keepPreviousData,
      enabled: !!querySearch
    })
    return {
      ...category,
      data_results: data?.data?.total_results || 0,
      dataAll: data?.data?.results || []
    }
  })

  const currentResults = useMemo(() => {
    return searchResults.find((item) => item.link === currentPath)
  }, [currentPath, searchResults])

  const renderSearchResult = (item: SearchResult) => {
    if (!item) return null

    const imageUrl =
      `${configBase.imageBaseUrl}${
        item.backdrop_path || item.logo_path || item.profile_path || item.known_for?.[0]?.poster_path
      }` || configBase.noImagesPoster

    return (
      <Link to='' className='flex mb-5 rounded-xl shadow-xl h-32 w-full'>
        <img
          src={imageUrl}
          alt={item.name || item.original_title || ''}
          className='h-full w-36 object-cover rounded-l-xl'
        />
        <div className='ml-4 flex flex-col w-full'>
          <div className='font-bold text-xl hover:text-[#00bcd4]'>{item.name || item.original_title}</div>
          <div className='text-gray-400'>
            {item.first_air_date ||
              item.release_date ||
              item.known_for?.map((known, index) => <div key={index}>{known.name}</div>)}
          </div>
          <div className='line-clamp-2'>{item.overview}</div>
        </div>
      </Link>
    )
  }

  return (
    <div className='flex flex-col'>
      <Popover>
        <PopoverTrigger>
          <div className='flex w-full justify-around pt-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-5 w-[10%] lg:translate-x-[90px] lg:translate-y-3'
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
              className='w-[90%] p-3'
            />
          </div>
        </PopoverTrigger>
        {suggest && <PopoverContent>Place content for the popover here.</PopoverContent>}
      </Popover>

      <div className='border-b border-gray-300' />

      <div className='mt-7 mx-44 max-md:mx-12 max-sm:mx-2 max-lg:mx-32 flex'>
        <div className='flex flex-col mr-4 w-56'>
          <div className='rounded-t-xl bg-[#00bcd4] capitalize h-14 font-semibold text-sm text-start items-center p-4'>
            Search Results
          </div>
          <div className='flex flex-col shadow-xl mt-1 rounded-b-xl'>
            {searchResults.map((category) => (
              <NavLink
                key={category.name}
                to={`/search/${category.link}?query=${querySearch}`}
                className={({ isActive }) =>
                  `flex justify-between p-3 gap-3 ${isActive ? 'bg-gray-200 text-black font-bold' : ''}`
                }
              >
                <div className='hover:text-[#00bcd4]'>{category.name}</div>
                <div className='text-end bg-gray-100 rounded-sm px-3'>{category.data_results}</div>
              </NavLink>
            ))}
          </div>
        </div>

        <div className='w-full'>
          {currentPath === 'keyword' || currentPath === 'company'
            ? currentResults?.dataAll?.map((item: SearchResult, index: number) => (
                <Link
                  key={index}
                  to=''
                  className='flex hover:text-[#00bcd4] flex-col gap-2 border-b-[1px] border-gray-300'
                >
                  {item.name}
                </Link>
              ))
            : currentResults?.dataAll?.map((item: SearchResult, index: number) => (
                <div key={index}>{renderSearchResult(item)}</div>
              ))}
        </div>
      </div>
    </div>
  )
}
