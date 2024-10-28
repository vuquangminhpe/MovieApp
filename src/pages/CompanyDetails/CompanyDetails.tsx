import { Building2, Globe, MapPin, Link as LinkIcon, Star } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/Components/ui/carousel'
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { CompaniesApi } from '@/Apis/CompaniesApi'
import { getIdFromNameId } from '@/utils/utils'
import { motion } from 'framer-motion'
import configBase from '@/constants/config'
import Skeleton from '@/Skeleton/Skeleton'
import { Helmet } from 'react-helmet-async'

export default function CompanyDetails() {
  const { company_id } = useParams()
  const CompanyID = getIdFromNameId(company_id as string)

  const { data: dataCompanyDetail, isLoading: isLoadingCompany } = useQuery({
    queryKey: ['dataCompanyDetail', CompanyID],
    queryFn: () => CompaniesApi.getDetailsCompanies(Number(CompanyID))
  })

  const { data: dataAlternative_names } = useQuery({
    queryKey: ['dataAlternative_names', CompanyID],
    queryFn: () => CompaniesApi.getDetailsAlternative_names(Number(CompanyID))
  })

  const { data: dataImages } = useQuery({
    queryKey: ['dataImages', CompanyID],
    queryFn: () => CompaniesApi.getDetailsImages(Number(CompanyID))
  })

  const company = dataCompanyDetail?.data
  const alternativeNames = dataAlternative_names?.data
  const logos = dataImages?.data

  if (isLoadingCompany) {
    return <Skeleton />
  }

  if (!company) return null

  return (
    <div className='min-h-screen bg-white'>
      <Helmet title='Company details' />
      <div className='relative h-[60vh] overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 mix-blend-multiply' />
        {company.logo_path && (
          <img
            src={`${configBase.imageBaseUrl}${company.logo_path}`}
            alt={company.name}
            className='absolute inset-0 w-full h-full object-cover scale-105 blur-sm'
          />
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='relative h-full flex flex-col items-center justify-center text-white px-4'
        >
          <h1 className='text-6xl font-bold mb-6 text-center tracking-tight'>{company.name}</h1>
          {(alternativeNames?.results?.length as number) > 0 && (
            <div className='flex gap-3 items-center flex-wrap justify-center'>
              {alternativeNames?.results.map((name, index) => (
                <span key={index} className='px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm'>
                  {name.name}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <div className='max-w-7xl mx-auto px-4 -mt-32 relative z-10 pb-16'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='grid grid-cols-1 lg:grid-cols-12 gap-8'
        >
          <div className='lg:col-span-8 space-y-8'>
            <div className='bg-white rounded-3xl p-8 shadow-lg'>
              <h2 className='text-2xl font-bold mb-6'>About</h2>
              <p className='text-gray-600 leading-relaxed'>{company.description}</p>

              {company.homepage && (
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={company.homepage}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all'
                >
                  <LinkIcon className='w-5 h-5' />
                  Visit Website
                </motion.a>
              )}
            </div>

            {logos?.logos && logos.logos.length > 0 && (
              <div className='bg-white rounded-3xl p-8 shadow-lg'>
                <h2 className='text-2xl font-bold mb-6'>Company Logos</h2>
                <Carousel className='w-full'>
                  <CarouselContent>
                    {logos.logos.map((logo) => {
                      const fullStars = Math.floor(logo.vote_average / 2)
                      const hasHalfStar = (logo.vote_average / 2) % 1 >= 0.5
                      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

                      return (
                        <CarouselItem key={logo.id} className='md:basis-1/2 lg:basis-1/3 xl:basis-1/4'>
                          <Popover>
                            <PopoverTrigger asChild>
                              <motion.div whileHover={{ y: -5 }} className='p-2 cursor-pointer'>
                                <div className='rounded-2xl overflow-hidden bg-gray-50 p-4 aspect-square relative group'>
                                  <img
                                    src={`${configBase.imageBaseUrl}${logo.file_path}`}
                                    alt={`${company.name} logo variant`}
                                    className='w-full h-full object-contain'
                                  />
                                  <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                                </div>
                              </motion.div>
                            </PopoverTrigger>
                            <PopoverContent className='w-64 p-4 bg-white/95 backdrop-blur-sm'>
                              <div className='space-y-3'>
                                <div className='flex items-center justify-between'>
                                  <h4 className='font-semibold'>Rating</h4>
                                  <span className='text-sm text-gray-500'>{logo.vote_average.toFixed(1)}/10</span>
                                </div>
                                <div className='flex gap-1'>
                                  {Array.from({ length: fullStars }).map((_, i) => (
                                    <Star key={`full-${i}`} className='w-5 h-5 fill-yellow-400 text-yellow-400' />
                                  ))}
                                  {hasHalfStar && (
                                    <div className='relative w-5 h-5'>
                                      <Star className='absolute w-5 h-5 text-yellow-400' />
                                      <div className='absolute w-[50%] overflow-hidden'>
                                        <Star className='w-5 h-5 fill-yellow-400 text-yellow-400' />
                                      </div>
                                    </div>
                                  )}
                                  {Array.from({ length: emptyStars }).map((_, i) => (
                                    <Star key={`empty-${i}`} className='w-5 h-5 text-yellow-400' />
                                  ))}
                                </div>

                                <p className='text-sm text-gray-500'>
                                  Based on {logo.vote_count.toLocaleString()} votes
                                </p>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </CarouselItem>
                      )
                    })}
                  </CarouselContent>
                  <CarouselPrevious className='-left-12 hidden md:flex' />
                  <CarouselNext className='-right-12 hidden md:flex' />
                </Carousel>
              </div>
            )}
          </div>

          <div className='lg:col-span-4 space-y-8'>
            <div className='bg-white rounded-3xl p-8 shadow-lg'>
              <h2 className='text-2xl font-bold mb-6'>Company Details</h2>
              <div className='space-y-6'>
                {company.headquarters && (
                  <motion.div whileHover={{ x: 5 }} className='flex items-start gap-4 group'>
                    <div className='p-3 rounded-2xl bg-blue-50 group-hover:bg-blue-100 transition-colors'>
                      <MapPin className='w-6 h-6 text-blue-600' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Headquarters</p>
                      <p className='font-medium mt-1'>{company.headquarters}</p>
                    </div>
                  </motion.div>
                )}

                {company.origin_country && (
                  <motion.div whileHover={{ x: 5 }} className='flex items-start gap-4 group'>
                    <div className='p-3 rounded-2xl bg-purple-50 group-hover:bg-purple-100 transition-colors'>
                      <Globe className='w-6 h-6 text-purple-600' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Country of Origin</p>
                      <p className='font-medium mt-1'>{company.origin_country}</p>
                    </div>
                  </motion.div>
                )}

                {company.parent_company && (
                  <motion.div whileHover={{ x: 5 }} className='flex items-start gap-4 group'>
                    <div className='p-3 rounded-2xl bg-indigo-50 group-hover:bg-indigo-100 transition-colors'>
                      <Building2 className='w-6 h-6 text-indigo-600' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Parent Company</p>
                      <p className='font-medium mt-1'>{company.parent_company}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
