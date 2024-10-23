// import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { useRoutes } from 'react-router-dom'
import path from './constants/path'
import MainLayout from './Layouts/MainLayout'
import HomeMovies from './pages/HomeMovies'
import MovieDetails from './pages/MovieDetails'
import CastDetails from './pages/CastDetails'
import CollectionMovies from './pages/Collection'
import MovieList from './pages/MovieList'
import PeopleList from './pages/PeopleList'
import TVSeriesDetails from './pages/TVSeriesDetails'
import SeasonDetails from './pages/SeasonDetails'
import Episodes_Season from './pages/Episodes_Season/Episodes_Season'
import KeyWordsMovie_TV_All from './pages/KeyWordsMovie_TV_All'
import Search_All_Type from './pages/Search_All_Type'
import CompanyDetails from './pages/CompanyDetails'

const fixSearch = [
  { name: 'tv' },
  { name: 'movie' },
  { name: 'company' },
  { name: 'person' },
  { name: 'collection' },
  { name: 'network' },
  { name: 'keyword' }
]

export default function useRouteElement() {
  const baseRoutes = [
    {
      path: path.home,
      element: (
        <MainLayout>
          <HomeMovies />
        </MainLayout>
      )
    },
    {
      path: path.movieDetails,
      index: true,
      element: (
        <MainLayout>
          <MovieDetails />
        </MainLayout>
      )
    },
    {
      path: path.tvDetails,
      index: true,
      element: (
        <MainLayout>
          <TVSeriesDetails />
        </MainLayout>
      )
    },
    {
      path: path.castDetails,
      index: true,
      element: (
        <MainLayout>
          <CastDetails />
        </MainLayout>
      )
    },
    {
      path: path.collectionDetails,
      index: true,
      element: (
        <MainLayout>
          <CollectionMovies />
        </MainLayout>
      )
    },
    {
      path: path.movie_popular,
      index: true,
      element: (
        <MainLayout>
          <MovieList />
        </MainLayout>
      )
    },
    {
      path: path.movie_now_playing,
      index: true,
      element: (
        <MainLayout>
          <MovieList />
        </MainLayout>
      )
    },
    {
      path: path.movie_upcoming,
      index: true,
      element: (
        <MainLayout>
          <MovieList />
        </MainLayout>
      )
    },
    {
      path: path.movie_top_rated,
      index: true,
      element: (
        <MainLayout>
          <MovieList />
        </MainLayout>
      )
    },
    {
      path: path.tv_popular,
      index: true,
      element: (
        <MainLayout>
          <MovieList />
        </MainLayout>
      )
    },
    {
      path: path.tv_airing_today,
      index: true,
      element: (
        <MainLayout>
          <MovieList />
        </MainLayout>
      )
    },
    {
      path: path.tv_top_rated,
      index: true,
      element: (
        <MainLayout>
          <MovieList />
        </MainLayout>
      )
    },
    {
      path: path.on_tv,
      index: true,
      element: (
        <MainLayout>
          <MovieList />
        </MainLayout>
      )
    },
    {
      path: path.peopleList,
      index: true,
      element: (
        <MainLayout>
          <PeopleList />
        </MainLayout>
      )
    },
    {
      path: path.seasonDetails,
      index: true,
      element: (
        <MainLayout>
          <SeasonDetails />
        </MainLayout>
      )
    },
    {
      path: path.episodeDetails,
      index: true,
      element: (
        <MainLayout>
          <Episodes_Season />
        </MainLayout>
      )
    },
    {
      path: path.searchKeywords_Movie,
      index: true,
      element: (
        <MainLayout>
          <KeyWordsMovie_TV_All />
        </MainLayout>
      )
    },
    {
      path: path.searchKeywords_TV,
      index: true,
      element: (
        <MainLayout>
          <KeyWordsMovie_TV_All />
        </MainLayout>
      )
    },
    {
      path: path.searchAll,
      index: true,
      element: (
        <MainLayout>
          <Search_All_Type />
        </MainLayout>
      )
    },
    {
      path: path.companyDetail,
      index: true,
      element: (
        <MainLayout>
          <CompanyDetails />
        </MainLayout>
      )
    }
  ]

  const searchRoutes = fixSearch.map(({ name }) => ({
    path: `${path.searchAll}/${name}`,
    index: true,
    element: (
      <MainLayout>
        <Search_All_Type />
      </MainLayout>
    )
  }))

  const allRoutes = [...baseRoutes, ...searchRoutes]

  const routeElements = useRoutes(allRoutes)

  return routeElements
}
