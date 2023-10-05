import  { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import SuperAdminPrivateRoute from '../authRoutes/SuperAdminPrivateRoute'
import Loading from '../common/Components/loadingComponent/Loading'
const LoadingSuperAdminHomePage = lazy(() => import('../admin/pages/SuperAdminHomePage/SuperAdminHomePage'))
function SuperAdminRoutes() {
  return (
    <Routes>
      <Route path='/' element={<SuperAdminPrivateRoute><Suspense fallback={<Loading/>}>
          <LoadingSuperAdminHomePage/>
          </Suspense></SuperAdminPrivateRoute>}/>
   </Routes>
  )
}

export default SuperAdminRoutes
