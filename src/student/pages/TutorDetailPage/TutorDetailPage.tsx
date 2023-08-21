import { useEffect, useState } from "react";
import "./TutorDetailPage.scss";
import { useParams } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import axiosInstanceStudent from "../../interceptor/axiosInstance.Student";
import IUserSlice from "../../../interface/Iredux/IuserSlice";
import IFetchTutorResponse from "../../../interface/TutorDetailPage/fetchTutor.Interface";
import ChatUIModal from "../../modal/ChatUI";
import ChatUI from "../../components/ChatUI/ChatUI";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../redux/store";
import PublicMethods from "../../../Methods/PublicMethods";
function TutorDetailPage() {
  const { tutorId } = useParams();
  const [profileData, setProfileData] = useState<IUserSlice | null>(null);
  const [chatUI, setChatUI] = useState(false);
  const [isSubscriptionOpen, setSubscription] = useState(false);
  const data = useSelector((state: RootStateType) => state.user);

  const {  _id } = data;

  const publicmethod = new PublicMethods()
 
  async function handleChatUI() {


    const response = await axiosInstanceStudent.post('/chat/access', {senderId:_id,receiverId:profileData?._id
      
    })
    // console.log(response.data.Chat)
    setChatUI(!chatUI);
  }
  function handleSubscription() {
    setSubscription(!isSubscriptionOpen);
  }

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const response: { data: IFetchTutorResponse } =
          await axiosInstanceStudent.post("/tutordata", {
            tutorId,
          });

        const tutordata = response.data.Tutorsdata;

        setProfileData(tutordata);
      } catch (error) {
        console.error("Error fetching tutor data:", error);
      }
    };

    fetchTutor().catch((error) => {
      console.error("Error in fetchTutor:", error);
    });
  }, [tutorId]);

 

  return (
    <div className="bg-gray-100 min-h-screen">
    
      <div className="container mx-auto py-10">
        <div className="flex flex-col lg:flex-row bg-white p-6 rounded-lg shadow-md">
          {profileData && (
            <div className="lg:w-1/4 border-b lg:border-b-0 lg:border-r border-gray-300 pr-6 pb-6 lg:pb-0">
              <div className="flex flex-col items-center">
                <Avatar
                  alt={profileData.name}
                  src={profileData.avatarUrl}
                  className="w-32 h-32 mb-4"
                />
                <Typography variant="h6" className="mb-2 text-center">
                  {publicmethod.properCase(profileData.name)}
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-2">
                  @{profileData.username}
                </Typography>
                <div className="flex">
                  <Button
                    variant="contained"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full mr-2"
                  >
                    Connect
                  </Button>
                  <Button
                    variant="outlined"
                    className="border-gray-500 text-gray-500 font-semibold py-2 px-4 rounded-full hover:bg-gray-200"
                    onClick={handleChatUI}
                  >
                    Contact Me
                  </Button>
                </div>

                <div className="border-t border-gray-300 mt-4 pt-4">
                  {/* <Typography variant="body2" className="text-gray-600">
                    Member Since {profileData.memberSince}
                  </Typography> */}
                </div>

                <div className="border-t border-gray-300 mt-4 pt-4">
                  <Typography variant="h6" className="mb-2">
                    About
                  </Typography>
                  <div className="border-b border-gray-300 pb-4 mb-4">
                    <Typography variant="body1">{profileData.about}</Typography>
                  </div>

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
                <div className="bg-blue-500 rounded-lg p-4 mb-4 flex justify-between items-center">
                  <Typography variant="body2" className="text-white mb-2">
                    Subscribe for Premium content's of{" "}
                    {publicmethod.properCase(profileData.name)}
                  </Typography>
                  <button
                    className="border border-2 border-white text-white font-bold rounded-full px-4 py-2 hover:bg-white hover:text-black transition duration-300"
                    onClick={() => {
                      handleSubscription();
                    }}
                  >
                    Subscribe
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {isSubscriptionOpen && (
                    <div
                      className="subscription-content animate-fade border-green-500 text-green-500 flex-1 rounded-md p-6"
                      style={{
                        background: "rgb(0, 185, 123)",
                        position: "relative",
                        color: "#fff",
                      }}
                    >
                      <div className="glass-shimmer">
                        <Typography variant="h6" className="mb-2">
                          Green Subscription Plan
                        </Typography>
                        <Typography variant="body2" className="mb-4">
                          Get access to premium features and content.
                        </Typography>
                      </div>
                    </div>
                  )}

                  {isSubscriptionOpen && (
                    <div
                      className="subscription-content animate-fade border-purple-500 text-purple-500 flex-1 rounded-md p-6"
                      style={{
                        background: "rgb(159, 122, 234)",
                        position: "relative",
                        color: "#fff",
                      }}
                    >
                      <div className="glass-shimmer">
                        <Typography variant="h6" className="mb-2">
                          Purple Subscription Plan
                        </Typography>
                        <Typography variant="body2" className="mb-4">
                          Get access to premium features and content.
                        </Typography>
                      </div>
                    </div>
                  )}

                  {isSubscriptionOpen && (
                    <div
                      className="subscription-content animate-fade border-green-500 text-green-500 flex-1 rounded-md p-6 bg-green-500 text-white"
                      style={{
                        background: "rgb(114, 159, 207)",
                        position: "relative",
                        color: "#fff",
                      }}
                    >
                      <div className="glass-shimmer">
                        <Typography variant="h6" className="mb-2">
                          Blue Subscription Plan
                        </Typography>
                        <Typography variant="body2" className="mb-4">
                          Get access to premium features and content.
                        </Typography>
                      </div>
                    </div>
                  )}
                </div>

                <Typography variant="h6" className="mb-2">
                  Courses Released
                </Typography>
              </>
            )}
          </div>
        </div>
      </div>

      {chatUI && (
        <ChatUIModal CloseModal={handleChatUI} isOpen={chatUI}>
          <ChatUI
            recipientName={profileData ? publicmethod.properCase(profileData.name) : ""}
            recipientAvatarUrl={profileData ? profileData.avatarUrl : ""}
          />
        </ChatUIModal>
      )}
    </div>
  );
}

export default TutorDetailPage;
