import React, { useEffect, useState } from 'react';
import axiosInstanceTutor from '../../../tutor/interceptor/axiosInstanceTutor';
import axiosInstanceStudent from '../../../student/interceptor/axiosInstance.Student';
import { Link, useParams } from 'react-router-dom';
import { ICourse } from '../../../interface/ICourse/Icourse';
import PublicMethods from '../../../Methods/PublicMethods';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../redux/store';
import UploadvideoModal from '../../../tutor/components/video/uploadvideoModal';
import Uploadvideoform from '../../../tutor/components/video/uploadvideoform';
import { IVideo } from '../../../interface/IVideo/IVideo';

function CourseDetailPage() {
  const { CourseId } = useParams();
  const [course, setCourse] = useState<ICourse | null>(null);
  const publicmethods = new PublicMethods();
  const [showMore, setShowMore] = useState(false);
  const [isAddVideoModalOpen, setAddVideoModal] = useState(false);
  const data = useSelector((state: RootStateType) => state.user);
  const { _id } = data;
  const [isPublisher, setPublisher] = useState(true);
  const [videos, setVideos] = useState<IVideo[]>([]); // State to store video data

  function handleAddVideoButton() {
    setAddVideoModal(!isAddVideoModalOpen);
  }

  useEffect(() => {
    (async function getCourseDetail() {
      try {
        let response;
        if (localStorage.getItem('jwt-lead')) {
          response = await axiosInstanceTutor.get('/getCourseDetail', {
            params: {
              CourseId: CourseId,
            },
          });

         
        } else if (localStorage.getItem('jwt-learn')) {
          response = await axiosInstanceStudent.get('/getCourseDetail', {
            params: { CourseId: CourseId },
          });
        }
        setCourse(response.data.CourseData);
        setVideos(response.data.CourseData.videos || []); // Set videos or an empty array if undefined
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    })();
  }, [CourseId]);

  useEffect(() => {
    // Check if _id and publisherId._id are the same
    if (  course && _id === course.publisherId._id) {
      // If they are the same, display the "Add Video" button
      setPublisher(true);
    } else {
      // If they are different or if data or course is not available, display the "Subscribe Now" button
      setPublisher(false);
    }
  }, [ course, _id]);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const renderDescription = () => {
    const descriptionLines = course?.Descripton.split('\n');
    if (showMore || !descriptionLines) {
      return course?.Descripton;
    } else if (descriptionLines.length > 6) {
      return (
        <>
          {descriptionLines.slice(0, 4).join('\n')}
          {descriptionLines.length > 4 && (
            <>
              <span>...</span>
              <span className="text-blue-500 cursor-pointer" onClick={toggleShowMore}>
                Show More
              </span>
            </>
          )}
        </>
      );
    } else {
      return course?.Descripton;
    }
  };

  return (
    <div className="ml-10 mr-10">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-6 flex justify-start items-center relative">
          <div>
            <h1 className="text-6xl font-bold mb-2">{course?.Title}</h1>
            {course && (
              <p className="text-gray-500 text-2xl">
                from{' '}
                <span className="text-blue-500">
                  {isPublisher ? 'Yourself' : publicmethods.properCase(course.publisherId.name)}
                </span>
              </p>
            )}
            {/* Conditional rendering of the button */}
            {isPublisher ? (
              <button
                className="absolute bottom-4 right-4 px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 font-bold"
                onClick={() => handleAddVideoButton()}
              >
                Add Video
              </button>
            ) : (
              <button className="absolute bottom-4 right-4 px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 font-bold">
                Subscribe Now
              </button>
            )}
          </div>
        </div>
        <div className="md:w-1/2">
          <img src={course?.CoverImage} alt="Course Cover" className="w-full h-auto" />
        </div>
      </div>

      <div className="mt-8 flex">
        {/* Description */}
        <div style={{ flex: '1' }}>
          <h2 className="text-3xl font-semibold mb-4">Description</h2>
          <div className="text-gray-700">{renderDescription()}</div>
        </div>

        {/* Publisher Details */}
        {isPublisher && (
          <div style={{ flex: '0.5' }}>
            <div className="border hover:scale-105 transition-transform duration-300 m-5 border border-gray-200 rounded-md ">
              <div className="flex flex-col items-center pt-4">
                {/* Add avatar here */}
                <img
                  src={course?.publisherId.avatarUrl}
                  alt="Publisher Avatar"
                  className="w-12 h-12 rounded-full mb-2"
                />
                <div>
                  {/* Add publisher name here */}
                  {course?.publisherId.name ? (
                    <p className="text-lg font-semibold">
                      {publicmethods.properCase(course?.publisherId.name)}
                    </p>
                  ) : null}
                </div>
              </div>
              {/* Add additional content here with a fixed height */}
              <div style={{ height: '200px' }}>
                {/* Your additional content */}
                <p className="text-gray-500 text-center">{course?.publisherId.about}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        {/* Tutorials */}
        <div className="w-full">
          <h2 className="text-3xl font-semibold mb-4">Tutorials</h2>
          {/* List videos with titles and styling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {videos.map((video, index) => (
              <Link to={`/lead/tutorial/${video._id}/${course?._id}`}>
              <div key={index} className="border p-2 border-gray-200 rounded-md hover:scale-105 transition-transform duration-300 cursor-pointer ">
                <img src={video.ThumbnailURL} alt={`Video Thumbnail ${index}`} className="w-full h-auto" />
                <p className="text-lg font-semibold mt-2">{publicmethods.properCase(video.Title)}</p>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Upload video modal */}
      <UploadvideoModal CloseModal={handleAddVideoButton} data="Add Video" isOpen={isAddVideoModalOpen}>
        <Uploadvideoform courseId={CourseId ? CourseId : ''} videos={videos} handlecloseModal={handleAddVideoButton} />
      </UploadvideoModal>
    </div>
  );
}

export default CourseDetailPage;
