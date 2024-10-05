/* eslint-disable @typescript-eslint/no-explicit-any */
import YouTube from 'react-youtube'

interface YouTubePlayerProps {
  videoId: string
}

const YouTubePlayer = ({ videoId }: YouTubePlayerProps) => {
  const opts = {
    height: '555',
    width: '1280',
    playerVars: {
      autoplay: 1
    }
  }

  return <YouTube videoId={videoId} opts={opts} />
}

export default YouTubePlayer
