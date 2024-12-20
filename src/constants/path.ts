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
  episode: '/episode',
  episodeDetails: 'tv/:tv_ID/season/:season_ID/episode/:episode_ID/cast',
  searchKeywords_Movie: '/keyword/:keyword_id/movie',
  searchKeywords_TV: '/keyword/:keyword_id/tv',
  companyDetail: '/company/:company_id',
  searchAll: '/search',
  contactDeveloper: '/contact/developer/Minh',
  userHome: '/u/minhDevFE120304/overview',
  userLists: 'u/minhDevFE120304/lists',
  userHome_favoriteMovie: 'u/minhDevFE120304/favorite/movie',
  userHome_favoriteTV: 'u/minhDevFE120304/favorite/tv',
  userHome_Rating_movie: 'u/minhDevFE120304/rating/movie',
  userHome_Rating_tv: 'u/minhDevFE120304/rating/tv',
  userHome_watchListMovie: 'u/minhDevFE120304/watchlists/movie',
  userHome_watchListTV: 'u/minhDevFE120304/watchlists/tv',
  userHome_recommendationsTV: 'u/minhDevFE120304/recommendations/tv',
  userHome_recommendationsMovie: 'u/minhDevFE120304/recommendations/movie',
  userListsDetails: '/list/:listID',
  ListCreated: '/list/new/created',
  addItemList: '/list/new/addItems',
  deletedItemList: '/list/new/DeletedItems',
  updateItems: 'list/new/updateItems/:list_id'
}
export default path
