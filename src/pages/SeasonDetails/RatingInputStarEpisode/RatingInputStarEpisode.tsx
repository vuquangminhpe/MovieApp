import React, { useState, useRef, useEffect } from 'react'
import { Star } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { EpisodesApi } from '@/Apis/EpisodesApi'
interface StarRatingProps {
  tvID: number
  season_ID: number
  episodes_Id: number

  initialRating: number
  onChange?: (rating: number) => void
}

export default function RatingInputStarEpisode({
  tvID,
  season_ID,
  episodes_Id,
  initialRating,
  onChange
}: StarRatingProps) {
  const [rating, setRating] = useState<number>((initialRating as number) / 2 || 0)
  const [hover, setHover] = useState<number>(0)
  const ratingContainerRef = useRef<HTMLDivElement>(null)

  const addRatingEpisodesMutation = useMutation({
    mutationFn: () => EpisodesApi.AddRatingEpisodes(Number(tvID), Number(season_ID), episodes_Id, Number(rating) * 2)
  })

  const calculateRating = (clientX: number) => {
    if (!ratingContainerRef.current) return 0
    const containerRect = ratingContainerRef.current.getBoundingClientRect()
    const starWidth = containerRect.width / 5
    const offsetX = clientX - containerRect.left
    const rawRating = offsetX / starWidth
    return Math.max(0, Math.min(5, Math.round(rawRating * 2) / 2))
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const newRating = calculateRating(e.clientX)
    setHover(newRating)
  }

  const handleMouseLeave = () => {
    setHover(0)
  }

  const handleClick = () => {
    const newRating = hover
    setRating(newRating)
    addRatingEpisodesMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Add rating successfully')
      },
      onError: (error: Error) => {
        toast.error(`${error}`)
      }
    })
    if (onChange) {
      onChange(newRating)
    }
  }

  useEffect(() => {
    setRating((initialRating as number) / 2)
  }, [initialRating])

  return (
    <div
      ref={ratingContainerRef}
      className='flex items-center w-40'
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={star} className='relative w-8 h-8'>
          <Star className='w-8 h-8 text-gray-300 absolute' fill='none' />
          <div
            className='absolute top-0 left-0 overflow-hidden'
            style={{
              width: `${Math.min(100, Math.max(0, (hover || rating) - star + 1) * 100)}%`
            }}
          >
            <Star className='w-8 h-8 text-yellow-400' fill='currentColor' />
          </div>
        </div>
      ))}
    </div>
  )
}
