import { Book } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import AddCourseModal from "../../components/course/addCourseModal";
import AddCourseForm from "../../components/course/addCourseForm";
import UploadvideoModal from "../../components/video/uploadvideoModal";
import Uploadvideoform from "../../components/video/uploadvideoform";
import { axiosInstance } from "../../../common/interceptor/axiosInstance";
import PublicMethods from "../../../Methods/PublicMethods";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../redux/store";
import { ICourse } from "../../../interface/ICourse/Icourse";
import { Link } from "react-router-dom";
import { IgetTutorCourses } from "../../../interface/ICourse/IgetTutorCourses";

function LeadCoursePage() {
  const [addCoursestate, setaddCourseState] = useState(false);
  const [newVideoModal, SetnewvideoModal] = useState(false);
  const publicmethod = new PublicMethods();
  const [CourseId, SetCourseID] = useState("");
  const [courses, setCourses] = useState<ICourse[]>([]);

  const data = useSelector((state: RootStateType) => state.user);
  const { _id } = data;
  function handleNewCourseButton() {
    setaddCourseState(!addCoursestate);
  }

  function handleaddvideomodal() {
    SetnewvideoModal(!newVideoModal);
  }

  function handlesetCourseId(courseId: string) {
    SetCourseID(courseId);
  }

  useEffect(() => {
    void(async function getTutorCourses() {
      const response:{data:IgetTutorCourses} = await axiosInstance.get("/gettutorcourses", {
        params: {
          tutorId: _id,
        },
      })

      setCourses(response.data.Corusedata);
    })();
  }, [_id]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow bg-white-100">
          <div className="container mx-auto py-8">
            <div className="w-full md:w-4/4 mb-4 md:mb-0">
              <div
                className="bg-white p-4 rounded-lg shadow-md"
                style={{ minHeight: "100vh" }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex h-full">
                    <AddCourseModal
                      key={_id}
                      CloseModal={handleNewCourseButton}
                      data="Add Course"
                      isOpen={addCoursestate}
                    >
                      <AddCourseForm
                        key={_id}
                        CloseModal={handleNewCourseButton}
                        handleaddvideomodal={handleaddvideomodal}
                        handlesetCourseId={handlesetCourseId}
                        courses={courses}
                      />
                    </AddCourseModal>

                    <UploadvideoModal
                      CloseModal={handleaddvideomodal}
                      data="Add Video"
                      isOpen={newVideoModal}
                    key={CourseId}>
                      <Uploadvideoform courseId={CourseId} key={CourseId} handlecloseModal={handleaddvideomodal}/>
                    </UploadvideoModal>
                  </div>

                  {/* "New" button */}
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
                    startIcon={<Book className="text-white" />}
                    onClick={handleNewCourseButton}
                  >
                    New
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12 mt-4">
                  {courses.map((course: ICourse) => (
                    <Link to={`${course._id}`} key={course._id}>
                    <div
                      key={course._id}
                      className="relative bg-white-100  h-[350px] p-4 rounded-lg shadow-lg overflow-hidden group hover:scale-105 transition-transform duration-300 cursor-pointer "
                      style={{ width: "300px" }}
                      >
                      <div
                        style={{
                          paddingBottom: "56.25%",
                          position: "relative",
                        }}
                      >
                        <img
                          src={course.CoverImage}
                          alt={`Cover for ${course.Title}`}
                          className="absolute w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <h2 className="text-xl font-semibold mb-2 mt-2">
                        {publicmethod.properCase(publicmethod.truncateText(course.Title,30))}
                      </h2>
                      <p className="text-gray-800">
                        {publicmethod.truncateText(course.Descripton,100)}
                      </p>
                    </div>
                          </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default LeadCoursePage;
