interface YouTubePlayerProps {
  videoId: string
}

const YouTubePlayer = ({ videoId }: YouTubePlayerProps) => {
  return (
    <div className='relative w-full pt-[56.25%]'>
      <iframe
        className='absolute top-0 left-0 w-full h-full'
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />
    </div>
  )
}

export default YouTubePlayer
