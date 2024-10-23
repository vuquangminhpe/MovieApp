import YouTube from 'react-youtube'

interface YouTubePlayerProps {
  videoId: string
}

const YouTubePlayer = ({ videoId }: YouTubePlayerProps) => {
  const opts = {
    playerVars: {
      autoplay: 1
    }
  }

  return (
    <div className='relative w-full pb-[56.25%] h-0'>
      <YouTube className='absolute top-0 left-0 w-full h-full' videoId={videoId} opts={opts} />
    </div>
  )
}

export default YouTubePlayer
