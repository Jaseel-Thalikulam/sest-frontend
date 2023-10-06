

import { Suspense, lazy } from 'react';
import Layout from '../common/layouts/Layout'; // Import the Layout component
import { Route, Routes } from 'react-router-dom';
import LearnPrivateRoute from '../authRoutes/LearnPrivateRoute';
import Loading from '../common/Components/loadingComponent/Loading';



const JitsiMeet = lazy(() => import('../util/JitsiMeet'));
const LoadingProfilePage = lazy(() => import('../common/pages/Profile/Profile'));
const Connections = lazy(() => import('../common/pages/Connections/Connections'));
const MessagingUI = lazy(() => import('../student/pages/MessagingUI/MessagingUI'));
const ShowAllPosts = lazy(() => import('../common/pages/ShowAllPost/ShowAllPosts'));
const VideoPlayerPage = lazy(() => import('../common/pages/VideoPlayerPage/VideoPlayerPage'));
const TutorDetailPage = lazy(() => import('../student/pages/TutorDetailPage/TutorDetailPage'));
const CourseDetailPage = lazy(() => import('../common/pages/CourseDetailPage/CourseDetailPage'));
const LoadingLearnHomePage = lazy(() => import('../student/pages/StudentHomePage/LearnHomePage'));

function Studentroutes() {
  return (
    <Layout>
      <Routes>
        
        
        <Route path="/" element={<LearnPrivateRoute>

          <Suspense fallback={<Loading />}>
            
            <LoadingLearnHomePage />
            
          </Suspense>
          
        </LearnPrivateRoute>} />


        <Route path="/user/:userId" element={<LearnPrivateRoute>

          <Suspense fallback={<Loading />}>
              
            <TutorDetailPage />
            
          </Suspense>
          
        </LearnPrivateRoute>}/>
        
        
        <Route path="/tutorial/:videoId/:courseId" element={<LearnPrivateRoute>
          
          <Suspense fallback={<Loading />}>
            
            <VideoPlayerPage />
            
          </Suspense>
          
        </LearnPrivateRoute>} />
        
        
        <Route path="/profile" element={<LearnPrivateRoute>

          <Suspense fallback={<Loading />}>
            
            <LoadingProfilePage />
            
          </Suspense>
          
        </LearnPrivateRoute> } />


        <Route path="/message" element={<LearnPrivateRoute>

          <Suspense fallback={<Loading />}>
              
            <MessagingUI />
            
          </Suspense>
          
        </LearnPrivateRoute> } />

        
        <Route path='/course/:CourseId' element={<LearnPrivateRoute>

          <Suspense fallback={<Loading />}>
            
          <CourseDetailPage />

          </Suspense>

        </LearnPrivateRoute>} />
        

        <Route path='/ShowAllPosts' element={<LearnPrivateRoute>

          <Suspense fallback={<Loading />}>
            
            <ShowAllPosts />
            
          </Suspense>
          
        </LearnPrivateRoute>} />
        

        <Route path='/Connections' element={<LearnPrivateRoute>

          <Suspense fallback={<Loading />}>
            
            <Connections />
       
          </Suspense>
          
        </LearnPrivateRoute>} />


        <Route path='/Meet/:MeetId/:Token' element={<LearnPrivateRoute>

          <Suspense fallback={<Loading />}>
            
            <JitsiMeet />

            </Suspense>
        
        </LearnPrivateRoute>} />
        

          </Routes>
    </Layout>
  );
}

export default Studentroutes;
