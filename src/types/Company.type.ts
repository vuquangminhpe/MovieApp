export interface Company {
  description: string
  headquarters: string
  homepage: string
  id: number
  logo_path: string
  name: string
  origin_country: string
  parent_company: string
}

export interface Alternative_Names {
  id: number
  results: [
    {
      name: string
      type: string
    }
  ]
}
export interface Logo {
  id: number
  logos: [
    {
      aspect_ratio: number
      file_path: string
      height: number
      id: string
      file_type: string
      vote_average: number
      vote_count: number
      width: number
    }
  ]
}
