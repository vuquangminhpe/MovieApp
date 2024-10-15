import { PersonDetailsApi } from '@/Apis/PersonDetailsApi'
import configBase from '@/constants/config'
import path from '@/constants/path'
import { generateNameId } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

export default function PeopleList() {
  const { data } = useQuery({
    queryKey: ['dataPersonAll', []],
    queryFn: () => PersonDetailsApi.getPeopleList({ language: 'en-US' })
  })
  const dataAllPerson = data?.data.results
  console.log(dataAllPerson)

  return (
    <div className='container py-7'>
      <div className='grid grid-cols-4 h-auto w-auto'>
        {dataAllPerson?.map((itemPerson) => (
          <Link
            to={`${path.person}/${generateNameId({ name: itemPerson.name, id: itemPerson.id })}`}
            className='mb-2 ml-5 inline-block bg-white shadow-xl rounded-xl'
            key={itemPerson.id}
          >
            <img
              className='w-full h-[300px] object-cover  rounded-t-xl'
              src={`${configBase.imageBaseUrl}${itemPerson.profile_path}`}
              alt=''
            />
            <div className='font-bold text-sm p-3 dark:text-black'>{itemPerson.name}</div>
            <div className='p-3 text-gray-400 text-sm w-auto'>
              {itemPerson.known_for.map((item) => (
                <div>{item.title}</div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
