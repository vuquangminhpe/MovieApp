/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ActionListApi } from '@/Apis/ActionListApi'
import { ListMovieSearch, ListTVSearch } from '@/types/List.type'
import configBase from '@/constants/config'
import { listAction } from '@/types/Account.type'
import AddItem from './AddItem'
import { NavLink } from 'react-router-dom'

export default function CreatedList_User() {
  const [querySearch, setQuerySearch] = useState<string>()
  const [itemsAdd, setItemsAdd] = useState<listAction>()
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
  const dataS_MV = dataSearchMovie?.data.results.slice(0, 10)
  const dataS_TV = dataSearchTV?.data.results.slice(0, 10)

  return (
    <div className='container my-5 flex max-sm:flex-col'>
      <div className='rounded-xl flex flex-col mr-10 w-[200px] bg-white border border-gray-300 shadow-xl max-sm:flex-row max-sm:overflow-x-auto'>
        <div className='bg-[#06b6d4] p-7 rounded-t-xl text-white font-semibold'>Edit</div>
        <NavLink className={`p-7`} to={''}>
          Add/Edit items
        </NavLink>
        <NavLink className={`p-7`} to={''}>
          Delete List
        </NavLink>
      </div>
      <div className='flex flex-col'>
        <div className='font-bold text-black dark:text-white text-4xl'>Created New List</div>
        <div className='mt-12'>Name</div>
        <input type='text' className='w-full border border-gray-300 rounded-sm' />
        <div className='mt-12'>Name</div>
        <input type='text' className='w-full border border-gray-300 rounded-sm' />
        <label htmlFor=''>Public List?</label>
        <select className='bg-gray-300 p-1 rounded-sm items-center' onClick={(e) => {}}>
          <option value='yes'>Yes</option>
          <option value='no'>No</option>
        </select>

        <label htmlFor=''>Sort By?</label>
        <select className='bg-gray-300 p-1 rounded-sm items-center' onClick={(e) => {}}>
          <option value='yes'>Yes</option>
          <option value='no'>No</option>
        </select>
        <label htmlFor=''>Add Item</label>
        <AddItem dataS_MV={dataS_MV} dataS_TV={dataS_TV} setQuerySearch={setQuerySearch} />
      </div>
    </div>
  )
}
