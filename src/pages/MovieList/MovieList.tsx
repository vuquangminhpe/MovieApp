/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ListApi } from '@/Apis/ListApi'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import MovieListView from './MovieListView'
import { Movie, MovieTrendings, ownerGenres } from '@/types/Movie'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion'
import { cn } from '@/lib/utils'
import { Button } from '@/Components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Label } from '@/Components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group'
import ISO6391 from 'iso-639-1'
import InputRange from '@/Components/Custom/InputRange'
import useQueryConfig from '@/hooks/useQueryConfig'
import UseFilteredMovies from './UseFilteredMovies'
import { debounce } from 'lodash'
import { useLanguage } from '@/Contexts/app.context'
import HelMet from '@/Components/Custom/HelMet'
const filterSort = [
  { value: 'popularity.desc', label: 'Popularity Descending' },
  { value: 'popularity.asc', label: 'Popularity Ascending' },
  { value: 'vote_average.desc', label: 'Rating Descending' },
  { value: 'vote_average.asc', label: 'Rating Ascending' },
  { value: 'release_date.desc', label: 'Release Date Descending' },
  { value: 'release_date.asc', label: 'Release Date Ascending' }
]
export default function MovieList() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const { setQueryParams, queryConfig } = useQueryConfig()
  const { pathname } = useLocation()

  const [loading, setLoading] = useState(false)
  const [selectedGenres, setSelectedGenres] = useState<number[]>(() => {
    const genres = queryConfig.selectedGenres
    return genres ? genres.split(',').map(Number) : []
  })
  const [open, setOpen] = useState(false)
  const [openLanguage, setOpenLanguage] = useState(false)
  const [value, setValue] = useState('')
  const [valueLanguage, setValueLanguage] = useState('')

  const nameLocation = useMemo(() => pathname.split('/')[2], [pathname])
  const observerRef = useRef<IntersectionObserver>()
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const languageCodes = useMemo(() => ISO6391.getAllCodes(), [])
  const languages = useMemo(() => ISO6391.getAllNames(), [])

  const getCodeFromLanguage = useCallback(
    (language: string) => {
      const index = languages.findIndex((lang: string) => lang.toUpperCase() === language.toUpperCase())
      return index !== -1 ? languageCodes[index] : 0
    },
    [languages, languageCodes]
  )

  const { data: dataGenres } = useQuery({
    queryKey: ['dataGenresMovies', language],
    queryFn: () => ListApi.getGenres({ language: language })
  })

  const dataGenres_Movies = dataGenres?.data.genres

  const getApiFunction = useCallback(() => {
    switch (true) {
      case pathname.includes('/movie/Top_Rated'):
        return ListApi.DataRated
      case pathname.includes('movie/Upcoming'):
        return ListApi.UpcomingList
      case pathname.includes('/movie/Popular'):
        return ListApi.PopularList
      case pathname.includes('/movie/Now_Playing'):
        return ListApi.NowPlaying_List
      case pathname.includes('/tv/Popular'):
        return ListApi.getTVPopular
      case pathname.includes('/tv/Airing_Today'):
        return ListApi.getAiringToday
      case pathname.includes('/tv/On-the-air'):
        return ListApi.getOnTheAir
      case pathname.includes('/tv/Top_Rated'):
        return ListApi.getTVTopRated
      default:
        return ListApi.PopularList
    }
  }, [pathname])

  const {
    data: PopularData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: [pathname],
    queryFn: async ({ pageParam = 1 }) => {
      const result = getApiFunction()({
        page: pageParam,
        language: language
      })
      return result
    },
    getNextPageParam: (lastPage) => {
      if (loading && Number(lastPage.data.page) < 2) {
        return Number(lastPage.data.page) + 1
      }
      return undefined
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000
  })

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  )

  useEffect(() => {
    const element = loadMoreRef.current

    if (element) {
      observerRef.current = new IntersectionObserver(handleObserver, {
        threshold: 0.8
      })

      observerRef.current.observe(element)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleObserver])

  const allMovies = useMemo(
    () => PopularData?.pages.flatMap((page) => page.data.results as MovieTrendings | readonly MovieTrendings[]) ?? [],
    [PopularData]
  )

  const filteredMovies = UseFilteredMovies(allMovies)

  const handleClick = useCallback((item: ownerGenres) => {
    setSelectedGenres((prevSelected) => {
      const newSelected = prevSelected.includes(Number(item.id))
        ? prevSelected.filter((id) => id !== Number(item.id))
        : [...prevSelected, Number(item.id)]

      return newSelected
    })
  }, [])

  const debouncedSetQueryParams = useCallback(
    debounce((params: { selectedGenres: string }) => {
      setQueryParams(params)
    }, 300),
    [setQueryParams]
  )

  useEffect(() => {
    if (selectedGenres.length > 0) {
      debouncedSetQueryParams({ selectedGenres: selectedGenres.join(',') })
    } else if (queryConfig.selectedGenres) {
      setQueryParams({ selectedGenres: undefined })
    }
  }, [selectedGenres, debouncedSetQueryParams, queryConfig.selectedGenres, setQueryParams])
  useEffect(() => {
    setLoading(false)
    setQueryParams({})
  }, [pathname])
  if (status === 'pending') {
    return (
      <div className='flex  w-full container'>
        <HelMet title={`${pathname.includes('/movie') ? 'List Movie' : 'List TV Series'}`} />
        <div
          role='status'
          className='max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700'
        >
          <div className='flex items-center justify-between'>
            <div>
              <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5' />
              <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700' />
            </div>
            <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12' />
          </div>
          <div className='flex items-center justify-between pt-4'>
            <div>
              <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5' />
              <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700' />
            </div>
            <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12' />
          </div>
          <span className='sr-only'>Loading...</span>
        </div>

        <div className='grid grid-cols-5 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 ml-7 mt-8'>
          {Array(20)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                role='status'
                className='max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700'
              >
                <div className='flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700'>
                  <svg
                    className='w-10 h-10 text-gray-200 dark:text-gray-600'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 16 20'
                  >
                    <path d='M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z' />
                    <path d='M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z' />
                  </svg>
                </div>
                <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4' />
                <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5' />
                <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5' />
                <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700' />
                <div className='flex items-center mt-4'>
                  <svg
                    className='w-10 h-10 me-3 text-gray-200 dark:text-gray-700'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z' />
                  </svg>
                  <div>
                    <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2' />
                    <div className='w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700' />
                  </div>
                </div>
                <span className='sr-only'>Loading...</span>
              </div>
            ))}
        </div>
      </div>
    )
  } else if (status === 'error') {
    return <div className='text-center text-red-500 py-4'>Error loading movies. Please try again later</div>
  }
  const handleClearParams = () => {
    navigate({ pathname: location.pathname, search: createSearchParams('').toString() })
    setSelectedGenres([])
  }
  return (
    <div className='container py-5'>
      <div className='flex max-sm:flex-col '>
        <div className='min-w-[300px] max-sm:w-[90%] max-md:min-w-[50px] max-md:translate-x-2 max-sm:translate-x-5 md:max-w-[300px] md:w-[300px]'>
          <div className='font-bold text-xl capitalize'>{nameLocation}</div>
          <div className='shadow-xl rounded-xl'>
            <Accordion type='single' collapsible>
              <AccordionItem value='item-1'>
                <AccordionTrigger>
                  <div className='font-semibold text-sm px-3'>Sort</div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className='border-t-[1px] border-gray-200'></div>
                  <div className='mt-2 capitalize text-sm px-3'>sort results by</div>
                  <div className='p-2'>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger className='max-md:w-full' asChild>
                        <Button
                          variant='outline'
                          role='combobox'
                          aria-expanded={open}
                          className='w-[200px] justify-between'
                        >
                          {value ? filterSort.find((item) => item.value === value)?.label : 'Select sort...'}
                          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-[200px] p-0'>
                        <Command>
                          <CommandInput placeholder='Search sort...' />
                          <CommandList>
                            <CommandEmpty>Sort found.</CommandEmpty>
                            <CommandGroup>
                              {filterSort.map((item) => (
                                <CommandItem
                                  key={item.value}
                                  value={item.value}
                                  onSelect={(currentValue) => {
                                    setQueryParams({ sort: currentValue })
                                    setValue(currentValue === value ? '' : currentValue)
                                    setOpen(false)
                                  }}
                                >
                                  <Check
                                    className={cn('mr-2 h-4 w-4', value === item.value ? 'opacity-100' : 'opacity-0')}
                                  />
                                  {item.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className='shadow-xl rounded-xl'>
            <Accordion type='single' collapsible>
              <AccordionItem value='item-1'>
                <AccordionTrigger>
                  <div className='font-semibold text-sm px-3'>Filter</div>
                </AccordionTrigger>
                <AccordionContent className='px-3'>
                  <div className='border-t-[1px] border-gray-200'></div>
                  <div className='mt-2 capitalize text-sm py-3'>show me</div>
                  <RadioGroup
                    defaultValue='Everything'
                    className='py-3'
                    onValueChange={(value) => setQueryParams({ filter: value })}
                  >
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='Everything' id='Everything' />
                      <Label htmlFor='Everything'>Everything</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='not_seen' id='not_seen' />
                      <Label htmlFor='not_seen' className='capitalize'>
                        movies i haven't seen
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='seen' id='seen' />
                      <Label htmlFor='seen' className='capitalize'>
                        movies i have seen
                      </Label>
                    </div>
                  </RadioGroup>
                  <div className='border-t-[1px] border-gray-200'></div>
                  <div className='flex justify-around py-3 items-center '>
                    <div className='p-2 text-gray-400'>from</div>
                    <div className='shadow-xl rounded-sm'>
                      <input
                        className='p-2'
                        type='date'
                        onChange={(e) => setQueryParams({ dateFrom: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className='flex justify-around py-3 items-center '>
                    <div className='p-2 text-gray-400'>to</div>
                    <div className='shadow-xl rounded-sm'>
                      <input className='p-2' type='date' onChange={(e) => setQueryParams({ dateTo: e.target.value })} />
                    </div>
                  </div>
                  <div className='p-1'>
                    <div>Genres</div>
                    <div className='flex flex-wrap gap-2 cursor-pointer '>
                      {dataGenres_Movies?.map((item: ownerGenres) => (
                        <div
                          key={item.id}
                          className={`p-2 border shadow-sm rounded-2xl cursor-pointer
            ${selectedGenres.includes(Number(item.id)) ? 'bg-blue-400 text-white border-white' : 'bg-gray-200 text-black'}`}
                          onClick={() => {
                            handleClick(item)
                          }}
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='border-t-[1px] mt-2 border-gray-200'></div>
                  <div className='mt-3 capitalize'>language</div>
                  <Popover open={openLanguage} onOpenChange={setOpenLanguage}>
                    <PopoverTrigger className='max-md:w-full mt-2' asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={openLanguage}
                        className='w-[200px] justify-between'
                      >
                        {valueLanguage
                          ? languages.find((language: string) => language === valueLanguage)
                          : 'Select sort...'}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[200px] p-0'>
                      <Command>
                        <CommandInput placeholder='sort by...' />
                        <CommandList>
                          <CommandEmpty>Sort found.</CommandEmpty>
                          <CommandGroup>
                            {languages.map((language: string) => (
                              <CommandItem
                                key={language}
                                value={language}
                                onSelect={(currentValue) => {
                                  setQueryParams({ language: getCodeFromLanguage(valueLanguage) as string })
                                  setValueLanguage(currentValue === valueLanguage ? '' : currentValue)
                                  setOpen(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    valueLanguage === language ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                                {language}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <InputRange typeName='userScore' typeScore={1} nameScore='User Score' />
                  <InputRange
                    typeName='userVotes'
                    typeScore={100}
                    valueScore={5}
                    max={500}
                    nameScore='minimum user votes'
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div
            onClick={handleClearParams}
            className='mt-7 bg-blue-400/70 p-4 text-center text-white shadow-xl rounded-xl cursor-pointer hover:bg-blue-950 font-bold text-xl'
          >
            Clear filter
          </div>
        </div>

        <div className='w-full'>
          <div className=' grid grid-cols-5 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:-translate-x-2 gap-5 ml-7 mt-8'>
            {filteredMovies?.map((itemListData: MovieTrendings) => (
              <MovieListView
                pathName={pathname}
                key={itemListData.id}
                listData={itemListData as unknown as Movie as MovieTrendings}
              />
            ))}{' '}
          </div>
          <div ref={loadMoreRef} className='w-full py-4 text-center flex justify-center items-center'>
            <div
              onClick={() => setLoading(true)}
              className={`text-white font-semibold cursor-pointer leading-7 capitalize h-8 bg-blue-400/90 w-80 items-center rounded-xl shadow-xl text-center ${loading ? 'hidden' : 'inline-block'}`}
            >
              load more video ?
            </div>

            {isFetchingNextPage ? (
              <div className='flex justify-center'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
              </div>
            ) : hasNextPage ? (
              <div className='text-gray-500 '>Scroll for more movies...</div>
            ) : (
              loading && <div className='text-gray-500'>No more movies to load</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
