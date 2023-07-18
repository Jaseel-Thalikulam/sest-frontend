import React, {lazy, Suspense} from 'react';
import './App.scss';
import Loading from './Components/loadingComponent/Loading'
import {Route,BrowserRouter,Routes} from 'react-router-dom';
import UserPublicRoute from './authRoutes/UserPublicRoute';
import LearnPrivateRoute from './authRoutes/LearnPrivateRoute';
const LazyLoadingLandingPage = lazy(() => import('./pages/LandingPage/LandingPage'));
const LazyLoadingLeadHomePage = lazy(() => import('./pages/LearnHomePage/LearnHomePage'));


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route  path='/' element={<UserPublicRoute><Suspense fallback={<Loading/>}>
            <LazyLoadingLandingPage />
          </Suspense></UserPublicRoute>} />

          <Route path='/learn' element={<LearnPrivateRoute><Suspense fallback={<Loading/>}>
          <LazyLoadingLeadHomePage/>
          </Suspense></LearnPrivateRoute>} />
            
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App;
