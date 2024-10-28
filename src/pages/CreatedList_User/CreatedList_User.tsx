/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import path from '@/constants/path'
import { ActionListV3Api } from '@/Apis/ActionListV3Api'
import HelMet from '@/Components/Custom/HelMet'

export default function CreatedList_User() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    language: ''
  })

  const createdListMutation = useMutation({
    mutationFn: () =>
      ActionListV3Api.createdList({
        ...formState
      })
  })

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
        toast.success(`Created List success`)

        navigate({
          pathname: path.addItemList,
          search: createSearchParams({
            listID: Number(data.data.list_id).toString()
          }).toString()
        })
      },
      onError: (error: Error) => {
        toast.error(`${error}`)
      }
    })
  }
  return (
    <div className='container my-5 flex max-sm:flex-col'>
      <HelMet title='Created list' />
      <div className='rounded-xl flex  max-sm:w-full flex-col mr-10 w-[200px] bg-white border border-gray-300 shadow-xl max-sm:flex-row max-sm:overflow-x-auto'>
        <div className='bg-[#06b6d4] p-7 rounded-t-xl text-white font-semibold'>Edit</div>
        <div className={`p-7 ${pathname.includes('created') ? 'text-[#06b6d4]' : ''}`}>Created details</div>
        <div className={`p-7`}>Add/Edit items</div>
        <div className={`p-7`}>Delete List</div>
      </div>
      <div className='flex flex-col'>
        <div className='font-bold text-black dark:text-white text-4xl'>Created New List</div>
        <div className='mt-12'>Name</div>
        <input
          type='text'
          value={formState.name}
          name='name'
          onChange={handleChange}
          className='w-full border border-gray-300 rounded-sm mb-3'
        />
        <div className='mt-1'>Description</div>
        <input
          type='text'
          value={formState.description}
          name='description'
          onChange={handleChange}
          className='w-full border border-gray-300 rounded-sm mb-3'
        />
        <label htmlFor=''>Language ?</label>
        <select
          name='language'
          value={formState.language}
          onChange={handleChange}
          className='bg-gray-300 p-1 rounded-sm items-center'
        >
          <option value='en'>English</option>
          <option value='vi'>Việt Nam</option>
        </select>

        <div
          className='mt-4 bg-blue-400 rounded-sm p-4 text-white font-bold text-xl hover:text-white cursor-pointer hover:bg-blue-950 '
          onClick={handleCreatedList}
        >
          Created List
        </div>
      </div>
    </div>
  )
}
