interface DynamicMovieBackdropProps {
  children: React.ReactNode
  imageUrl: string
}

const DynamicMovieBackdrop = ({ children, imageUrl }: DynamicMovieBackdropProps) => {
  return (
    <div className='relative w-full h-full overflow-hidden flex items-center'>
      <img
        src={imageUrl}
        alt=''
        className='absolute w-full h-full bg-no-repeat object-cover z-0 scale-125 translate-x-28 translate-y-14'
      />
      <div
        className={`absolute inset-0  mix-blend-multiply z-10`}
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.84) 100%)'
        }}
      ></div>
      <div className='relative z-20 container mx-auto px-4'>{children}</div>
    </div>
  )
}

export default DynamicMovieBackdrop
