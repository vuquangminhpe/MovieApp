/* eslint-disable @typescript-eslint/no-explicit-any */
import { AccountApi_V4 } from '@/Apis/AccountApi_V4'
import { useQuery } from '@tanstack/react-query'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/Components/ui/chart'
import { AccountRating, AccountTVRating } from '@/types/Account.type'
import Skeleton from '@/Skeleton/Skeleton'

const chartConfig = {
  Movie: {
    label: 'Movie',
    color: '#2563eb'
  },
  TV_Shows: {
    label: 'TV Shows',
    color: '#60a5fa'
  }
} satisfies ChartConfig

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export default function UserHome() {
  const { data: dataRated_Movie, isLoading: dataRated_MovieLoading } = useQuery({
    queryKey: ['dataRated_Movie'],
    queryFn: () => AccountApi_V4.getRatedMovie({ page: 1 })
  })
  const { data: dataRated_TVShows, isLoading: dataRated_TVShowsLoading } = useQuery({
    queryKey: ['dataRated_TVShows'],
    queryFn: () => AccountApi_V4.getRatedTV({ page: 1 })
  })
  const dataRated_M = dataRated_Movie?.data.results
  const dataRated_TV = dataRated_TVShows?.data.results
  const filterDataRated = (data: AccountRating[] | AccountTVRating[]) => {
    const monthlyRatings: Record<number, number> = {}

    data.forEach((item) => {
      const month = new Date(item?.account_rating?.created_at as string).getMonth()
      if (monthlyRatings[month] !== undefined) {
        monthlyRatings[month] += 1
      } else {
        monthlyRatings[month] = 1
      }
    })

    return monthlyRatings
  }

  const monthlyRatings_Movie = dataRated_M ? filterDataRated(dataRated_M) : {}
  const monthlyRatings_TV = dataRated_TV ? filterDataRated(dataRated_TV) : {}
  const chartData = months.map((month, index) => {
    const monthNumber = index + 1

    const movieData = monthlyRatings_Movie[monthNumber] || 0
    const tvData = monthlyRatings_TV[monthNumber] || 0

    return {
      month,
      Movie: movieData,
      TV_Shows: tvData
    }
  })
  if (dataRated_MovieLoading && dataRated_TVShowsLoading) {
    return <Skeleton />
  }
  return (
    <div className='mt-5 container flex flex-col'>
      <div className='mb-5'>
        <div className='text-black font-bold text-sm dark:text-white'>Start</div>
        <div className='flex justify-between mx-3'>
          <div className='flex flex-col'>
            <div className='text-black dark:text-white text-sm capitalize'>total edits</div>
            <div className='text-emerald-400 font-bold text-4xl dark:text-white capitalize'>4</div>
          </div>
          <div className='flex flex-col'>
            <div className='text-black dark:text-white text-sm capitalize'>total ratings</div>
            <div className='text-emerald-400 font-bold text-4xl dark:text-white capitalize'>
              {(dataRated_M?.length as number) + (dataRated_TV?.length as number)}
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col mt-5 mb-20'>
        <div className='capitalize font-bold dark:text-white text-black text-4xl'>upcoming from watchlist</div>
        <div>there are no upcoming movies on your watchlist</div>
      </div>
      <ChartContainer config={chartConfig} className='min-h-[200px] max-h-[400px] w-full'>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='month'
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey='Movie' fill='var(--color-Movie)' radius={4} />
          <Bar dataKey='TV_Shows' fill='var(--color-TV_Shows)' radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
