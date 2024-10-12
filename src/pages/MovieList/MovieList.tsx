/* eslint-disable @typescript-eslint/no-unused-vars */
import { ListApi } from '@/Apis/ListApi'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import MovieListView from './MovieListView'
import { Movie, MovieTrendings, ownerGenres } from '@/types/Movie'
import { useLocation } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
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
const filterSort = [
  {
    value: 'Popularity_Descending',
    label: 'Popularity Descending'
  },
  {
    value: 'Popularity_Ascending',
    label: 'Popularity Ascending'
  },
  {
    value: 'Rating_Ascending',
    label: 'Rating Ascending'
  },
  {
    value: 'Release_Date_Descending',
    label: 'Release Date Descending'
  },
  {
    value: 'Release_Date_Ascending',
    label: 'Release Date Ascending'
  },
  {
    value: 'Title_A_Z',
    label: 'Title (A-Z)'
  },
  {
    value: 'Title_Z_A',
    label: 'Title (Z-A)'
  }
]
export default function MovieList() {
  const languageCodes = ISO6391.getAllCodes()

  const languages = ISO6391.getAllNames()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [openLanguage, setOpenLanguage] = useState(false)
  const [value, setValue] = useState('')
  const [valueLanguage, setValueLanguage] = useState('')
  const nameLocation = pathname.split('/')[2]

  const observerRef = useRef<IntersectionObserver>()
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const { data: dataGenres } = useQuery({
    queryKey: ['dataGenresMovies', 'en'],
    queryFn: () => ListApi.getGenres({ language: 'en' })
  })
  const dataGenres_Movies = dataGenres?.data.genres
  const getApiFunction = () => {
    if (pathname.includes('/movie/Top_Rated')) {
      return ListApi.DataRated
    }
    if (pathname.includes('movie/Upcoming')) {
      return ListApi.UpcomingList
    }
    if (pathname.includes('/movie/Popular')) {
      return ListApi.PopularList
    }
    if (pathname.includes('/movie/Now_Playing')) {
      return ListApi.NowPlaying_List
    }
    return ListApi.PopularList
  }

  const currentApi = getApiFunction()
  const {
    data: PopularData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: [pathname],
    queryFn: async ({ pageParam = 1 }) => {
      const result = currentApi({
        page: pageParam,
        language: 'en-US'
      })

      return result
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.page < lastPage.data.total_pages) {
        return Number(lastPage.data.page) + 1
      }
      return undefined
    },
    initialPageParam: 1
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
  const allMovies =
    PopularData?.pages.flatMap((page) => page.data.results as MovieTrendings | readonly MovieTrendings[]) ?? []
  if (status === 'pending') {
    return (
      <div className='flex w-full container'>
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

        <div className='flex'>
          {Array(5)
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

  return (
    <div className='container py-5'>
      <div className='flex'>
        <div className='w-[650px]'>
          <div className='font-bold text-xl capitalize'>{nameLocation} movies</div>
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
                      <PopoverTrigger asChild>
                        <Button
                          variant='outline'
                          role='combobox'
                          aria-expanded={open}
                          className='w-[200px] justify-between'
                        >
                          {value ? filterSort.find((framework) => framework.value === value)?.label : 'Select sort...'}
                          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-[200px] p-0'>
                        <Command>
                          <CommandInput placeholder='sort by...' />
                          <CommandList>
                            <CommandEmpty>Sort found.</CommandEmpty>
                            <CommandGroup>
                              {filterSort.map((framework) => (
                                <CommandItem
                                  key={framework.value}
                                  value={framework.value}
                                  onSelect={(currentValue) => {
                                    setValue(currentValue === value ? '' : currentValue)
                                    setOpen(false)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      value === framework.value ? 'opacity-100' : 'opacity-0'
                                    )}
                                  />
                                  {framework.label}
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
                  <RadioGroup defaultValue='Everything' className='py-3'>
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
                      <input className='p-2' type='date' />
                    </div>
                  </div>
                  <div className='flex justify-around py-3 items-center '>
                    <div className='p-2 text-gray-400'>to</div>
                    <div className='shadow-xl rounded-sm'>
                      <input className='p-2' type='date' />
                    </div>
                  </div>
                  <div className='p-1'>
                    <div>Genres</div>
                    <div className='flex flex-wrap gap-2 cursor-pointer '>
                      {dataGenres_Movies?.map((item: ownerGenres) => (
                        <div
                          key={item.id}
                          className='inline-block hover:bg-blue-400 hover:text-white hover:border-white px-3 py-1 border-[0.5px] border-black rounded-full'
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='border-t-[1px] mt-2 border-gray-200'></div>
                  <div className='mt-3 capitalize'>language</div>
                  <Popover open={openLanguage} onOpenChange={setOpenLanguage}>
                    <PopoverTrigger asChild>
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
                  <InputRange typeScore={1} nameScore='User Score' />
                  <InputRange typeScore={100} valueScore={5} max={500} nameScore='minimum user votes' />
                  <InputRange typeScore={2 * 60} max={360} valueScore={3} nameScore='runtime' />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div>
          <div className='grid grid-cols-5 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 ml-7 mt-8'>
            {allMovies?.map((itemListData: Movie) => <MovieListView key={itemListData.id} listData={itemListData} />)}
          </div>
          <div ref={loadMoreRef} className='w-full py-4 text-center'>
            {isFetchingNextPage ? (
              <div className='flex justify-center'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
              </div>
            ) : hasNextPage ? (
              <div className='text-gray-500'>Scroll for more movies...</div>
            ) : (
              <div className='text-gray-500'>No more movies to load</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
