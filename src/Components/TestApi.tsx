import http from '../utils/http'
import Responsive from './Responsive'
import TestScrollLayzy from './TestScrollLayzy'

export default function TestApi() {
  const theData = http.get(`/account/21525545s`)
  console.log(theData)

  return (
    <div className='h-[3000px]'>
      TestApi
      <Responsive />
      <TestScrollLayzy />
    </div>
  )
}
