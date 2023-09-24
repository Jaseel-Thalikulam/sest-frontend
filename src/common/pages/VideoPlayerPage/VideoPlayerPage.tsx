import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IVideo } from '../../../interface/IVideo/IVideo';
import {axiosInstance} from '../../interceptor/axiosInstance';
import VideoPlayer from '../../Components/videoPlayer/VideoPlayer';

import { ICourse } from '../../../interface/ICourse/Icourse';
import { ICourseAPI } from '../../../interface/ICourse/ICourseAPI';
import { IVideoAPI } from '../../../interface/ICourse/IVideoAPI';
function VideoPlayerPage() {
  const { videoId, courseId } = useParams();
  const [video, setVideo] = useState<IVideo | null>(null);
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [courseTitle, setCourseTitle] = useState<string | null>(null);

  useEffect(() => {
    // Fetch video data
    void(async function getVideoData() {

        try {
          const response :{data:IVideoAPI}= await axiosInstance.get('/getvideoData', {
            params: {
              videoId: videoId,
            },
          });

          if (response.data.success) {
            setVideo(response.data.videoData);
          }
        } catch (error) {
          console.error(error);
        }
      
    })()

    
  }, [videoId]);

  useEffect(() => {
    // Fetch course details and videos
 void(   async function getCourseDetail() {
      try {
      
       
        const response:{data:ICourseAPI} = await axiosInstance.get('/getCourseDetail', {
            params: { CourseId: courseId },
          });
        
        const courseData: ICourse = response.data.CourseData;
        setVideos(courseData.videos || []);
        setCourseTitle(courseData.Title || null);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    })()

  }, [courseId]);


  

  return (
    <div className='ml-10 mr-10 mt-5'>
      <div style={{ display: 'flex' }}>
        {/* Use the VideoPlayer component */}
        <VideoPlayer video={video} />

        <div style={{ width: '35%', overflowY: 'auto', height: '70vh', marginLeft: '20px' }} className='border border-gray-200 rounded-md'>
        
          {courseTitle && (
            <h2 className='text-2xl font-bold mt-3 ml-3 mb-3'>{courseTitle}</h2>
          )}

          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {videos.map((videoItem) => (
              <li
                key={videoItem._id}
                style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', padding: '10px', position: 'relative' }}
                className='hover:bg-gray-100 cursor-pointer rounded-md'
                
              >
                <img src={videoItem.ThumbnailURL} alt={videoItem.Title} style={{ width: '120px', height: 'auto', marginRight: '10px' }} className='rounded' />
                <p>{videoItem.Title}</p>
                {videoItem._id === video?._id && (
                  <div style={{ position: 'absolute', bottom: '5px', right: '5px', display: 'flex', alignItems: 'center', padding: '5px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-300">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                    <p style={{ marginLeft: '5px' }}>Playing</p>
                  </div>
                )} 
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayerPage;





