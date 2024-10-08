import DynamicMovieBackdrop from '@/Components/Custom/DynamicMovieBackdrop'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/Components/ui/dialog'
import { Expand } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/Components/ui/carousel'
import { Part } from '@/types/Collection.type'
import { BackdropImages, DetailsImages } from '@/types/Movie'
import { Card, CardContent } from '@/Components/ui/card'

import configBase from '@/constants/config'
import { toast } from 'react-toastify'
import { SuccessResponse } from '@/types/utils.type'

interface Props {
  collection: Part
  dataImg: SuccessResponse<DetailsImages[]> | undefined
  colorLiker?: string
}
export default function CollectionDetail({ collection, dataImg, colorLiker = '#4CAF50' }: Props) {
  const imageUrl = `${configBase.imageBaseUrl}${collection?.backdrop_path || collection?.poster_path}`
  const percentage = Math.round(collection?.vote_average * 10)
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  if (percentage < 70 && percentage >= 30) {
    colorLiker = '#b9d13f'
  } else if (percentage < 30) {
    colorLiker = '#ed2133'
  }

  const handleLikeImg = () => {
    toast.success('You have successfully rated the image.')
  }
  return (
    <div className='relative h-[520px] '>
      <DynamicMovieBackdrop imageUrl={imageUrl}>
        <div className='container'>
          <div className=' grid grid-cols-12 z-20 relative'>
            <div className='col-span-3 h-[450px]'>
              <div className='relative group w-full h-full'>
                <Dialog>
                  <DialogTrigger className='h-full w-full'>
                    <img src={imageUrl} alt='' className='object-cover h-full w-full rounded-xl shadow-sm' />

                    <div className='absolute inset-0 bg-[#001a1a]/80 backdrop-blur-[2px] group-hover:opacity-100 opacity-0 transition-all duration-300 rounded-xl flex items-center justify-center'>
                      <button className='flex items-center gap-2 px-5 py-2.5 bg-[#001a1a]/60 backdrop-blur-sm rounded-lg border border-white/10 text-white/90 hover:text-white'>
                        <Expand size={16} />
                        <span>Expand</span>
                      </button>
                    </div>
                  </DialogTrigger>
                  <DialogContent className='max-w-[900px] w-[80vw]'>
                    <DialogHeader>
                      <DialogDescription className='flex'>
                        <Carousel className='w-[500px] h-[450px] mr-10'>
                          <CarouselContent>
                            {(dataImg?.posters as BackdropImages[])?.map((dataImages_item: BackdropImages) => (
                              <CarouselItem key={dataImages_item.iso_639_1}>
                                <Card>
                                  <CardContent>
                                    {dataImages_item.file_path && (
                                      <img
                                        src={`${configBase.imageBaseUrl}${dataImages_item.file_path}`}
                                        alt=''
                                        className='h-[440px] w-[600px] object-cover object-center'
                                      />
                                    )}
                                  </CardContent>
                                </Card>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>

                        <div className='w-[70%] mt-[100px] ml-8'>
                          <div className='flex w-full justify-between'>
                            <img
                              onClick={handleLikeImg}
                              className=' size-8'
                              src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-452-hand-dislike-d97408deec38f6595c7b2e40eadb649ef2beee92df579b3f88095e9c183ca92e.svg'
                              alt=''
                            />
                            <img
                              onClick={handleLikeImg}
                              className='size-8'
                              src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-451-hand-like-10db6816d1483cba3abf2e8a9e9133b3441882c804f6d3c2283aa946aca674a0.svg'
                              alt=''
                            />
                          </div>

                          <div className='flex mt-12 justify-between'>
                            <div className='text-black font-semibold'>Info</div>
                            <img
                              src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-218-lock-open-e3ddaaf88cb0c2f1c62bf0620eaaacd12522f0f589c77e523c659d7f3f2a1e89.svg'
                              alt=''
                              className='size-5'
                            />
                          </div>
                          <div className='border-b-[1px] border-gray-200 mt-4'></div>
                          <div className='mt-3'>Primary?</div>
                          <div className='mt-3'>
                            <div className='text-gray-400'>Added By</div>
                            <div className='text-black font-semibold'>{}</div>
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className='col-span-9 ml-6 text-white'>
              <div className='capitalize font-semibold text-2xl'>{collection?.original_title}</div>
              <div className='w-[310px] h-20 flex mt-3 items-center text-center justify-center'>
                <svg className='w-auto h-full hover:scale-150 transition-all cursor-pointer' viewBox='0 0 40 40'>
                  <circle
                    className='text-gray-700'
                    strokeWidth='3'
                    stroke='currentColor'
                    fill='transparent'
                    r={radius}
                    cx='20'
                    cy='20'
                  />
                  <circle
                    className='text-lime-400'
                    strokeWidth='3'
                    strokeLinecap='round'
                    stroke={colorLiker}
                    fill='transparent'
                    r={radius}
                    cx='20'
                    cy='20'
                    style={{
                      strokeDasharray: circumference,
                      strokeDashoffset: strokeDashoffset,
                      transform: 'rotate(-90deg)',
                      transformOrigin: '50% 50%'
                    }}
                  />
                  <text
                    x='20.15'
                    y='24.45'
                    className='percentage font-semibold'
                    textAnchor='middle'
                    fill='white'
                    fontSize='13'
                  >
                    {percentage}%
                  </text>{' '}
                </svg>
                <div className=''>User Score</div>
                <div className=' flex w-full ml-4 translate-x-3  text-white items-center'></div>
              </div>

              <div className=' mt-5'>
                <h2 className='capitalize text-white font-semibold'>overview</h2>
                <div className='text-wrap text-gray-300'>{collection?.overview}</div>
              </div>
              <div className='mt-5'>
                <div className='capitalize font-semibold text-sm'>number of movies: {collection?.genre_ids.length}</div>
                <div className='mt-2 font-semibold text-sm'>Revenue: ${collection?.popularity}</div>
              </div>
            </div>
          </div>
        </div>{' '}
      </DynamicMovieBackdrop>
    </div>
  )
}
