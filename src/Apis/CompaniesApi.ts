import { Alternative_Names, Company, Logo } from '@/types/Company.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

export const CompaniesApi = {
  getDetailsCompanies: (company_id: number) => http.get<SuccessResponse<Company>>(`company/${company_id}`),
  getDetailsAlternative_names: (company_id: number) =>
    http.get<SuccessResponse<Alternative_Names>>(`company/${company_id}/alternative_names`),
  getDetailsImages: (company_id: number) => http.get<SuccessResponse<Logo>>(`company/${company_id}/images`)
}
