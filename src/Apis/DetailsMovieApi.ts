import http from '../utils/http'

const DetailsMovieApi = {
  getDetailsMovie: (movie_id: string) => http.get(`movie/${movie_id}`)
}

export default DetailsMovieApi
