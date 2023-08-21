import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import LeadPrivateRoute from '../authRoutes/LeadPrivateRoute'
import Loading from '../common/Components/loadingComponent/Loading'
const LoadingLeadHomePage = lazy(() => import('../tutor/pages/LeadHomePage/LeadHomePage'));
const LoadingTutorProfilePage = lazy(() => import('../common/pages/Profile/Profile'))
import Layout from '../student/layouts/layout';
import LeadMessageUI from '../tutor/pages/LeadMessageUI/LeadMessageUI';
function TutorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LeadPrivateRoute>
        <Layout><Suspense fallback={<Loading />}>
          <LoadingLeadHomePage/>
      </Suspense></Layout></LeadPrivateRoute>} />
      
      <Route path='/profile' element={<LeadPrivateRoute><Layout><Suspense fallback={<Loading/>}>
          <LoadingTutorProfilePage/>
          </Suspense></Layout></LeadPrivateRoute>} />
      <Route path='/message' element={<LeadPrivateRoute><Layout>
        <LeadMessageUI/>
      </Layout></LeadPrivateRoute>} />

    </Routes>
  )
}

export default TutorRoutes
