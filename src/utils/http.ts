import axios, { AxiosInstance } from 'axios'
class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTQ1ODM0ZTA1N2JkNWZiNDkxMTdhNGFjNDA3YWNlNSIsIm5iZiI6MTcyNjY0MjM1NS4wODcwNTksInN1YiI6IjY2ZWE3NmU4NTE2OGE4OTZlMTFmM2ZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hAMS-x-u-hRaP9-kBdOS9TqTmywDHBXY5Gzfzx9VSEw'
    this.instance = axios.create({
      baseURL: 'https://api.themoviedb.org/3/',
      timeout: 10000
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http
