import { PersonDetailsApi } from '@/Apis/PersonDetailsApi'
import configBase from '@/constants/config'
import path from '@/constants/path'
import { generateNameId } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const RANGE = 2
export default function PeopleList() {
  const [page, setPage] = useState<number>(1)
  const { data, refetch } = useQuery({
    queryKey: ['dataPersonAll', []],
    queryFn: () => PersonDetailsApi.getPeopleList({ language: 'en-US', page: page })
  })

  const dataAllPerson = data?.data.results
  const pageSize = Number(data?.data?.total_pages)
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button key={index} className='bg-white text-black rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'>
            ...
          </button>
        )
      }
      return null
    }
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button key={index} className='bg-white text-black rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'>
            ...
          </button>
        )
      }
      return null
    }
    useEffect(() => {
      if (page >= 1) refetch()
    }, [page, dataAllPerson])
    if (pageSize)
      return Array(pageSize)
        .fill(0)
        .map((_, index) => {
          const pageNumber = index + 1
          if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
            if (pageNumber < page - RANGE && pageNumber > RANGE) {
              return renderDotBefore(index)
            } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
              return renderDotAfter(index)
            }
          } else if (page >= pageSize - RANGE * 2 && page > RANGE && pageNumber < page - RANGE) {
            return renderDotBefore(index)
          }
          return (
            <div
              onClick={() => setPage(index + 1)}
              key={index}
              className={`bg-white rounded text-black px-3 py-2 shadow-sm mx-2 cursor-pointer border ${
                pageNumber === page ? 'border-cyan-500 text-cyan-500' : 'border-gray-300'
              }`}
            >
              {pageNumber}
            </div>
          )
        })
  }
  return (
    <div className='container py-24 max-md:pr-2'>
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
      <div className='text-white flex flex-wrap justify-center gap-2 items-center mt-20 px-4 max-w-full overflow-x-auto'>
        {renderPagination()}
      </div>{' '}
    </div>
  )
}
