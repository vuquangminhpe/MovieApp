import { getIdFromNameId } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { CompaniesApi } from '@/Apis/CompaniesApi'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/Components/ui/carousel'

export default function CompanyDetails() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const { company_id } = useParams()
  const CompanyID = getIdFromNameId(company_id as string)
  const { data: dataCompanyDetail } = useQuery({
    queryKey: ['dataCompanyDetail', CompanyID],
    queryFn: () => CompaniesApi.getDetailsCompanies(Number(CompanyID))
  })
  const { data: dataAlternative_names } = useQuery({
    queryKey: ['dataAlternative_names', CompanyID],
    queryFn: () => CompaniesApi.getDetailsAlternative_names(Number(CompanyID))
  })
  const { data: dataImages } = useQuery({
    queryKey: ['dataImages', CompanyID],
    queryFn: () => CompaniesApi.getDetailsImages(Number(CompanyID))
  })

  const dataCompanyDetails = dataCompanyDetail?.data
  const dataAlternativeName = dataAlternative_names?.data
  const dataCompanyIMG = dataImages?.data
  console.log(dataCompanyDetails)

  return <div className='flex flex-grow'></div>
}
