/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ActionListApi } from '@/Apis/ActionListApi'
import { listAction } from '@/types/Account.type'
import AddItem from './AddItem'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function CreatedList_User() {
  const [querySearch, setQuerySearch] = useState<string>()
  const navigate = useNavigate()
  const [itemsAdd, setItemsAdd] = useState<listAction>()
  const [step, setStep] = useState<boolean>(false)
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    public: 'yes',
    iso_3166_1: 'US',
    iso_639_1: 'en'
  })
  const { data: dataSearchMovie, refetch: RefetchMV } = useQuery({
    queryKey: ['dataSearchMovie', querySearch],
    queryFn: () =>
      ActionListApi.Search_AllMovie({
        language: 'en-US',
        query: querySearch as string,
        page: 1
      })
  })
  const createdListMutation = useMutation({
    mutationFn: () =>
      ActionListApi.CreatedList({
        ...formState,
        public: formState.public === 'yes' ? true : false
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
  const handleChange = (e: any) => {
    const { name, value } = e.target
    if (value)
      setFormState({
        ...formState,
        [name]: value
      })
  }
  const handleCreatedList = async () => {
    createdListMutation.mutateAsync(undefined, {
      onSuccess: (data) => {
        console.log(data)

        toast.success(`Created List success`)
        //   if (step) {
        //     navigate({
        //       pathname
        //     })
        //   }
      },
      onError: (error: Error) => {
        toast.error(`${error}`)
      }
    })
  }
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
        <input
          type='text'
          value={formState.name}
          name='name'
          onChange={handleChange}
          className='w-full border border-gray-300 rounded-sm'
        />
        <div className='mt-12'>Description</div>
        <input
          type='text'
          value={formState.description}
          name='description'
          onChange={handleChange}
          className='w-full border border-gray-300 rounded-sm'
        />
        <label htmlFor=''>Public List?</label>
        <select
          name='isPublic'
          value={formState.public}
          onChange={handleChange}
          className='bg-gray-300 p-1 rounded-sm items-center'
        >
          <option value='yes'>Yes</option>
          <option value='no'>No</option>
        </select>

        <label htmlFor=''>Sort By?</label>
        {/* <select
          name='sortBy'
          // value={formState.sortBy}
          // onChange={handleChange}
          className='bg-gray-300 p-1 rounded-sm items-center'
        >
          <option value='yes'>Yes</option>
          <option value='no'>No</option>
        </select> */}
        <div className='' onClick={handleCreatedList}>
          Created List
        </div>
        {/* <label htmlFor=''>Add Item</label> */}
        {/* <AddItem dataS_MV={dataS_MV} dataS_TV={dataS_TV} setQuerySearch={setQuerySearch} /> */}
      </div>
    </div>
  )
}
