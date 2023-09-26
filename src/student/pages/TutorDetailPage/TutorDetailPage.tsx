import { useEffect, useState } from "react";
import "./TutorDetailPage.scss";
import { Link, useParams } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import {axiosInstance} from "../../../common/interceptor/axiosInstance";
import IUserSlice from "../../../interface/Iredux/IuserSlice";
import IFetchTutorResponse from "../../../interface/TutorDetailPage/fetchTutor.Interface";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../redux/store";
import PublicMethods from "../../../Methods/PublicMethods";
import IFollowIndicator from "../../../interface/relationship/IfollowIndicator";
import ICommonAPI from "../../../interface/IcommonAPI/IcommonAPI";
import StripPaymentModal from "../../../common/Components/stripePayment/StripPaymentModal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripPayment from "../../../common/Components/stripePayment/StripPayement";
import { ICourse } from "../../../interface/ICourse/Icourse";
import { ISubscriptionDetail } from "../../../interface/ISubscription/ISubscriptionDetail";
import { IgetTutorCourses } from "../../../interface/ICourse/IgetTutorCourses";
const PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string;
const stripePromise = loadStripe(PUBLISHABLE_KEY);
function TutorDetailPage() {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState<IUserSlice | null>(null);
  const [chatUI, setChatUI] = useState(false);
  const [isSubscribed, setSubscribed] = useState(false);
  const [isSubscriptionOpen, setSubscription] = useState(false);
  const [isStripOpen, setStripeModal] = useState(false);
  const [isFollowing, setfollowindicator] = useState(false);
  const [profileDataId, setprofileDataId] = useState("");
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [amount, setSelectedAmount] = useState(0);
  const data = useSelector((state: RootStateType) => state.user);

  const { _id } = data;

  const publicmethod = new PublicMethods();

   function handlestripModal(amount:number) {
    setSelectedAmount(amount)
    setStripeModal(!isStripOpen);
    
  }
  
  
   function handlesetSubscribed() {
    setSubscribed(true)
    setStripeModal(!isStripOpen);
    
    }


  async function handleFollowButton(followedBy: string, following: string) {
    if (followedBy && following) {
      
        const response: { data: ICommonAPI } = await axiosInstance.post(
          "/follow",
          {
            followedBy,
            following,
          }
        );

        if (response.data.success) {
          setfollowindicator(!isFollowing);
        } 
   
    }
  }

  async function handleChatUI() {

      await axiosInstance.post("/chat/access", {
        senderId: _id,
        receiverId: profileData?._id,
      });

      setChatUI(!chatUI);
    
  }

  function handleSubscription() {
    setSubscription(!isSubscriptionOpen);
  }

  useEffect(() => {
    if (profileDataId) {
      void(async function handlefollowindictaor() {
      
          const response: { data: IFollowIndicator } =
            await axiosInstance.get("/followindicator", {
              params: {
                followedBy: _id,
                following: profileDataId,
              },
            });
          const { isFollowing, success } = response.data;

          if (success) {
            setfollowindicator(isFollowing);
          } 
 
      })();
    }
  }, [profileDataId]);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        
          const response: { data: IFetchTutorResponse } =
            await axiosInstance.post("/userdata", {
              userId,
            });

          const tutordata = response.data.Tutorsdata;

          setProfileData(tutordata);
          setprofileDataId(tutordata._id);


          const subscriptionresponse:{data:ISubscriptionDetail} =  await axiosInstance.get('/getSubscriptionDetails', {
            params: {
              TutorId: tutordata._id,
              StudentId:_id
            }
          })

          setSubscribed(subscriptionresponse.data.success)
          
          const tutorCourses:{data:IgetTutorCourses} = await axiosInstance.get("/gettutorcourses", {
            params: {
              tutorId: tutordata._id,
            },
          });


      setCourses(tutorCourses.data.Corusedata);


   ``
      } catch (error) {
        console.error("Error fetching tutor data:", error);
      }
    };

    fetchTutor().catch((error) => {
      console.error("Error in fetchTutor:", error);
    });
  }, [userId]);




  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-10">
        <div className="flex flex-col lg:flex-row bg-white p-6 rounded-lg">
          {profileData && (
            <div className="lg:w-1/4 border-b lg:border-b-0 lg:border-r border-gray-300 pr-6 pb-6 lg:pb-0">
              <div className="flex flex-col items-center">
                <Avatar
                  alt={profileData.name}
                  src={profileData.avatarUrl}
                  className="w-32 h-32 mb-4"
                />
                {profileData._id != _id ? (
                  <Typography variant="h6" className="mb-2 text-center">
                    {publicmethod.properCase(profileData.name)}
                  </Typography>
                ) : (
                  <Typography variant="h6" className="mb-2 text-center">
                    {publicmethod.properCase(profileData.name)} (Preview)
                  </Typography>
                )}
                {profileData._id != _id ? (
                  <Typography variant="body2" className="text-gray-600 mb-2">
                    @{profileData.username}
                  </Typography>
                ) : (
                  <Typography variant="body2" className="text-gray-600 mb-2">
                    @you
                  </Typography>
                )}

                <div className="flex">
                  {isFollowing ? (
                    <Button
                      onClick={() =>
                        void handleFollowButton(_id, profileData._id)
                      }
                      variant="contained"
                      style={{ backgroundColor: "#6C63FF" }}
                      className="  text-white font-semibold py-2 px-4 rounded-full mr-2"
                    >
                      Following
                    </Button>
                  ) : (
                    <Button
                      onClick={() =>
                        void handleFollowButton(_id, profileData._id)
                      }
                      variant="contained"
                      style={{ backgroundColor: "#6C63FF" }}
                      className=" text-white font-semibold py-2 px-4 rounded-full mr-2"
                    >
                      Follow
                    </Button>
                  )}

                  <Button
                    variant="outlined"
                    className=" border-gray-500 text-gray-500 font-semibold py-2 px-4 rounded-full hover:bg-gray-200"
                    onClick={void handleChatUI}
                  >
                    Contact Me
                  </Button>
                </div>

                <div className="border-t border-gray-300 mt-4 pt-4">
                  {profileData.role === "Lead" ? (
                    <Typography variant="body2" className="text-gray-600">
                      Sest Tutor Since{" "}
                      {publicmethod.formateTimeStamp(profileData.createdAt)}
                    </Typography>
                  ) : (
                    <Typography variant="body2" className="text-gray-600">
                      Sest Student Since{" "}
                      {publicmethod.formateTimeStamp(profileData.createdAt)}
                    </Typography>
                  )}
                </div>

                <div className="border-t border-gray-300 mt-4 pt-4">
                  <Typography variant="h6" className="mb-2">
                    About
                  </Typography>
                  <div className="border-b border-gray-300 pb-4 mb-4">
                    <Typography variant="body1">{profileData.about}</Typography>
                  </div>

                  {profileData.role === "Lead" && (
                    <div>
                      <Typography variant="h6" className="mb-2">
                        Tags
                      </Typography>
                      {profileData.tags && (
                        <Box className="mb-4">
                          {profileData.tags.map((tag, index) => (
                            <Chip
                              key={index}
                              label={tag.Name}
                              variant="outlined"
                              className="mr-2 mb-2"
                            />
                          ))}
                        </Box>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <style>
            {`
              @keyframes shimmer {
                0% {
                  background-position: -100px 0;
                }
                100% {
                  background-position: 100px 0;
                }
              }
            `}
          </style>

          <div className="lg:w-3/4 pl-6">
            {profileData && (
              <>
                {profileData.role == "Lead" && !isSubscribed && (
                  <div className="bg-blue-400 rounded-lg p-4  flex justify-between items-center mb-2">
                    <Typography variant="body2" className="text-white mb-2">
                      Subscribe for Premium content's of{" "}
                      {publicmethod.properCase(profileData.name)}
                    </Typography>
                    <button
                      color="primary"
                      className="border border-2 border-white text-white font-bold rounded-full px-4 py-2 hover:bg-white hover:text-black transition duration-300"
                      onClick={() => {
                        handleSubscription();
                      }}
                    >
                      Subscribe
                    </button>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {isSubscriptionOpen && profileData.role == "Lead" && !isSubscribed &&  (
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
                        {publicmethod.formatRupees(2000)}
                        </Typography>
                        <Typography variant="body2" className="mb-4">
                        Get access to courses of { publicmethod.properCase(profileData.name)} for 2 Months.
                        </Typography>
                      </div>
                    </div>
                  )}

                  {isSubscriptionOpen && profileData.role == "Lead" && !isSubscribed && (
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
                        {publicmethod.formatRupees(8000)}
                        </Typography>
                        <Typography variant="body2" className="mb-4">
                        Get access to courses of { publicmethod.properCase(profileData.name)} for 10 Months.
                        </Typography>
                      </div>
                    </div>
                  )}

                  {isSubscriptionOpen && profileData.role == "Lead"&& !isSubscribed  && (
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
                        {publicmethod.formatRupees(15000)}
                        </Typography>
                        <Typography variant="body2" className="mb-4">
                          Get access to courses of { publicmethod.properCase(profileData.name)} for LifeTime.
                        </Typography>
                      </div>
                    </div>
                  )}
                </div>
                {profileData.role == "Lead" ? (
                  <div>

                  
                  <Typography variant="h6" className="mb-5 mt-5">
                    Courses Released
                    </Typography>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {courses.map((course: ICourse) => (
    <div
      key={course._id}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
    >
      {localStorage.getItem('jwt-learn') ? (
        <Link to={`/learn/course/${course._id}`}>
          <img
            src={course.CoverImage}
            alt={course.Title}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{publicmethod.truncateText(course.Title,30)}</h3>
            {/* Add other course information here */}
          </div>
        </Link>
      ) : localStorage.getItem('jwt-lead') ? (
        <Link to={`/lead/course/${course._id}`}>
          <img
            src={course.CoverImage}
            alt={course.Title}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{course.Title}</h3>
            {/* Add other course information here */}
          </div>
        </Link>
      ) : (
        <div>
          {/* Handle the case where neither 'jwt-learn' nor 'jwt-lead' is set */}
          {/* You can add a default behavior or message here */}
        </div>
      )}
    </div>
  ))}
</div>

                  </div>

                ) : (
                  <Typography variant="h6" className="mb-2">
                    Courses Enrolled
                  </Typography>
                )}{" "}
              </>
            )}
          </div>
        </div>
      </div>
      <StripPaymentModal
        CloseModal={handlestripModal}
        isOpen={isStripOpen}
      >
        <Elements stripe={stripePromise}>
          <StripPayment amount={amount} TutorId={profileDataId} handlesetSubscribed={handlesetSubscribed}/>
        </Elements>
      </StripPaymentModal>
      {/* {chatUI && (
        <ChatUIModal CloseModal={handleChatUI} isOpen={chatUI}>
          <ChatUI
            recipientName={
              profileData ? publicmethod.properCase(profileData.name) : ""
            }
            recipientAvatarUrl={profileData ? profileData.avatarUrl : ""}
          />
        </ChatUIModal>
      )} */}
    </div>
  );
}

export default TutorDetailPage;
