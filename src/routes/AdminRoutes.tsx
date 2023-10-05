import  { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminPrivateRoute from '../authRoutes/AdminPrivateRoute'
import Loading from '../common/Components/loadingComponent/Loading'
const LoadingAdminHomePage = lazy(() => import('../admin/pages/AdminHomePage/AdminHomePage'));
function Adminroutes() {
  return (
    <Routes>
      <Route path='/'  element={<AdminPrivateRoute><Suspense fallback={<Loading/>}>
          <LoadingAdminHomePage/>
          </Suspense></AdminPrivateRoute>}/>
   </Routes>
  )
}

export default Adminroutes
