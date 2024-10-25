import React from 'react'
import Header from '../../Components/pages/Header'
import Footer from '../../Components/pages/Footer'
import { useQuery } from '@tanstack/react-query'
import { AccountApi_V4 } from '@/Apis/AccountApi_V4'
import { AccountRating, AccountTVRating } from '@/types/Account.type'
import { NavLink } from 'react-router-dom'
import path from '@/constants/path'

interface Props {
  children?: React.ReactNode
}
const radius = 18
const circumference = 2 * Math.PI * radius

export default function UserLayout({ children }: Props) {
  const { data: dataRatedMovie } = useQuery({
    queryKey: ['dataRatedMovie'],
    queryFn: () =>
      AccountApi_V4.getRatedMovie({
        page: 1
      })
  })
  const { data: dataRatedTV } = useQuery({
    queryKey: ['dataRatedTV'],
    queryFn: () =>
      AccountApi_V4.getRatedTV({
        page: 1
      })
  })
  const ratedMovie = dataRatedMovie?.data?.results
  const ratedTV = dataRatedTV?.data?.results

  const dataPersent = (array: AccountRating[] | AccountTVRating[]) => {
    const percentage: number = array?.reduce((result, total) => {
      console.log('value', total?.account_rating?.value)

      return result + Number(total?.account_rating?.value)
    }, 0)
    let colorLiker = '#4CAF50'
    const persents = percentage / array?.length
    if (persents <= 6 && persents >= 3) {
      colorLiker = '#b9d13f'
    } else if (persents < 3) {
      colorLiker = '#ed2133'
    }
    const Circumference = circumference - (persents / 10) * circumference

    return { persents, Circumference, colorLiker }
  }
  const { persents: percentageMovie, Circumference: circumferenceMovie } = dataPersent(ratedMovie as AccountRating[])
  const { colorLiker: colorLikerMovie } = dataPersent(ratedMovie as AccountRating[])
  const { persents: percentageTV, Circumference: circumferenceTV } = dataPersent(ratedTV as AccountTVRating[])
  const { colorLiker: colorLikerTV } = dataPersent(ratedTV as AccountTVRating[])
  console.log(percentageTV)

  const persentPrint = (circumferences: number, percentages: number, colorAdjust: string) => {
    return (
      <div className='w-12 h-12'>
        <svg className='w-full h-full' viewBox='0 0 40 40'>
          <circle
            className='text-gray-700'
            strokeWidth='3'
            stroke='currentColor'
            fill='black'
            r={radius}
            cx='20'
            cy='20'
          />
          <circle
            className='text-lime-400'
            strokeWidth='3'
            strokeLinecap='round'
            stroke={colorAdjust}
            fill='transparent'
            r={radius}
            cx='20'
            cy='20'
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumferences,
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%'
            }}
          />
        </svg>
        <div className='-translate-y-8 z-50 text-white flex items-center justify-center'>
          <span className={`text-xs font-bold `}>{percentages > 0 ? `${percentages * 10}%` : 'NR'}</span>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex flex-col'>
        <div className='relative w-full'>
          <img
            src='https://www.themoviedb.org/assets/2/v4/account_pipes/teal-2b30e621b46abc5f5c1c192b0adfbf81793a9f082d749fc3d20047a4ef10c27f.svg'
            className='absolute z-0 object-cover h-[250px] max-sm:h-[340px] w-full bg-emerald-950'
            alt=''
          />
          <div className='flex max-sm:flex-col translate-y-10 items-center container'>
            <div className='w-[160px] z-50 text-7xl h-[160px] rounded-full text-white text-center bg-emerald-400 items-center flex justify-center font-semibold'>
              M
            </div>
            <div className='flex flex-col'>
              <div className='text-white max-sm:text-center max-sm:my-4 font-bold text-3xl max-md:text-xl z-50'>
                minhDevFE120304
              </div>
              <div className='flex'>
                <div className='flex items-center gap-1 text-white'>
                  {persentPrint(circumferenceMovie, percentageMovie, colorLikerMovie)} Trung bình điểm phim
                </div>
                <div className=' text-4xl w-1 text-white mx-12'>|</div>
                <div className='flex items-center gap-1 text-white'>
                  {persentPrint(circumferenceTV, percentageTV, colorLikerTV)} Trung bình điểm TV
                </div>
              </div>
            </div>{' '}
          </div>
        </div>
        <div className='mt-32 flex justify-center gap-9 items-center text-black'>
          <NavLink className='text-black' to={''}>
            Overview
          </NavLink>
          <NavLink to={`/${path.userHome_Rating_movie}`}>Lists</NavLink>
          <NavLink to={''}>Rating</NavLink>
          <NavLink to={''}>WatchList</NavLink>
        </div>
        <div className='border-b-[1px] border-gray-300'></div>
      </div>
      <main className='flex-grow '>{children}</main>
      <Footer />
    </div>
  )
}
