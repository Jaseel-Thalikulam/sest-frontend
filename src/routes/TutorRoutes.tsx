import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import LeadPrivateRoute from '../authRoutes/LeadPrivateRoute'
import Loading from '../common/Components/loadingComponent/Loading'
const LoadingLeadHomePage = lazy(() => import('../tutor/pages/LeadHomePage/LeadHomePage'));
const LoadingTutorProfilePage = lazy(() => import('../tutor/pages/Profile/Profile'))
function TutorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LeadPrivateRoute><Suspense fallback={<Loading/>}>
          <LoadingLeadHomePage/>
      </Suspense></LeadPrivateRoute>} />
      
      <Route path='/profile' element={<LeadPrivateRoute><Suspense fallback={<Loading/>}>
          <LoadingTutorProfilePage/>
          </Suspense></LeadPrivateRoute>} />

    </Routes>
  )
}

export default TutorRoutes
