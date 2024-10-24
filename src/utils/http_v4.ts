import axios, { AxiosInstance } from 'axios'
import configBase from '../constants/config'
class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTQ1ODM0ZTA1N2JkNWZiNDkxMTdhNGFjNDA3YWNlNSIsIm5iZiI6MTcyOTY4MzAwNy45NjY3MjUsInN1YiI6IjY2ZWE3NmU4NTE2OGE4OTZlMTFmM2ZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UXE2WW-83B4GESnEr6IA-U5cTCi2otuKX9Dxrqhh-ww'
    this.instance = axios.create({
      baseURL: configBase.baseURL_V4,
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
const http_v4 = new Http().instance
export default http_v4
