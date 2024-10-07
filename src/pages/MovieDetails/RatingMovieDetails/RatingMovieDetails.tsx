/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/Components/ui/drawer'
import { Button } from '@/Components/ui/button'
import { movieDetail } from '@/types/Movie'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import DetailsMovieApi from '@/Apis/DetailsMovieApi'
import { AxiosResponse } from 'axios'
import { SuccessResponse } from '@/types/utils.type'
import { toast } from 'react-toastify'

interface Props {
  idMovie: number
  percentage: number | 0
  dataMovie: movieDetail | undefined
  min?: number
  max?: number

  onChange?: (value: number) => void
}

export default function RatingMovieDetails({
  idMovie,
  dataMovie,
  min = 0,
  max = 100,

  onChange
}: Props) {
  const { data: dataAccount_States, refetch } = useQuery({
    queryKey: ['account_states', idMovie],
    queryFn: () => DetailsMovieApi.getAccount_States(idMovie)
  })
  const deletedMutation = useMutation({
    mutationFn: () => DetailsMovieApi.deleteRating(idMovie)
  })
  const dataRated = (dataAccount_States?.data.rated.value as number) * 10
  const [value, setValue] = useState(dataRated)
  const ratingMovieMutation = useMutation({
    mutationFn: () => DetailsMovieApi.addRatingMovieDetails(idMovie, value / 10)
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)
    setValue(newValue)
    onChange?.(newValue)
  }

  const getTrackBackground = () => {
    const percentage = ((value - min) / (max - min)) * 100
    return `${percentage}%`
  }

  const marks = Array.from({ length: 11 }, (_, i) => ({
    value: (max / 10) * i,
    label: i * 10
  }))
  const handleRatingMovie = async () => {
    await ratingMovieMutation.mutateAsync(undefined, {
      onSuccess: (data: AxiosResponse<SuccessResponse<{ status_message: string }>>) => {
        toast.success(`${data.data.status_message}`)
        refetch()
      },
      onError: (error: Error) => {
        toast.error(`${error}`)
      }
    })
  }
  const handleDeletedRating = () => {
    deletedMutation.mutate(undefined, {
      onSuccess: (data: AxiosResponse<SuccessResponse<{ status_message: string }>, any>) => {
        console.log(data)

        toast.success(`${data.data.status_message}`)
        refetch()
      },
      onError: (error: Error) => {
        toast.error(`${error.message}`)
      }
    })
  }
  useEffect(() => {
    setValue(dataRated || 0)
  }, [dataRated, setValue])
  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          {!dataRated ? (
            <div className='flex'>
              What's your <div className='ml-1 border-b-2 border-b-cyan-400'>Vibe</div>
            </div>
          ) : (
            <div className='flex'>
              Your <div className='mx-1 border-b-2 border-b-cyan-400'>Vibe</div> <div>{dataRated}%</div>
            </div>
          )}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Rating</DrawerTitle>
            <DrawerDescription className='text-black'>
              <div className='flex justify-between items-center mb-2'>
                <div>what did you think of {dataMovie?.original_title}?</div>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold text-blue-600'>{value}%</span>
                  <span className='text-gray-500 text-sm'>user score</span>
                  <button
                    onClick={() => {
                      handleDeletedRating()
                      setValue(0)
                      onChange?.(0)
                    }}
                    className='text-sm text-blue-500 hover:text-blue-600 ml-4'
                  >
                    Clear my rating
                  </button>
                </div>
              </div>

              <div className='relative pt-1 mt-6'>
                <div className='relative'>
                  <div className='h-1 w-full bg-gray-200 rounded absolute top-1/2 -translate-y-1/2' />

                  <div
                    className='h-1 bg-blue-500 rounded absolute top-1/2 -translate-y-1/2'
                    style={{ width: getTrackBackground() }}
                  />

                  <div className='relative'>
                    {marks.map((mark, index) => (
                      <div
                        key={index}
                        className='absolute top-1/2 -translate-y-1/2 w-0.5 h-2.5 bg-gray-300'
                        style={{
                          left: `${(mark.value / max) * 100}%`,
                          transform: 'translateX(-50%) translateY(-50%)'
                        }}
                      />
                    ))}
                  </div>

                  <input
                    type='range'
                    min={min}
                    step={10}
                    max={max}
                    value={value}
                    onChange={handleChange}
                    className='w-full absolute top-1/2 -translate-y-1/2 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:border-blue-600'
                  />
                </div>

                <div className='relative mt-2'>
                  {marks.map((mark, index) => (
                    <div
                      key={index}
                      className='absolute text-xs text-gray-500'
                      style={{
                        left: `${(mark.value / max) * 100}%`,
                        transform: 'translateX(-50%)'
                      }}
                    >
                      {mark.label}
                    </div>
                  ))}
                </div>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className='relative'>
            <DrawerClose>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
            <Button onClick={handleRatingMovie} className='w-20 absolute right-0'>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
