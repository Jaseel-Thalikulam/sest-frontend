import axios from "axios";
import React, { useEffect, useState } from "react";
import { ICourse } from "../../../interface/ICourse/Icourse";
import { IgetTutorCourses } from "../../../interface/ICourse/IgetTutorCourses";
import {
  Typography,
  Button,
  useMediaQuery,
  Divider,
  IconButton,
} from "@mui/material";
import Next from "@mui/icons-material/NavigateNextRounded";
import Previous from "@mui/icons-material/NavigateBeforeRounded";
import PublicMethods from "../../../Methods/PublicMethods";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
const BASE_URL: string = import.meta.env.VITE_BACKEND_BASE_URL as string;

function ShowCaseCourses() {
  const [course, setCourse] = useState<ICourse[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const methods = new PublicMethods();

  // Define responsive card count based on screen size
  const isSmallScreen = useMediaQuery("(max-width: 400px)");
  const cardCount = isSmallScreen ? 1 : window.innerWidth < 1350 ? 3 : 4;

  useEffect(() => {
    async function getShowCaseCourse() {
      try {
        const response: { data: IgetTutorCourses } = await axios.get(
          `${BASE_URL}/getallcourses`
        );
        setCourse(response.data.Corusedata);
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    }

    getShowCaseCourse();
  }, []);

  const nextCourse = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % course.length);
  };

  const prevCourse = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + course.length) % course.length
    );
  };

  // Calculate the range of courses to display (determined by cardCount)
  const startIndex = currentIndex;
  const endIndex = (currentIndex + cardCount - 1) % course.length;
  const coursesToShow =
    endIndex >= startIndex
      ? course.slice(startIndex, endIndex + 1)
      : [...course.slice(startIndex), ...course.slice(0, endIndex + 1)];

  return (
    <>
      <ErrorBoundary>

      <div className="bg-fafa pt-10 pb-20">
      <div className={`lg:ml-32 lg:mr-32 md:ml-10  md:mr-10 ${isSmallScreen ? 'mt-2' : 'mt-10 mb-10'}`}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              mb: 2,
              ml: 6,
              fontSize: "2rem",
              fontWeight: "bold",
              lineHeight: "none",
              color: "#12222E",
              maxWidth: "100%",
            }}
          >
           Editor's Choice
          </Typography>
          <div
            className={`flex  items-center mt-10 flex-wrap flex-row  gap-10 justify-center`}
            >
            {coursesToShow.map((courseItem, index) => (
              <div
              key={index}
                className={`h-80 w-56 rounded-t-md shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-700 bg-white relative ${
                  isSmallScreen ? "mb-4" : "" // Adjust margin for small screens
                }`}
                style={{
                  flex: `0 0 ${
                    isSmallScreen ? "100%" : `calc(23% - 10px)` // Adjust width for small screens
                  }`,
                  position: "relative",
                }}
              >
                {index === 0 && (
                  <IconButton
                    onClick={prevCourse}
                    className="bg-white hover:bg-8A3FFC hover:text-white"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%) translateX(-50%)",
                      padding: "10px",
                    }}
                    >
                    <Previous />
                  </IconButton>
                )}
                <div className="h-1/2">
                  <img
                    src={courseItem.CoverImage}
                    alt={courseItem.Title}
                    className="w-full h-full object-cover rounded-t-md"
                  />
                </div>
                <div style={{ position: "absolute", top: "55%", right: 5 }}>
                  <Typography
                    className="mr-1"
                    variant="body2"
                    sx={{
                      fontSize: ["0.8vw", "0.8rem"],
                      color: "#12222E",
                      fontWeight: "normal",
                      
                    }}
                  >
                    {courseItem.videos.length>0?`${courseItem.videos.length} Modules`:null}
                  </Typography>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "65%",
                    width: "100%",
                    textAlign: "left",
                    paddingLeft: 10,
                  }}
                >

                  <h1             className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-md text-555 font-medium " >
                  {methods.truncateText(courseItem.Title, 60)}
                  </h1>
                  
                </div>
                <Button
                  variant="text"
                  sx={{
                    position: "absolute",
                    bottom: 5,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                    color: "#12222E",
                    borderTop: "0.5px solid #d3d3d3",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                    textTransform: "none",
                  }}
                >
                  Go to Course Page
                </Button>
                {index === coursesToShow.length - 1 && (
                  <IconButton
                    onClick={nextCourse}
                    className="bg-white hover:bg-8A3FFC hover:text-white"
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%) translateX(50%)",
                      padding: "10px",
                    }}
                  >
                    <Next />
                  </IconButton>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
                    </ErrorBoundary>
    </>
  );
}

export default ShowCaseCourses;
