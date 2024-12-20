import { ListActionApi } from '@/Apis/ListActionApi'
import configBase from '@/constants/config'
import path from '@/constants/path'
import { MovieTrendings } from '@/types/Movie'
import { TVSeries } from '@/types/TVSeries.type'
import { generateNameId } from '@/utils/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/Components/ui/alert-dialog'
import { ActionListV3Api } from '@/Apis/ActionListV3Api'
import HelMet from '@/Components/Custom/HelMet'

export default function DeleteList() {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const list_id = search.split('=')[1]
  const [actionClear, SetActionClear] = useState<boolean>(false)
  const { data: dataListDetails, refetch: refetchListDetails } = useQuery({
    queryKey: ['dataListDetails', list_id],
    queryFn: () => ListActionApi.listDetailAction(Number(list_id))
  })

  const listDetails = dataListDetails?.data.results

  const deletedListMutation = useMutation({
    mutationFn: () => ActionListV3Api.deletedList(Number(list_id))
  })

  const removeItemInTheListMutation = useMutation({
    mutationFn: (mediaID: number) => ActionListV3Api.removeMovie(Number(list_id), { media_id: mediaID })
  })

  if (actionClear) {
    const ClearAllMovieMutation = useMutation({
      mutationFn: () => ActionListV3Api.clearMovie(Number(list_id), actionClear)
    })

    ClearAllMovieMutation.mutate(undefined, {
      onSuccess: (data) => {
        toast.success(`${data.data.status_message}`)
      },
      onError: (error) => {
        toast.error(`${error}`)
      }
    })
  }

  const handleDeletedList = () => {
    deletedListMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Delete success')
        navigate({
          pathname: path.userHome
        })
      }
    })
  }

  const handleRemoveItem = (media_id: number) => {
    removeItemInTheListMutation.mutate(media_id, {
      onSuccess: () => {
        toast.success('Item removed successfully')
        refetchListDetails()
      },
      onError: () => {
        toast.error('Failed to remove item')
      }
    })
  }

  return (
    <div className='container my-5 flex justify-around max-sm:flex-col'>
      <HelMet title='Created list' />
      <div className='rounded-xl flex max-h-[350px]  max-sm:w-full flex-col mr-10 w-[200px] bg-white border border-gray-300 shadow-xl max-sm:flex-row max-sm:overflow-x-auto'>
        <div className='bg-[#06b6d4] p-7 rounded-t-xl text-white font-semibold'>Edit</div>
        <div className={`p-7`}>Created details</div>
        <div className={`p-7 `}>Add/Edit items</div>
        <div className={`p-7  ${pathname.includes('DeletedItems') ? 'text-[#06b6d4]' : ''}`}>Delete List</div>
      </div>
      <div className='flex w-full mr-4 flex-col'>
        {listDetails?.map((itemdetails: MovieTrendings | TVSeries) => (
          <div className='flex border border-gray-200  gap-4 mb-4 rounded-xl max-sm:flex-col' key={itemdetails?.id}>
            <img
              className='w-[100px] h-44 object-cover rounded-l-xl'
              src={`${configBase.imageBaseUrl}${itemdetails?.poster_path || itemdetails?.backdrop_path}`}
              alt=''
            />
            <div className='flex flex-col mt-5'>
              <Link
                to={`/${itemdetails?.media_type}/${generateNameId({ name: (itemdetails?.original_name || (itemdetails as MovieTrendings)?.original_title) as string, id: itemdetails?.id as number })}`}
                className='font-bold text-xl mb-3'
              >
                {(itemdetails as MovieTrendings)?.original_title || itemdetails?.original_name}
              </Link>
              <div className='text-gray-500'>
                {itemdetails?.first_air_date || (itemdetails as MovieTrendings).release_date}
              </div>
              <div onClick={() => handleRemoveItem(itemdetails?.id as number)} className='flex mt-16'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-5 cursor-pointer'
                  onClick={() => handleRemoveItem(itemdetails?.id as number)}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                  />
                </svg>
                <div className='hover:text-[#06b6d4] cursor-pointer'>delete item</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex flex-col max-md:text-center max-md:items-center'>
        {/* <AlertDialog>
          <AlertDialogTrigger className='text-center my-4 cursor-pointer hover:bg-blue-950 bg-[#06b6d4] text-white font-bold p-4 text-xl rounded-sm shadow-sm'>
            Clear All Item in the List
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure clear movie in the list?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => SetActionClear(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => SetActionClear(true)}>Clear</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}

        <AlertDialog>
          <AlertDialogTrigger className='text-center  w-[140px] my-4 cursor-pointer hover:bg-blue-950 bg-[#06b6d4] text-white font-bold p-2 text-xl rounded-sm shadow-sm'>
            Deleted list
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure deleted list?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeletedList}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
