import WelcomeLayout from "../common/layouts/WelcomeLayout";
import  {lazy, Suspense} from 'react';
import { Route, Routes } from "react-router-dom";
import UserPublicRoute from "../authRoutes/UserPublicRoute";
import Loading from "../common/Components/loadingComponent/Loading";



const CourseDetailPage = lazy(() => import('../common/pages/CourseDetailPage/CourseDetailPage'));
const LoadingLandingPage = lazy(() => import('../common/pages/LandingPage/LandingPage'));
const LoadingEducatorWelcomePage =lazy(()=>import('../common/pages/EducatorWelcomePage/EducatorWelcomePage'))
function WelcomeRoutes() {
  return (
      <>
      <WelcomeLayout>
        <Routes>
          
                  
          <Route path='/' element={<UserPublicRoute><Suspense fallback={<Loading />}>
            
            <LoadingLandingPage />

          </Suspense>
            
          </UserPublicRoute>} />


          <Route path='/welcome/educator' element={<UserPublicRoute>
            
            <Suspense fallback={<Loading />}>

              <LoadingEducatorWelcomePage />
              
            </Suspense>

          </UserPublicRoute>} />

          
          <Route path='/course/:CourseId' element={<UserPublicRoute>

            <Suspense fallback={<Loading />}>
              
              <CourseDetailPage />
            
            </Suspense>

          </UserPublicRoute>} />

        
        </Routes>
      </WelcomeLayout>
      
    </>
  );
}

export default WelcomeRoutes;
