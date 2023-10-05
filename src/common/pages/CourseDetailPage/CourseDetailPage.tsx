import { useEffect, useState } from 'react';
import {axiosInstance} from '../../interceptor/axiosInstance';
import'./CourseDetailpage.scss'
import { Link, useParams } from 'react-router-dom';
import { ICourse } from '../../../interface/ICourse/Icourse';
import PublicMethods from '../../../Methods/PublicMethods';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../redux/store';
import UploadvideoModal from '../../../tutor/components/video/uploadvideoModal';
import Uploadvideoform from '../../../tutor/components/video/uploadvideoform';
import { IVideo } from '../../../interface/IVideo/IVideo';
import Subscribemodal from '../../Components/subscribemodal/Subscribemodal';
import { Typography } from '@mui/material';
import { Elements } from "@stripe/react-stripe-js";
import StripPayment from '../../Components/stripePayment/StripPayement';
import { loadStripe } from "@stripe/stripe-js";
import StripPaymentModal from '../../Components/stripePayment/StripPaymentModal';
import { ICourseAPI } from '../../../interface/ICourse/ICourseAPI';
import { ISubscriptionDetail } from '../../../interface/ISubscription/ISubscriptionDetail';
const PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string;
const stripePromise = loadStripe(PUBLISHABLE_KEY);
function CourseDetailPage() {
  const { CourseId } = useParams();
  const [course, setCourse] = useState<ICourse | null>(null);
  const publicmethods = new PublicMethods();
  const [showMore, setShowMore] = useState(false);
  const [isAddVideoModalOpen, setAddVideoModal] = useState(false);
  const data = useSelector((state: RootStateType) => state.user);
  const { _id } = data;
  const [isPublisher, setPublisher] = useState(false);
  const [isSubscribed, setSubscribed] = useState(false);
  const [isPleaseSubscribemodalopen, setPleaseSubscribemodal] = useState(false);
  const [videos, setVideos] = useState<IVideo[]>([]); // State to store video data
  const [isStripOpen, setStripeModal] = useState(false);
  const [amount, setSelectedAmount] = useState(0);
const [PublisherId,setPublisherId]=useState('')
const [PublisherName,setPublisherName]=useState('')

   function handlestripModal(amount:number) {
    setPleaseSubscribemodal(false);
    setSelectedAmount(amount)
    setStripeModal(!isStripOpen);

  }

  function handlesetSubscribed() {
    setSubscribed(!isSubscribed)
  }
  function handleAddVideoButton() {
    setAddVideoModal(!isAddVideoModalOpen);
  }
  function handleSubscriptionModal() {
    setPleaseSubscribemodal(!isPleaseSubscribemodalopen);
  }

  useEffect(() => {
  void(async function getCourseDetail() {
      try {
     
         const response:{data:ICourseAPI} = await axiosInstance.get('/getCourseDetail', {
            params: { CourseId: CourseId },
          });
        
        setCourse(response.data.CourseData);
        setPublisherId(response?.data.CourseData.publisherId._id)
        setPublisherName(response?.data.CourseData.publisherId.name)
        setVideos(response.data.CourseData.videos || []); 
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    })();
  }, [CourseId]);

  useEffect(() => {
    void(async function FetchTutorSubscriptionDetail() {
    
      if (  course && _id === course.publisherId._id) {
        
        setPublisher(true);
      } else {
        setPublisher(false);
        if (course?.publisherId._id) {
          
          const subscriptionresponse :{data:ISubscriptionDetail}=  await axiosInstance.get('/getSubscriptionDetails', {
            params: {
              TutorId: course.publisherId._id,
              StudentId:_id
            }
          })
          
          
          
          setSubscribed(subscriptionresponse.data.success)
        }
        
      }
    })()
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
            {!isPublisher && !isSubscribed ? (
  <button className="absolute bottom-4 right-4 px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 font-bold" onClick={handleSubscriptionModal}>
    Subscribe Now
  </button>
) : isPublisher ? (
  <button
    className="absolute bottom-4 right-4 px-4 py-2 bg-violet-500 text-white rounded hover-bg-violet-600 font-bold"
    onClick={() => handleAddVideoButton()}
  >
    Add Video
  </button>
) : null}


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
        {!isPublisher && (
          <div style={{ flex: '0.5' }}>
            <div className="border hover:scale-105 transition-transform duration-300 m-5  border-gray-200 rounded-md ">
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
    <div
      key={index}
      className="border p-2 border-gray-200 rounded-md hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
     {!isPublisher && !isSubscribed && (
        <div onClick={handleSubscriptionModal}>

          
    <img src={video.ThumbnailURL} alt={`Video Thumbnail ${index}`} className="w-full h-auto" />
    <p className="text-lg font-semibold mt-2">{publicmethods.properCase(video.Title)}</p>
        </div>
  
)}

{isPublisher || isSubscribed ? (
  localStorage.getItem('jwt-lead') ? (
    <Link to={`/lead/tutorial/${video._id}/${course!._id}`}>
      <img src={video.ThumbnailURL} alt={`Video Thumbnail ${index}`} className="w-full h-auto" />
      <p className="text-lg font-semibold mt-2">{publicmethods.properCase(video.Title)}</p>
    </Link>
  ) : localStorage.getItem('jwt-learn') ? (
    <Link to={`/learn/tutorial/${video._id}/${course!._id}`}>
      <img src={video.ThumbnailURL} alt={`Video Thumbnail ${index}`} className="w-full h-auto" />
      <p className="text-lg font-semibold mt-2">{publicmethods.properCase(video.Title)}</p>
    </Link>
  ) : (
    <div>
      {/* Handle the case where neither 'jwt-lead' nor 'jwt-learn' is set */}
      {/* You can add a default behavior or message here */}
    </div>
  )
) : null}

    
      
    </div>
  ))}
</div>

        </div>
      </div>

      {/* Upload video modal */}
      <UploadvideoModal CloseModal={handleAddVideoButton} data="Add Video" isOpen={isAddVideoModalOpen}>
        <Uploadvideoform courseId={CourseId ? CourseId : ''} videos={videos} handlecloseModal={handleAddVideoButton} />
      </UploadvideoModal>
      <Subscribemodal CloseModal={()=>handleSubscriptionModal()} isOpen={isPleaseSubscribemodalopen} data='Select your Plan' >
        <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                    <div
                      onClick={() => handlestripModal(2000)}
                      className="subscription-content animate-fade border-green-500 text-green-500 flex-1 rounded-md p-6  "
                      style={{
                        background: "rgb(0, 185, 123)",
                        position: "relative",
                        color: "#fff",
                      }}
                    >
                      <div className="glass-shimmer">
                        <Typography variant="h6" className="mb-2">
                          Base Subscription Plan
                        </Typography>
                        <Typography variant="h6" className="mb-2 ml-2">
                        {publicmethods.formatRupees(2000)}
                        </Typography>
                        <Typography variant="body2" className="mb-4">
                        Get access to courses of  { publicmethods.properCase(PublisherName)} for 2 Months.
                        </Typography>
                      </div>
                    </div>
                 

                 
                    <div
                      onClick={() => handlestripModal(8000)}
                      className="subscription-content animate-fade border-purple-500 text-purple-500 flex-1 rounded-md p-6"
                      style={{
                        background: "rgb(159, 122, 234)",
                        position: "relative",
                        color: "#fff",
                      }}
                    >
                      <div className="glass-shimmer">
                        <Typography variant="h6" className="mb-2">
                          Standard Subscription Plan
                        </Typography>
                        <Typography variant="h6" className="mb-2 ml-2">
                        {publicmethods.formatRupees(8000)}
                        </Typography>
                        <Typography variant="body2" className="mb-4">
                        Get access to courses of  { publicmethods.properCase(PublisherName)} for 10 Months.
                        </Typography>
                      </div>
                    </div>
                 

                  
                    <div
                      onClick={() => handlestripModal(15000)}
                      className="subscription-content animate-fade border-green-500 text-green-500 flex-1 rounded-md p-6 bg-green-500 text-white"
                      style={{
                        background: "rgb(114, 159, 207)",
                        position: "relative",
                        color: "#fff",
                      }}
                    >
                      <div className="glass-shimmer">
                        <Typography variant="h6" className="mb-2">
                          Premium Subscription Plan
                        </Typography>
                        <Typography variant="h6" className="mb-2 ml-2">
                        {publicmethods.formatRupees(15000)}
                        </Typography>
                        <Typography variant="body2" className="mb-4">
                          Get access to courses of { publicmethods.properCase(PublisherName)} for LifeTime.
                        </Typography>
                      </div>
                    </div>
                 
                </div>
        </>
      </Subscribemodal>
      <StripPaymentModal
        CloseModal={handlestripModal}
        isOpen={isStripOpen}
      >
        <Elements stripe={stripePromise}>
          <StripPayment amount={amount} TutorId={PublisherId} handlesetSubscribed={handlesetSubscribed}/>
        </Elements>
      </StripPaymentModal>

    </div>
  );
}

export default CourseDetailPage;
