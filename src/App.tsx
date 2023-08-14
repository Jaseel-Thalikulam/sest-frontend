import React, {lazy, Suspense} from 'react';
import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Loading from './common/Components/loadingComponent/Loading';
import {Route,BrowserRouter,Routes} from 'react-router-dom';
import UserPublicRoute from './authRoutes/UserPublicRoute';
const LoadingLandingPage = lazy(() => import('./common/pages/LandingPage/LandingPage'));
import TutorRoutes from './routes/TutorRoutes';
import Studentroutes from './routes/StudentRoutes';
import Adminroutes from './routes/AdminRoutes';
import SuperAdminRoutes from './routes/SuperAdminRoutes';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route  path='/' element={<UserPublicRoute><Suspense fallback={<Loading/>}>
            <LoadingLandingPage />
          </Suspense></UserPublicRoute>} />

          <Route path='/learn/*' element={<Studentroutes/>} />

          <Route path='/lead/*' element={<TutorRoutes/>} />

          <Route path='/admin/*' element={<Adminroutes/>} />

          <Route path='/Sadmin/*' element={<SuperAdminRoutes/>} />
            
         
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App;
