import axios, { AxiosInstance } from 'axios'
import configBase from '../constants/config'
class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MmU3MGVlNDNlYzdhZDc4ZDY2MzNiNGZmZDU4MWQ2NyIsIm5iZiI6MTczMDAxMzQ3Ny4yOTU5OTgsInN1YiI6IjY2ZWE3NmU4NTE2OGE4OTZlMTFmM2ZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qZQXSosq1iw29FeiyOxdakKx3a6pHx73y5fj_pvPiwg'
    this.instance = axios.create({
      baseURL: configBase.baseURL,
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
