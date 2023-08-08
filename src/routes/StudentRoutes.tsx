import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import LearnPrivateRoute from '../authRoutes/LearnPrivateRoute'
import Loading from '../common/Components/loadingComponent/Loading'
import TutorDetailPage from '../student/TutorDetailPage/TutorDetailPage';
const LoadingLearnHomePage = lazy(() => import('../student/StudentHomePage/LearnHomePage'));

function Studentroutes() {
  return (
    
    <Routes>
    
          <Route path='/'  element={<LearnPrivateRoute><Suspense fallback={<Loading/>}>
          <LoadingLearnHomePage/>
          </Suspense></LearnPrivateRoute>}  >   
      </Route>
      <Route path='/tutor/:tutorId' Component={TutorDetailPage} />


   </Routes>
  )
}

export default Studentroutes
