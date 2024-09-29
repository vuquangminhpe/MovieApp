import { Link } from 'react-router-dom'
import configBase from '../../../constants/config'
import path from '../../../constants/path'
import { generateNameId } from '../../../utils/utils'
import { CastMember, MovieCast, videosDetails } from '../../../types/Movie'

interface RenderMoviesProps {
  dataMovieDetails: CastMember | MovieCast | videosDetails
  configWidth_Height?: string
}

const RenderDetailsMovie = ({ dataMovieDetails, configWidth_Height = 'w-48 h-72' }: RenderMoviesProps) => {
  return (
    <div
      className={`${configWidth_Height}  bg-gradient-to-b from-blue-900 to-black rounded-t-2xl overflow-hidden shadow-lg relative`}
    >
      <div className='absolute top-2 right-2 z-10'>
        <div className='w-6 h-6 flex items-center justify-center cursor-pointer'></div>
      </div>
      <Link
        to={`${path.home}${generateNameId({ name: (dataMovieDetails as CastMember as CastMember).name || ((dataMovieDetails as CastMember).original_name as string), id: (dataMovieDetails as CastMember).id as number })}`}
      >
        <img
          className='w-full h-full object-cover rounded-t-xl shadow-sm'
          src={
            (dataMovieDetails as CastMember).profile_path == null
              ? 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
              : `${configBase.imageBaseUrl}${(dataMovieDetails as CastMember).profile_path}`
          }
        />
      </Link>
    </div>
  )
}

export default RenderDetailsMovie
