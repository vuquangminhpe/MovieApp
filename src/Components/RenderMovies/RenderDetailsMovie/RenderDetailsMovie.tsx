import { Aggregate_Credits } from '@/types/TVSeries.type'
import configBase from '../../../constants/config'
import { BackdropImages, CastMember, DetailsImages, MovieCast, videosDetails } from '../../../types/Movie'

interface RenderMoviesProps {
  dataMovieDetails?: CastMember | MovieCast | videosDetails | Aggregate_Credits
  configWidth_Height?: string
  dataShowDetails?: BackdropImages | DetailsImages
  isShow?: boolean
}

const RenderDetailsMovie = ({
  dataMovieDetails,
  configWidth_Height = 'w-48 h-72',
  dataShowDetails,
  isShow = true
}: RenderMoviesProps) => {
  return (
    <div className='rounded-2xl'>
      {isShow && (
        <div
          className={`${configWidth_Height}  bg-gradient-to-b from-blue-900 to-black rounded-t-2xl overflow-hidden shadow-lg relative`}
        >
          <div className='absolute top-2 right-2 z-10'>
            <div className='w-6 h-6 flex items-center justify-center cursor-pointer'></div>
          </div>
          <div>
            <img
              className='w-full h-full object-cover rounded-t-xl shadow-sm'
              src={
                (dataMovieDetails as CastMember).profile_path == null
                  ? 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
                  : `${configBase.imageBaseUrl}${(dataMovieDetails as CastMember).profile_path}`
              }
            />
          </div>
        </div>
      )}
      {!isShow && (
        <div
          className={`${configWidth_Height}  bg-gradient-to-b from-blue-900 to-black rounded-2xl overflow-hidden shadow-lg relative`}
        >
          <img
            className='w-full h-full object-cover rounded-t-2xl shadow-sm'
            src={
              (dataShowDetails as BackdropImages)?.file_path == null
                ? 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
                : `${configBase.imageBaseUrl}${(dataShowDetails as BackdropImages)?.file_path}`
            }
          />
        </div>
      )}
    </div>
  )
}

export default RenderDetailsMovie
