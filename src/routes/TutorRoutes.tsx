import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import LeadPrivateRoute from "../authRoutes/LeadPrivateRoute";
import Loading from "../common/Components/loadingComponent/Loading";
const LoadingLeadHomePage = lazy(
  () => import("../tutor/pages/LeadHomePage/LeadHomePage")
);
const LoadingTutorProfilePage = lazy(
  () => import("../common/pages/Profile/Profile")
);
import Layout from "../common/layouts/Layout";
import LeadMessageUI from "../tutor/pages/LeadMessageUI/LeadMessageUI";
import TutorDetailPage from "../student/pages/TutorDetailPage/TutorDetailPage";
import ShowAllPosts from "../common/pages/ShowAllPost/ShowAllPosts";
import Connections from "../common/pages/Connections/Connections";
import JitsiMeet from "../util/JitsiMeet";
import CourseDetailPage from "../common/pages/CourseDetailPage/CourseDetailPage";
import LeadCoursePage from "../tutor/pages/LeadCoursePage/LeadCoursePage";
import VideoPlayerPage from "../common/pages/VideoPlayerPage/VideoPlayerPage";

function TutorRoutes() {
  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <LeadPrivateRoute>
                <Suspense fallback={<Loading />}>
                  <LoadingLeadHomePage />
                </Suspense>
              </LeadPrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <LeadPrivateRoute>
                <Suspense fallback={<Loading />}>
                  <LoadingTutorProfilePage />
                </Suspense>
              </LeadPrivateRoute>
            }
          />
          <Route
            path="/message"
            element={
              <LeadPrivateRoute>
                <LeadMessageUI />
              </LeadPrivateRoute>
            }
          />
          <Route
            path="/user/:userId"
            element={<LeadPrivateRoute>
              <TutorDetailPage />
              </LeadPrivateRoute>}
          />
          <Route
            path="/tutorial/:videoId/:courseId"
            element={<LeadPrivateRoute>
              <VideoPlayerPage />
              </LeadPrivateRoute>}
          />

          <Route
            path="/ShowAllPosts"
            element={<LeadPrivateRoute><ShowAllPosts /></LeadPrivateRoute>}
          />
          <Route path='/Connections' element={<LeadPrivateRoute><Connections /></LeadPrivateRoute>} />
        <Route path='/Meet/:MeetId/:Token' element={<LeadPrivateRoute><JitsiMeet /></LeadPrivateRoute>} />
          <Route path='/course/:CourseId' element={<LeadPrivateRoute>
            <CourseDetailPage/>
        </LeadPrivateRoute>} />
        <Route path='/course' element={<LeadPrivateRoute><LeadCoursePage/></LeadPrivateRoute>} />

        </Routes>
      </Layout>
    </>
  );
}

export default TutorRoutes;
