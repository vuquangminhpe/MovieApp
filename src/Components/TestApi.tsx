import { useQuery } from '@tanstack/react-query'
import Responsive from './Responsive'
import TestScrollLayzy from './TestScrollLayzy'
import { ListApi } from '../Apis/ListApi'

export default function TestApi() {
  const { data: DataRated } = useQuery({
    queryKey: ['listRated'],
    queryFn: () => ListApi.DataRated()
  })
  console.log(DataRated)

  return (
    <div className='h-[3000px]'>
      TestApi
      <Responsive />
      <TestScrollLayzy />
    </div>
  )
}
