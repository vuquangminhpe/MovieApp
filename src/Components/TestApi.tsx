import http from '../utils/http'
import Responsive from './Responsive'

export default function TestApi() {
  const theData = http.get(`/account/21525545s`)
  console.log(theData)

  return (
    <div>
      TestApi
      <Responsive />
    </div>
  )
}
