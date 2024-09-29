/* eslint-disable @typescript-eslint/no-explicit-any */
import YouTube from 'react-youtube'

interface YouTubePlayerProps {
  videoId: string
  onError: (error: any) => void
}

const YouTubePlayer = ({ videoId, onError }: YouTubePlayerProps) => {
  const opts = {
    height: '555',
    width: '1280',
    playerVars: {
      autoplay: 1
    }
  }

  const onPlayerError = (event: any) => {
    console.error('YouTube Player Error:', event)
    onError(event)
  }

  return <YouTube videoId={videoId} opts={opts} onError={onPlayerError} />
}

export default YouTubePlayer
