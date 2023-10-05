import  { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import LearnPrivateRoute from '../authRoutes/LearnPrivateRoute';
import Loading from '../common/Components/loadingComponent/Loading';
import TutorDetailPage from '../student/pages/TutorDetailPage/TutorDetailPage';
import MessagingUI from '../student/pages/MessagingUI/MessagingUI';
import Layout from '../common/layouts/Layout'; // Import the Layout component
import ShowAllPosts from '../common/pages/ShowAllPost/ShowAllPosts';
import Connections from '../common/pages/Connections/Connections';
import JitsiMeet from '../util/JitsiMeet';
import CourseDetailPage from '../common/pages/CourseDetailPage/CourseDetailPage';
import VideoPlayerPage from '../common/pages/VideoPlayerPage/VideoPlayerPage';

const LoadingLearnHomePage = lazy(() => import('../student/pages/StudentHomePage/LearnHomePage'));
const LoadingProfilePage = lazy(() => import('../common/pages/Profile/Profile'));

function Studentroutes() {
  return (
    <Layout>
      
      <Routes>
        <Route
          path="/"
          element={
            <LearnPrivateRoute>
              <Suspense fallback={<Loading />}>
                <LoadingLearnHomePage />
              </Suspense>
            </LearnPrivateRoute>
          }
        />
        <Route path="/user/:userId" element={<TutorDetailPage />} />
        <Route
          path="/profile"
          element={
            <LearnPrivateRoute>
              <Suspense fallback={<Loading />}>
                <LoadingProfilePage />
              </Suspense>
            </LearnPrivateRoute>
          }
        />
        <Route path="/message" element={<MessagingUI />} />
        <Route path='/ShowAllPosts' element={<ShowAllPosts />} />
        <Route path='/Connections' element={<Connections />} />
        <Route path='/Meet/:MeetId/:Token' element={<JitsiMeet />} />
        <Route path='/course/:CourseId' element={<LearnPrivateRoute>
          <CourseDetailPage />
        </LearnPrivateRoute>}/>

      <Route
            path="/tutorial/:videoId/:courseId"
            element={<LearnPrivateRoute>
              <VideoPlayerPage />
              </LearnPrivateRoute>}
          />
          </Routes>
    </Layout>
  );
}

export default Studentroutes;
