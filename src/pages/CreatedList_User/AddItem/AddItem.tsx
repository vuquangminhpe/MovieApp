import { ActionListApi } from '@/Apis/ActionListApi'
import { useMutation } from '@tanstack/react-query'
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover'
import { useState } from 'react'
import { ListMovieSearch, ListTVSearch } from '@/types/List.type'
import configBase from '@/constants/config'
interface Props {
  dataS_MV: ListMovieSearch[] | undefined
  dataS_TV: ListTVSearch[] | undefined
  setQuerySearch: React.Dispatch<React.SetStateAction<string | undefined>>
}
export default function AddItem({ dataS_MV, dataS_TV, setQuerySearch }: Props) {
  //   const addItemsMutation = useMutation({ mutationFn: () => ActionListApi.AddItems() })
  const [suggest, setSuggest] = useState(false)

  return (
    <Popover>
      <div className='w-full'>
        <PopoverTrigger className='w-full'>
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
                  <div className='w-full flex mb-5 hover:bg-slate-200 cursor-pointer' key={index}>
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
              {(dataS_TV?.length as number) > 0 &&
                dataS_TV?.map((item: ListTVSearch, index: number) => (
                  <div className='w-full flex mb-5 hover:bg-slate-200 cursor-pointer' key={index}>
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
                        <div className='text-gray-500 items-center translate-y-[0.8px]'>{item?.first_air_date}</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </PopoverContent>
        )}
      </div>
    </Popover>
  )
}
