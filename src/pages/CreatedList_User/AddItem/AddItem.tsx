import { ActionListApi } from '@/Apis/ActionListApi'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover'
import { useEffect, useState } from 'react'
import { ListMovieSearch } from '@/types/List.type'
import configBase from '@/constants/config'
import { createSearchParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import path from '@/constants/path'
import { generateNameId } from '@/utils/utils'
import { ActionListV3Api } from '@/Apis/ActionListV3Api'
import HelMet from '@/Components/Custom/HelMet'

export default function AddItem() {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const [items, setItems] = useState<number>()
  const [items_Active, setItems_Active] = useState<
    { media_id: number; media_name: string; media_backdrop: string; media_date: string; media_type: string }[]
  >([])
  const addItemsMutation = useMutation({
    mutationFn: () => ActionListV3Api.addMovie(Number(search.split('=')[1]), { media_id: items as number })
  })

  const [suggest, setSuggest] = useState(false)

  const [querySearch, setQuerySearch] = useState<string>()
  const { data: dataSearchMovie, refetch: RefetchMV } = useQuery({
    queryKey: ['dataSearchMovie', querySearch],
    queryFn: () =>
      ActionListApi.Search_AllMovie({
        language: 'en-US',
        query: querySearch as string,
        page: 1
      })
  })
  const { data: dataSearchTV, refetch: RefetchTV } = useQuery({
    queryKey: ['dataSearchTV', querySearch],
    queryFn: () =>
      ActionListApi.SearchTV({
        language: 'en-US',
        query: querySearch as string,
        page: 1
      })
  })
  useEffect(() => {
    RefetchMV()
    RefetchTV()
  }, [querySearch])
  const dataS_MV = dataSearchMovie?.data.results
  // const dataS_TV = dataSearchTV?.data.results.slice(0, 10)

  const handleSelectItem_Active = (selectedItem: {
    media_name: string
    media_backdrop: string
    media_date: string
    media_type: string
    media_id: number
  }) => {
    setItems_Active((prevItems) => [...prevItems, selectedItem])
  }
  const handleAddItemsMutation = () => {
    addItemsMutation.mutate(undefined, {
      onSuccess: (data) => {
        toast.success(`${data.data.status_message}`, { delay: 8000 })
        navigate({
          pathname: path.deletedItemList,
          search: createSearchParams({
            list_id: search.split('=')[1]
          }).toString()
        })
      },
      onError: () => {
        toast.error(`Add Items failed`)
      }
    })
  }
  return (
    <div>
      <HelMet title='Created list' />
      <div className='container my-5 flex max-sm:flex-col'>
        <div className='rounded-xl max-h-[350px] flex flex-col mr-10 w-[200px] max-sm:w-full bg-white border border-gray-300 shadow-xl max-sm:flex-row max-sm:overflow-x-auto'>
          <div className='bg-[#06b6d4] p-7 rounded-t-xl text-white font-semibold'>Edit</div>
          <div className={`p-7`}>Created details</div>
          <div className={`p-7 ${pathname.includes('addItems') ? 'text-[#06b6d4]' : ''}`}>Add/Edit items</div>
          <div className={`p-7`}>Delete List</div>
        </div>
        <div className='flex flex-col w-full'>
          <Popover>
            <div className='w-full'>
              <PopoverTrigger className='w-full'>
                <div className='text-start mb-5 font-bold text-xl'>Add Item</div>
                <div className='flex w-full justify-around pt-1 rounded-sm border border-gray-200'>
                  <input
                    onChange={(e) => {
                      setSuggest(true)
                      setQuerySearch(e.target.value)
                    }}
                    type='text'
                    placeholder={`Item...`}
                    className='w-full px-2'
                  />
                </div>
              </PopoverTrigger>
              {suggest && (
                <PopoverContent className='w-screen max-w-none' align='start' sideOffset={5}>
                  <div className='w-full max-h-[300px] overflow-y-auto'>
                    {(dataS_MV?.length as number) > 0 &&
                      dataS_MV?.map((item: ListMovieSearch, index: number) => (
                        <div
                          onClick={() => {
                            setItems(item?.id)
                            handleSelectItem_Active({
                              media_name: item?.original_title,
                              media_backdrop: item?.poster_path as string,
                              media_date: item?.release_date as string,
                              media_type: 'movie',
                              media_id: item?.id
                            })
                          }}
                          className='w-full flex mb-5 hover:bg-slate-200 cursor-pointer'
                          key={index}
                        >
                          <img
                            src={`${configBase.imageBaseUrl}${item?.poster_path}`}
                            alt=''
                            className='w-[100px] object-cover h-[150px] rounded-xl'
                          />
                          <div className='flex flex-col '>
                            <div className='w-full p-2'>{item?.original_title}</div>
                            <div className='flex gap-3 p-2 items-center'>
                              <div className='font-bold text-emerald-400 text-xl'>Movie</div>
                              <div>|</div>
                              <div className='text-gray-500 items-center translate-y-[0.8px]'>{item?.release_date}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    {/* {(dataS_TV?.length as number) > 0 &&
                      dataS_TV?.map((item: ListTVSearch, index: number) => (
                        <div
                          onClick={() => {
                            handleSelectItem({ media_id: item?.id as number })
                            handleSelectItem_Active({
                              media_name: item?.name,
                              media_backdrop: item?.poster_path as string,
                              media_date: item?.first_air_date as string,
                              media_type: 'tv',
                              media_id: item?.id
                            })
                          }}
                          className='w-full flex mb-5 hover:bg-slate-200 cursor-pointer'
                          key={index}
                        >
                          <img
                            src={`${configBase.imageBaseUrl}${item?.backdrop_path || item?.poster_path}`}
                            alt=''
                            className='w-[100px] object-cover h-[150px] rounded-xl'
                          />
                          <div className='flex flex-col '>
                            <div className='w-full p-2'>{item?.name}</div>
                            <div className='flex gap-3 p-2 items-center'>
                              <div className='font-bold text-[#06b6d4] text-xl'>TV SHOW</div>
                              <div>|</div>
                              <div className='text-gray-500 items-center translate-y-[0.8px]'>
                                {item?.first_air_date}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))} */}
                  </div>
                </PopoverContent>
              )}
            </div>
          </Popover>
          <div>
            {items_Active?.map(
              (item: {
                media_name: string
                media_backdrop: string
                media_date: string
                media_type: string
                media_id: number
              }) => (
                <Link
                  to={`/${item.media_type}/${generateNameId({ name: item.media_name, id: item.media_id })}`}
                  className='flex my-7 w-full gap-3  rounded-sm shadow-sm border border-gray-300'
                  key={item.media_name}
                >
                  <img
                    className='w-[100px] h-[100px] object-cover rounded-l-sm'
                    src={`${configBase.imageBaseUrl}${item?.media_backdrop}`}
                    alt=''
                  />
                  <div className='flex flex-col'>
                    <div className='mb-7 font-semibold text-xl'>{item?.media_name}</div>
                    <div className='text-gray-300'>{item?.media_date}</div>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      <div
        onClick={handleAddItemsMutation}
        className='container text-center my-4 cursor-pointer hover:bg-blue-950 bg-[#06b6d4] text-white font-bold p-4 text-xl rounded-sm shadow-sm'
      >
        Add item you select? And next to Edits or Deleted Items
      </div>
    </div>
  )
}
