import { AccountApi } from '@/Apis/AccountApi'
import Popover from '@/Components/Custom/Popover'
import { videosDetails } from '@/types/Movie'
import { TVSeries } from '@/types/TVSeries.type'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
interface Props {
  dataMovieDetails_Videos: videosDetails | undefined
  dataTV: TVSeries | undefined
}
export default function AddOwnerMovieDetails({ dataTV }: Props) {
  const addWatchListMutation = useMutation({
    mutationFn: () =>
      AccountApi.addWatchList({
        media_type: 'tv',
        media_id: dataTV?.production_companies[0].id as number,
        watchlist: true
      })
  })

  const addFavoriteMutation = useMutation({
    mutationFn: () =>
      AccountApi.addFavorite({
        media_type: 'tv',
        media_id: dataTV?.production_companies[0].id as number,
        favorite: true
      })
  })
  const handleAddWatchList = async () => {
    addWatchListMutation.mutateAsync(undefined, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: (data: any) => {
        toast.success(`${data.data.status_message}`)
      },
      onError: (error: Error) => {
        toast.error(`${error.message}`)
      }
    })
  }
  const handleAddFavorite = async () => {
    addFavoriteMutation.mutateAsync(undefined, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: (data: any) => {
        toast.success(`${data.data.status_message}`)
      },
      onError: (error: Error) => {
        toast.error(`${error.message}`)
      }
    })
  }
  return (
    <div className='flex gap-6 mt-7'>
      <Popover
        onEvent='onClick'
        renderPopover={
          <div className='bg-blue-950 p-8 rounded-sm flex'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='#fff'
              className='size-6 mr-2 cursor-pointer'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
            </svg>
            <span className='text-white cursor-pointer'>Create new List</span>
          </div>
        }
        className='rounded-full bg-blue-950 size-8 justify-center items-center text-center flex'
        show={true}
        children={
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='white'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='#fff'
            className='size-6 cursor-pointer'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
            />
          </svg>
        }
      />
      <Popover
        renderPopover={
          <div className='bg-blue-950 p-1 rounded-sm flex'>
            <span className='text-white cursor-pointer'>Mark as favorite</span>
          </div>
        }
        className='rounded-full bg-blue-950 size-8 justify-center items-center text-center flex'
        show={true}
        children={
          <svg
            onClick={handleAddFavorite}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='#fff'
            className='size-6 cursor-pointer'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
            />
          </svg>
        }
      />{' '}
      <Popover
        renderPopover={
          <div className='bg-blue-950 p-1 rounded-sm flex'>
            <span className='text-white cursor-pointer'>Add to your watchlist</span>
          </div>
        }
        className='rounded-full bg-blue-950 size-8 justify-center items-center text-center flex'
        show={true}
        children={
          <svg
            onClick={handleAddWatchList}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='#fff'
            className='size-6 cursor-pointer'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
            />
          </svg>
        }
      />
    </div>
  )
}
