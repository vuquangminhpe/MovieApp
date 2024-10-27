import axios, { AxiosInstance } from 'axios'
import configBase from '../constants/config'

class Http {
  instance: AxiosInstance
  private accessToken: string

  constructor() {
    this.accessToken =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MmU3MGVlNDNlYzdhZDc4ZDY2MzNiNGZmZDU4MWQ2NyIsIm5iZiI6MTczMDAxNDQ0Ni42NTE1MzIsImp0aSI6IjY3MWRlYzRiYTdkMzUzNjI4YjhiNmY0MSIsInN1YiI6IjY2ZWE3NmU4NTE2OGE4OTZlMTFmM2ZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCIsImFwaV93cml0ZSJdLCJ2ZXJzaW9uIjoyfQ.79UsiMBnZ99ynKqijXUC1AIc46riC3ihXsUibzn9BD0'

    this.instance = axios.create({
      baseURL: configBase.baseURL_V4,
      timeout: 10000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          // Add authorization header
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

const http_v4 = new Http().instance
export default http_v4
