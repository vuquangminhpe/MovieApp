export default function Footer() {
  return (
    <div className=' bg-blue-950 w-full '>
      <div className='flex max-md:grid py-7 justify-center text-center items-center'>
        <div className='flex flex-col items-end'>
          <img
            className='size-28'
            src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
            alt=''
          />
          <div className='bg-white max-w-52 w-52 text-center rounded-sm p-3 text-teal-400 font-bold'>
            Hi minhDevFE120304!
          </div>
        </div>
        <div className='p-4'>
          <ul className='text-white text-start'>
            <li className='font-bold'>The Basics</li>
            <li>Giới thiệu về TMDB</li>
            <li>Contact Us</li>
            <li>Support Forums</li>
            <li>API</li>
            <li>System Status</li>
          </ul>
        </div>

        <div className='p-4'>
          <ul className='text-white text-start top-[100%]'>
            <li className='font-bold'>Legal</li>
            <li>Terms of Use</li>
            <li>API Terms of Use</li>
            <li>Privacy Policy</li>
            <li>DMCA Policy</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
