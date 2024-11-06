import { Link } from 'react-router-dom'
import { Movie } from '../../../../types/Movie'
import CustomScrollContainer from '../../../../Components/Custom/CustomScrollContainer'
import path from '../../../../constants/path'
import RenderMovies from '../../../../Components/RenderMovies/RenderMovie'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MovieTrendingProps {
  dataPopulars?: Movie[]
  setMovieId: React.Dispatch<React.SetStateAction<number | undefined>>
  rating: number
  isAnimation?: boolean
}

const MovieTrending = ({ dataPopulars, rating, setMovieId, isAnimation = false }: MovieTrendingProps) => {
  const [activeIndex, setActiveIndex] = useState(2)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : (dataPopulars?.length || 1) - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev < (dataPopulars?.length || 1) - 1 ? prev + 1 : 0))
  }

  if (!isAnimation) {
    return (
      <div className='pl-7 py-7 w-full'>
        <div className='text-xl font-bold mb-4'>What's Popular</div>
        <div className='relative' style={{ height: '350px' }}>
          <CustomScrollContainer height={350} width='100%'>
            <div className='flex gap-3 pr-4' style={{ width: 'max-content' }}>
              {dataPopulars?.map((dataTrending) => (
                <Link key={dataTrending.id} to={path.home} className='max-w-full'>
                  <RenderMovies
                    media_type='movie'
                    voteRate={rating}
                    setMovieId={setMovieId}
                    movie_id={dataTrending.id}
                    key={dataTrending.id}
                    dataTrending={dataTrending}
                  />
                  <div className='text-sm font-semibold max-w-[220px]'>
                    {dataTrending.original_name || dataTrending.title}
                  </div>
                  <div className='text-gray-300'>
                    {dataTrending.first_air_date || (dataTrending as Movie).release_date}
                  </div>
                </Link>
              ))}
            </div>
          </CustomScrollContainer>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full min-h-[500px] relative bg-gradient-to-b from-black/90 to-transparent'>
      <div className='text-xl font-bold mb-4 pl-7 pt-7'>What's Popular</div>

      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='relative w-full max-w-4xl h-[400px]'>
          <button
            onClick={handlePrev}
            className='absolute left-0 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors'
          >
            <ChevronLeft className='w-6 h-6 text-white' />
          </button>

          <button
            onClick={handleNext}
            className='absolute right-0 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors'
          >
            <ChevronRight className='w-6 h-6 text-white' />
          </button>

          <div className='absolute inset-0 flex items-center justify-center perspective-[1200px]'>
            {dataPopulars?.map((dataTrending, index) => {
              const position = (index - activeIndex + dataPopulars.length) % dataPopulars.length
              const isCenter = position === 0

              let xOffset = 0
              let zOffset = 0
              let opacity = 0
              let scale = 0.7
              let rotation = 0

              if (position === 0) {
                xOffset = 0
                zOffset = 0
                opacity = 1
                scale = 1
                rotation = 0
              } else if (position === 1 || position === -2) {
                xOffset = 200
                zOffset = -150
                opacity = 0.6
                rotation = 15
              } else if (position === -1 || position === 2) {
                xOffset = -200
                zOffset = -150
                opacity = 0.6
                rotation = -15
              } else {
                opacity = 0
              }

              return (
                <Link
                  key={dataTrending.id}
                  to={path.home}
                  className={`
                    absolute transition-all duration-500 ease-in-out
                    rounded-lg overflow-hidden shadow-2xl
                    ${isCenter ? 'w-[300px] h-[450px] cursor-pointer' : 'w-[240px] h-[360px]'}
                  `}
                  style={{
                    transform: `translateX(${xOffset}px) translateZ(${zOffset}px) rotateY(${rotation}deg) scale(${scale})`,
                    opacity,
                    zIndex: isCenter ? 10 : 5
                  }}
                >
                  <RenderMovies
                    media_type='movie'
                    voteRate={rating}
                    setMovieId={setMovieId}
                    movie_id={dataTrending.id}
                    dataTrending={dataTrending}
                  />
                  {isCenter && (
                    <div className='absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent'>
                      <div className='text-white text-lg font-bold'>
                        {dataTrending.original_name || dataTrending.title}
                      </div>
                      <div className='text-gray-300 mt-1'>
                        {dataTrending.first_air_date || (dataTrending as Movie).release_date}
                      </div>
                    </div>
                  )}
                </Link>
              )
            })}
          </div>

          <div className='absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2'>
            {dataPopulars?.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieTrending
