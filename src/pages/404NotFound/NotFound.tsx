import HelMet from '@/Components/Custom/HelMet'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className='bg-white dark:bg-gray-900'>
      <HelMet title='404 not found' />
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-950 dark:text-primary-500'>
            404
          </h1>
          <p className='mb-4 text-3xl tracking-tight font-bold text-blue-950 md:text-4xl dark:text-white'>
            Something's missing.
          </p>
          <p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
            Sorry, we can't find that page. You'll find lots to explore on the home page.
          </p>
          <Link
            to='/'
            className='inline-flex text-black bg-primary-600 hover:bg-gray-500 bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4'
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  )
}
