import React, {lazy, Suspense} from 'react';
import './App.scss';
import Loading from './Components/loadingComponent/Loading'
import {Route,BrowserRouter,Routes} from 'react-router-dom';
import UserPublicRoute from './authRoutes/userPublicRoute';

const LazyLoadingLandingPage = lazy(() => import('./pages/LandingPage/LandingPage'));


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route  path='/' element={<UserPublicRoute><Suspense fallback={<Loading/>}>
            <LazyLoadingLandingPage />
          </Suspense></UserPublicRoute>} />

          <Route path='/lead'  />
          
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App;
