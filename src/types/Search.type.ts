/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ownerGenres } from './Movie'

export interface typeSearchKeyWord extends ownerGenres {}
export interface searchAll_Config {
  query: string
  language?: string
  page?: number
}
export interface companies {
  id: string
  logo_path: string
  name: string
  origin_country: string
}
