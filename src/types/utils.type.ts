export interface ErrorResponse<Data> {
  status_message: string
  status_code: string
  results: Data
}

export interface SuccessResponse<Data> {
  page: string
  results: Data
  cast?: Data
  crew?: Data
}
