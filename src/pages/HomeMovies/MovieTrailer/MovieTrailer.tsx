/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { MovieTrendings, videosDetails } from '../../../types/Movie'
import { ListApi } from '../../../Apis/ListApi'
import CustomScrollContainer from '../../../Components/CustomScrollContainer'
import configBase from '../../../constants/config'
import RenderMovies from '../../../Components/RenderMovies'
import YouTubePlayer from '../../../Components/YouTubePlayerProps'
import { getYouTubeId } from '../../../constants/regex'

interface PropsData {
  dataPopulars?: MovieTrendings[]
  setMouseHoverImages: React.Dispatch<React.SetStateAction<string>>
}

export default function MovieTrailer({ dataPopulars, setMouseHoverImages }: PropsData) {
  const [selectedVideos, setSelectedVideos] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [playerError, setPlayerError] = useState<string | null>(null)

  const {
    data: dataYoutube,
    error,
    refetch
  } = useQuery({
    queryKey: ['videosDetails', selectedVideos],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey
      if (!id) return Promise.reject('No video ID selected')
      return ListApi.getVideosList(Number(id))
    },
    enabled: !!selectedVideos,
    staleTime: 0
  })

  const dataMoviesVideos: videosDetails | undefined = dataYoutube?.data.results[0]
  useEffect(() => {
    if (isModalOpen && selectedVideos) {
      refetch()
    }
  }, [isModalOpen, selectedVideos, refetch])
  const handleSelectedVideos = (videosId: string) => {
    setSelectedVideos(videosId)
    setIsModalOpen(true)
    setPlayerError(null)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedVideos(null)
    setPlayerError(null)
  }
  useEffect(() => {
    if (!isModalOpen) {
      setSelectedVideos(null)
    }
  }, [isModalOpen])
  const handlePlayerError = (error: any) => {
    console.error('YouTube Player Error:', error)
    setPlayerError('Đã xảy ra lỗi khi tải video. Vui lòng thử lại sau.')
  }

  return (
    <div className='pl-7 py-7 w-full'>
      <div className='text-xl font-bold mb-4'>Latest Trailer</div>

      <div className='' style={{ height: '350px' }}>
        <CustomScrollContainer height={350} width='100%'>
          <div className='flex gap-9 pr-4' style={{ width: 'max-content' }}>
            {dataPopulars?.map((dataTrending) => (
              <div
                onMouseEnter={() => {
                  setMouseHoverImages(`${configBase.imageBaseUrl}${dataTrending.poster_path}`)
                }}
                key={dataTrending.id}
                className='max-w-full relative hover:transition-all hover:scale-110 hover:rounded-xl'
              >
                <RenderMovies isShow={false} key={dataTrending.id} dataTrending={dataTrending} />
                <div className='text-sm text-white font-semibold max-w-[220px] truncate'>
                  {dataTrending.original_name || dataTrending.original_title}
                </div>

                <div
                  onClick={() => handleSelectedVideos(String(dataTrending.id))}
                  className='w-full h-full flex justify-center items-center text-center'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='#FFF'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-12 cursor-pointer text-white absolute top-0 translate-y-[250%] -translate-x-[20%]'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z'
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </CustomScrollContainer>
      </div>

      {isModalOpen && dataMoviesVideos && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-4 rounded-lg items-center text-center'>
            {playerError ? (
              <div className='text-red-500'>{playerError}</div>
            ) : (
              <YouTubePlayer
                key={dataMoviesVideos.key}
                videoId={getYouTubeId(dataMoviesVideos.key as string) || ''}
                onError={handlePlayerError}
              />
            )}
            <button
              onClick={closeModal}
              className='mt-4 px-4 py-2 bg-red-500 hover:bg-red-950 text-white text-center items-center rounded'
            >
              Close
            </button>
          </div>
        </div>
      )}

      {error && <div>Error loading video: {error.toString()}</div>}
    </div>
  )
}
