// import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { useRoutes } from 'react-router-dom'
import path from './constants/path'
import MainLayout from './Layouts/MainLayout'
import HomeMovies from './pages/HomeMovies'
import MovieDetails from './pages/MovieDetails'
import CastDetails from './pages/CastDetails'
import CollectionMovies from './pages/Collection'
import MovieList from './pages/MovieList'

// function ProtectedRoute() {
//   const { isAuthenticated } = useContext(AppContext)
//   return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
// }
// function RejectedRoute() {
//   const { isAuthenticated } = useContext(AppContext)
//   return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
// }
// export default function useRouteElement() {
//   const routeElements = useRoutes([
//     {
//       path: '/',
//       element: <RejectedRoute />,
//       children: [
//         {
//           path: path.login,
//           element: (
//             <RegisterLayout>
//               <Login />
//             </RegisterLayout>
//           )
//         }
//       ]
//     },
//     {
//       path: '',
//       element: <ProtectedRoute />,
//       children: [
//         {
//           path: path.cart,
//           element: (
//             <CartLayout>
//               <Cart />
//             </CartLayout>
//           )
//         },
//         {
//           path: path.user,
//           element: (
//             <MainLayout>
//               <UserLayout />
//             </MainLayout>
//           ),
//           children: [
//             {
//               path: path.profile,
//               element: <Profile />
//             },
//             {
//               path: path.changePassword,
//               element: <ChangePassword />
//             },
//             {
//               path: path.historyPurchase,
//               element: <HistoryPurchase />
//             }
//           ]
//         }
//       ]
//     },
//     {
//       path: path.productDetail,
//       index: true,
//       element: (
//         <MainLayout>
//           <ProductDetail />
//         </MainLayout>
//       )
//     },
//     {
//       path: '',
//       index: true,
//       element: (
//         <MainLayout>
//           <ProductList />
//         </MainLayout>
//       )
//     },
//     {
//       path: '*',
//       element: (
//         <MainLayout>
//           <NotFound />
//         </MainLayout>
//       )
//     }
//   ])
//   return routeElements
// }
export default function useRouteElement() {
  // const location = useLocation()
  // const dataLink = location.pathname

  const routeElements = useRoutes([
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
    }
  ])
  return routeElements
}
