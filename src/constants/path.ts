const path = {
  home: '/',
  movie: '/movie',
  person: '/person',
  OnTvSeries: '/tv',
  collection: '/collection',
  movieDetails: 'movie/:movieId',
  tvDetails: 'tv/:tvID',
  castDetails: 'person/:personId',
  movie_popular: '/movie/Popular',
  movie_now_playing: '/movie/Now_Playing',
  movie_upcoming: '/movie/Upcoming',
  movie_top_rated: '/movie/Top_Rated',
  tv_popular: '/tv/Popular',
  tv_airing_today: '/tv/Airing_Today',
  on_tv: '/tv/On-the-air',
  tv_top_rated: '/tv/Top_Rated',
  collectionDetails: '/collection/:collection_id',
  peopleList: '/person_list',
  season: '/season',
  seasonDetails: 'tv/:tv_ID/season/:season_ID/episode/:episode_ID',
  episode: '/episode'
}
export default path
