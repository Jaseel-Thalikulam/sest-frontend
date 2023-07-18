import React, {lazy, Suspense} from 'react';
import './App.scss';
import Loading from './Components/loadingComponent/Loading'
import {Route,BrowserRouter,Routes} from 'react-router-dom';
import UserPublicRoute from './authRoutes/UserPublicRoute';
import LearnPrivateRoute from './authRoutes/LearnPrivateRoute';
import LeadPrivateRoute from './authRoutes/LeadPrivateRoute';
import SuperAdminPrivateRoute from './authRoutes/SuperAdminPrivateRoute';
const LoadingLandingPage = lazy(() => import('./pages/LandingPage/LandingPage'));
const LoadingLearnHomePage = lazy(() => import('./pages/LearnHomePage/LearnHomePage'));
const LoadingLeadHomePage = lazy(() => import('./pages/LeadHomePage/LeadHomePage'));
const LoadingSuperAdminHomePage = lazy(() => import('./pages/SuperAdminHomePage/SuperAdminHomePage'));


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route  path='/' element={<UserPublicRoute><Suspense fallback={<Loading/>}>
            <LoadingLandingPage />
          </Suspense></UserPublicRoute>} />

          <Route path='/learn' element={<LearnPrivateRoute><Suspense fallback={<Loading/>}>
          <LoadingLearnHomePage/>
          </Suspense></LearnPrivateRoute>} />

          <Route path='/lead' element={<LeadPrivateRoute><Suspense fallback={<Loading/>}>
          <LoadingLeadHomePage/>
          </Suspense></LeadPrivateRoute>} />

          <Route path='/Sadmin' element={<SuperAdminPrivateRoute><Suspense fallback={<Loading/>}>
          <LoadingSuperAdminHomePage/>
          </Suspense></SuperAdminPrivateRoute>} />
            
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App;
