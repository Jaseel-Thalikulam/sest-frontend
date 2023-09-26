import React, { lazy, Suspense } from 'react';
import './App.scss';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Loading from './common/Components/loadingComponent/Loading';
import { Route, BrowserRouter, Routes } from 'react-router-dom'; // Import Routes from 'react-router-dom'
import UserPublicRoute from './authRoutes/UserPublicRoute';
const LoadingLandingPage = lazy(() => import('./common/pages/LandingPage/LandingPage'));

const LoadingEducatorWelcomePage = lazy(() => import('./common/pages/EducatorWelcomePage/EducatorWelcomePage'));
import TutorRoutes from './routes/TutorRoutes';
import Studentroutes from './routes/StudentRoutes';
import Adminroutes from './routes/AdminRoutes';
import SuperAdminRoutes from './routes/SuperAdminRoutes';
import { ThemeProvider } from '@mui/material';
import { Muitheme } from './mui/muiThemeCreator';
import WelcomeLayout from './common/layouts/WelcomeLayout';
import WelcomeRoutes from './routes/WelcomeRoutes';

function App() {
  return (
    <>
      <ThemeProvider theme={Muitheme}>
        <BrowserRouter>
          <Routes>
          
            <Route path='/*' element={<WelcomeRoutes />} />
            <Route path='/learn/*' element={<Studentroutes />} />
            <Route path='/lead/*' element={<TutorRoutes />} />
            <Route path='/admin/*' element={<Adminroutes />} />
            <Route path='/Sadmin/*' element={<SuperAdminRoutes />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App;
