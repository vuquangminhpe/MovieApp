import http from '../utils/http'

export default function TestApi() {
  const theData = http.get(`/account/21525545s`)
  console.log(theData)

  return <div>TestApi</div>
}
