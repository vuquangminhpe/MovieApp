export interface ErrorResponse<Data> {
  page: string
  results?: Data
}

export interface SuccessResponse<Data> {
  page: string
  results: Data
}
