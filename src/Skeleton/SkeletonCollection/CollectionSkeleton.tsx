export default function CollectionSkeleton() {
  return (
    <div>
      <div className='text-center mt-8 mb-12'>
        <button className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50'>
          'Loading...'
        </button>
      </div>
    </div>
  )
}
