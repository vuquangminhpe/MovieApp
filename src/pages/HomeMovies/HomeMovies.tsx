export default function HomeMovies() {
  return (
    <div className='flex flex-col'>
      <div className='relative'>
        <div className='absolute w-full flex flex-col items-start p-11'>
          <h1 className=' text-[40px] text-white'>
            <div className='font-bold'>Welcome.</div> Millions of movies, TV shows and people to discover. Explore now.
          </h1>
          <div className=' w-[80%] mt-6 '>
            <input type='text' className='w-full h-11 rounded-xl shadow-sm' />
            <button className='absolute mr-5 text-white h-11 -translate-x-6 w-20 rounded-xl bg-gradient-to-r from-green-400 to-green-400/90'>
              Search
            </button>
          </div>
        </div>

        <img
          className='w-full h-[350px] bg-contain '
          src='https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/SqAZjEqqBAYvyu3KSrWq1d0QLB.jpg'
          alt=''
        />
      </div>
      <div className='container'></div>
    </div>
  )
}
