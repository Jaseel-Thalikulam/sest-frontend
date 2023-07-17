import React, {lazy, Suspense} from 'react';
import './App.scss';
import Loading from './Components/loadingComponent/Loading.tsx'
import {Route,BrowserRouter,Routes} from 'react-router-dom';


const LazyLoadingLandingPage = lazy(() => import('./pages/LandingPage/LandingPage'));


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route  path='/welcome' element={<Suspense fallback={<Loading/>}>
            <LazyLoadingLandingPage />
          </Suspense>} />

    </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
