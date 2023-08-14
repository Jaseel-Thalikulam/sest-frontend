import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import LearnPrivateRoute from '../authRoutes/LearnPrivateRoute'
import Loading from '../common/Components/loadingComponent/Loading'
import TutorDetailPage from '../student/pages/TutorDetailPage/TutorDetailPage';
const LoadingLearnHomePage = lazy(() => import('../student/pages/StudentHomePage/LearnHomePage'));
const LoadingProfilePage = lazy(() => import('../common/pages/Profile/Profile'));

function Studentroutes() {
  return (
    
    <Routes>
    
          <Route path='/'  element={<LearnPrivateRoute><Suspense fallback={<Loading/>}>
          <LoadingLearnHomePage/>
          </Suspense></LearnPrivateRoute>}>   
      </Route>
      <Route path='/tutor/:tutorId' Component={TutorDetailPage} />
      <Route path='/profile' element={<LearnPrivateRoute><Suspense fallback={<Loading/>}>
          <LoadingProfilePage/>
          </Suspense></LearnPrivateRoute>} />


   </Routes>
  )
}

export default Studentroutes
