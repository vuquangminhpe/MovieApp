/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import path from './constants/path'
import MainLayout from './Layouts/MainLayout'
import UserLayout from './Layouts/UserLayout'

const HomeMovies = lazy(() => import('./pages/HomeMovies'))
const MovieDetails = lazy(() => import('./pages/MovieDetails'))
const CastDetails = lazy(() => import('./pages/CastDetails'))
const CollectionMovies = lazy(() => import('./pages/Collection'))
const MovieList = lazy(() => import('./pages/MovieList'))
const PeopleList = lazy(() => import('./pages/PeopleList'))
const TVSeriesDetails = lazy(() => import('./pages/TVSeriesDetails'))
const SeasonDetails = lazy(() => import('./pages/SeasonDetails'))
const Episodes_Season = lazy(() => import('./pages/Episodes_Season/Episodes_Season'))
const KeyWordsMovie_TV_All = lazy(() => import('./pages/KeyWordsMovie_TV_All'))
const Search_All_Type = lazy(() => import('./pages/Search_All_Type'))
const CompanyDetails = lazy(() => import('./pages/CompanyDetails'))
const ContactDeveloper = lazy(() => import('./pages/ContactDeveloper'))
const UserHome = lazy(() => import('./pages/UserHome'))
const UserList = lazy(() => import('./pages/UserActionAll/UserList'))
const UserActionAll = lazy(() => import('./pages/UserActionAll'))
const UserListDetails = lazy(() => import('./pages/UserActionAll/UserListDetails'))
const NotFound = lazy(() => import('./pages/404NotFound'))
const CreatedList_User = lazy(() => import('./pages/CreatedList_User'))
const AddItem = lazy(() => import('./pages/CreatedList_User/AddItem'))
const DeleteList = lazy(() => import('./pages/CreatedList_User/DeleteList'))

const LoadingFallback = () => (
  <div className='flex items-center justify-center min-h-screen'>
    <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
  </div>
)

const SuspenseWrapper = ({ children }: any) => <Suspense fallback={<LoadingFallback />}>{children}</Suspense>

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
          <SuspenseWrapper>
            <HomeMovies />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.movieDetails,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <MovieDetails />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.tvDetails,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <TVSeriesDetails />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.castDetails,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <CastDetails />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.collectionDetails,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <CollectionMovies />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.movie_popular,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <MovieList />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.movie_now_playing,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <MovieList />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.movie_upcoming,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <MovieList />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.movie_top_rated,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <MovieList />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.tv_popular,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <MovieList />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.tv_airing_today,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <MovieList />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.tv_top_rated,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <MovieList />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.on_tv,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <MovieList />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.peopleList,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <PeopleList />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.seasonDetails,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <SeasonDetails />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.episodeDetails,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <Episodes_Season />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.searchKeywords_Movie,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <KeyWordsMovie_TV_All />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.searchKeywords_TV,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <KeyWordsMovie_TV_All />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.searchAll,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <Search_All_Type />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.companyDetail,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <CompanyDetails />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.contactDeveloper,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <ContactDeveloper />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.userHome,
      element: (
        <UserLayout>
          <SuspenseWrapper>
            <UserHome />
          </SuspenseWrapper>
        </UserLayout>
      )
    },
    {
      path: path.userLists,
      element: (
        <UserLayout>
          <SuspenseWrapper>
            <UserList />
          </SuspenseWrapper>
        </UserLayout>
      )
    },
    {
      path: path.userHome_Rating_movie,
      element: (
        <UserLayout>
          <SuspenseWrapper>
            <UserActionAll />
          </SuspenseWrapper>
        </UserLayout>
      )
    },
    {
      path: path.userHome_Rating_tv,
      element: (
        <UserLayout>
          <SuspenseWrapper>
            <UserActionAll />
          </SuspenseWrapper>
        </UserLayout>
      )
    },
    {
      path: path.userHome_favoriteMovie,
      element: (
        <UserLayout>
          <SuspenseWrapper>
            <UserActionAll />
          </SuspenseWrapper>
        </UserLayout>
      )
    },
    {
      path: path.userHome_favoriteTV,
      element: (
        <UserLayout>
          <SuspenseWrapper>
            <UserActionAll />
          </SuspenseWrapper>
        </UserLayout>
      )
    },
    {
      path: path.userHome_watchListMovie,
      element: (
        <UserLayout>
          <SuspenseWrapper>
            <UserActionAll />
          </SuspenseWrapper>
        </UserLayout>
      )
    },
    {
      path: path.userHome_watchListTV,
      element: (
        <UserLayout>
          <SuspenseWrapper>
            <UserActionAll />
          </SuspenseWrapper>
        </UserLayout>
      )
    },
    {
      path: path.userHome_recommendationsMovie,
      element: (
        <UserLayout>
          <SuspenseWrapper>
            <UserActionAll />
          </SuspenseWrapper>
        </UserLayout>
      )
    },
    {
      path: path.userHome_recommendationsTV,
      element: (
        <UserLayout>
          <SuspenseWrapper>
            <UserActionAll />
          </SuspenseWrapper>
        </UserLayout>
      )
    },
    {
      path: path.userListsDetails,
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <UserListDetails />
          </SuspenseWrapper>
        </MainLayout>
      )
    },
    {
      path: path.ListCreated,
      element: (
        <UserLayout>
          <SuspenseWrapper>
            <CreatedList_User />
          </SuspenseWrapper>
        </UserLayout>
      )
    },
    {
      path: path.addItemList,
      element: (
        <UserLayout>
          <SuspenseWrapper>
            <AddItem />
          </SuspenseWrapper>
        </UserLayout>
      )
    },
    {
      path: path.deletedItemList,
      element: (
        <UserLayout>
          <SuspenseWrapper>
            <DeleteList />
          </SuspenseWrapper>
        </UserLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <SuspenseWrapper>
            <NotFound />
          </SuspenseWrapper>
        </MainLayout>
      )
    }
  ]

  const searchRoutes = fixSearch.map(({ name }) => ({
    path: `${path.searchAll}/${name}`,
    element: (
      <MainLayout>
        <SuspenseWrapper>
          <Search_All_Type />
        </SuspenseWrapper>
      </MainLayout>
    )
  }))

  const allRoutes = [...baseRoutes, ...searchRoutes]
  const routeElements = useRoutes(allRoutes)

  return routeElements
}
