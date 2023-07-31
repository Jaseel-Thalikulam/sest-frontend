import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import LearnPrivateRoute from '../authRoutes/LearnPrivateRoute'
import Loading from '../common/Components/loadingComponent/Loading'
const LoadingLearnHomePage = lazy(() => import('../student/LearnHomePage/LearnHomePage'));

function Studentroutes() {
  return (
    
    <Routes>
    
          <Route path='/'  element={<LearnPrivateRoute><Suspense fallback={<Loading/>}>
          <LoadingLearnHomePage/>
          </Suspense></LearnPrivateRoute>}  >   
          </Route>


   </Routes>
  )
}

export default Studentroutes
