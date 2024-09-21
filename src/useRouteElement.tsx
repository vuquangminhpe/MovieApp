// import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { useRoutes } from 'react-router-dom'
import path from './constants/path'
import MainLayout from './Layouts/MainLayout'
import HomeMovies from './pages/HomeMovies'

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
  const routeElements = useRoutes([
    {
      path: path.home,
      element: (
        <MainLayout>
          <HomeMovies />
        </MainLayout>
      )
    }
  ])
  return routeElements
}
