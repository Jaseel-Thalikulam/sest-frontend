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
            element={<TutorDetailPage />}
          />

          <Route
            path="/ShowAllPosts"
            element={<ShowAllPosts />}
          />
          <Route path='/Connections' element={<Connections />} />
        </Routes>
      </Layout>
    </>
  );
}

export default TutorRoutes;
