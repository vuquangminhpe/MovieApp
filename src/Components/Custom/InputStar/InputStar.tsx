import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Star } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import DetailsMovieApi from '@/Apis/DetailsMovieApi'
import { toast } from 'react-toastify'
import { TVSeriesApi } from '@/Apis/TVSeriesApi'

interface StarRatingProps {
  id: number
  initialRating?: number
  onChange?: (rating: number) => void
  pathName: string
}

export default function InputStar({ id, initialRating, onChange, pathName }: StarRatingProps) {
  console.log(pathName)

  const [rating, setRating] = useState<number>((initialRating as number) / 2 || 0)
  const [hover, setHover] = useState<number>(0)
  const ratingContainerRef = useRef<HTMLDivElement>(null)
  const getAPIRating = useCallback(() => {
    switch (true) {
      case pathName.includes('movie'):
        return DetailsMovieApi.addRatingMovieDetails
      case pathName.includes('tv'):
        return TVSeriesApi.AddRatingTV
      default:
        return DetailsMovieApi.addRatingMovieDetails
    }
  }, [pathName])
  const ratingMoviesMutation = useMutation({ mutationFn: () => getAPIRating()(id, rating * 2) })

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
    ratingMoviesMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Add rating successfully')
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
