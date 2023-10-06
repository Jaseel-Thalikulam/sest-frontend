import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import LeadPrivateRoute from "../authRoutes/LeadPrivateRoute";
import Loading from "../common/Components/loadingComponent/Loading";
import Layout from "../common/layouts/Layout";



const LeadMessageUI = lazy( () => import("../tutor/pages/LeadMessageUI/LeadMessageUI"));
const TutorDetailPage = lazy( () => import("../student/pages/TutorDetailPage/TutorDetailPage"));
const ShowAllPosts = lazy( () => import("../common/pages/ShowAllPost/ShowAllPosts"));
const Connections = lazy( () => import("../common/pages/Connections/Connections"));
const JitsiMeet = lazy( () => import("../util/JitsiMeet"));
const LeadCoursePage = lazy( () => import("../tutor/pages/LeadCoursePage/LeadCoursePage"));
const CourseDetailPage = lazy( () => import("../common/pages/CourseDetailPage/CourseDetailPage"));
const VideoPlayerPage = lazy( () => import("../common/pages/VideoPlayerPage/VideoPlayerPage"));
const LoadingTutorProfilePage = lazy( () => import("../common/pages/Profile/Profile"));
const LoadingLeadHomePage = lazy( () => import("../tutor/pages/LeadHomePage/LeadHomePage"));

function TutorRoutes() {
  return (
    <>
      <Layout>
        <Routes>

          <Route path="/" element={<LeadPrivateRoute>

            <Suspense fallback={<Loading />}>
              
              <LoadingLeadHomePage />
              
            </Suspense>
            
          </LeadPrivateRoute>}/>

          <Route path="/profile" element={<LeadPrivateRoute>

            <Suspense fallback={<Loading />}>
              
              <LoadingTutorProfilePage />
              
            </Suspense>
            
          </LeadPrivateRoute>} />
          
          
          <Route path="/message" element={<LeadPrivateRoute>

            <Suspense fallback={<Loading />}>
                                
              <LeadMessageUI />
              
            </Suspense>

          </LeadPrivateRoute>} />


          <Route path="/user/:userId" element={<LeadPrivateRoute>

            <Suspense fallback={<Loading />}>
              
              <TutorDetailPage />
              
            </Suspense>

          </LeadPrivateRoute>} />
          

          <Route path="/tutorial/:videoId/:courseId" element={<LeadPrivateRoute>

            <Suspense fallback={<Loading />}>
              
              <VideoPlayerPage />
              
            </Suspense>
            
          </LeadPrivateRoute>} />
          
          
          <Route path="/ShowAllPosts" element={<LeadPrivateRoute>

            <Suspense fallback={<Loading />}>
                
              <ShowAllPosts />
                
            </Suspense>
            
            </LeadPrivateRoute>} />


          <Route path='/Connections' element={<LeadPrivateRoute>

            <Suspense fallback={<Loading />}>

              <Connections />
          
            </Suspense>

          </LeadPrivateRoute>} />


          <Route path='/Meet/:MeetId/:Token' element={<LeadPrivateRoute>

            <Suspense fallback={<Loading />}>

            <JitsiMeet />
          
            </Suspense>

          </LeadPrivateRoute>} />
          

          <Route path='/course/:CourseId' element={<LeadPrivateRoute>

            <Suspense fallback={<Loading />}>

            <CourseDetailPage />
            
            </Suspense>

          </LeadPrivateRoute>} />
          

          <Route path='/course' element={<LeadPrivateRoute>

            <Suspense fallback={<Loading />}>

            <LeadCoursePage />
          
            </Suspense>

          </LeadPrivateRoute>} />

          
        </Routes>
      </Layout>
    </>
  );
}

export default TutorRoutes;
