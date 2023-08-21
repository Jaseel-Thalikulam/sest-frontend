import React from 'react';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import LearnPrivateRoute from '../authRoutes/LearnPrivateRoute';
import Loading from '../common/Components/loadingComponent/Loading';
import TutorDetailPage from '../student/pages/TutorDetailPage/TutorDetailPage';
import MessagingUI from '../student/pages/MessagingUI/MessagingUI';
import Layout from '../student/layouts/layout'; // Import the Layout component

const LoadingLearnHomePage = lazy(() => import('../student/pages/StudentHomePage/LearnHomePage'));
const LoadingProfilePage = lazy(() => import('../common/pages/Profile/Profile'));

function Studentroutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LearnPrivateRoute>
            <Layout>
              <Suspense fallback={<Loading />}>
                <LoadingLearnHomePage />
              </Suspense>
            </Layout>
          </LearnPrivateRoute>
        }
      />
      <Route path="/tutor/:tutorId" element={  <Layout>
            <TutorDetailPage />
          </Layout>} />
      <Route
        path="/profile"
        element={
          <LearnPrivateRoute>
            <Layout>
              <Suspense fallback={<Loading />}>
                <LoadingProfilePage />
              </Suspense>
            </Layout>
          </LearnPrivateRoute>
        }
      />
      <Route path="/message" element={  <Layout>
            <MessagingUI />
          </Layout>}  />
    </Routes>
  );
}

export default Studentroutes;
