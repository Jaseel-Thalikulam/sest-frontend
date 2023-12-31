import "./LeadHomePage.scss";
import { useState } from "react";
import { Button } from "@mui/material";
import Posts from "../../../student/components/HomePage-Posts/Posts";
import UploadMediaForm from "../../components/Media/UploadMediaForm";
import UploadMediaModal from "../../components/Media/UploadMediaModal";
import { Videocam, Image, Description,Book } from "@mui/icons-material";
import UploadArticleForm from "../../components/Article/uploadArticleForm";
import UploadArticleModal from "../../components/Article/uploadArticleModal";
import ProfileMenu from "../../../student/components/HomePage-ProfileMenu/ProfileMenu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TutorList from "../../../student/components/HomePage-TutorList/TutorList";
import PublicMethods from "../../../Methods/PublicMethods";
import { useNavigate } from "react-router-dom";
import { Jitsihelper } from "../../../common/Helper/JistiMeetHelper";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../redux/store";
const LeadHomePage = () => {
  const [isArticleModalOpen, setArticleModal] = useState(false);
  const [isMediaModalOpen, setMediaModal] = useState(false);
  const publicmethod = new PublicMethods()
  const jitsi = new Jitsihelper()
  const data = useSelector((state: RootStateType) => state.user);

  
  const navigate = useNavigate()
   function handelArticleButtonClick() {
    setArticleModal(!isArticleModalOpen);
  }
   function handleMediaButtonClick() {
    setMediaModal(!isMediaModalOpen);
  }


  async function MeetButtonClick(){
    
    const meetId: string = publicmethod.generateRandomString(10)
 
    const token:string = await jitsi.getToken(data)
 
    navigate(`/lead/meet/${meetId}/${token}`)
 
  }
  
   function CourseButtonClick() {
    navigate('/lead/course')
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/4 mb-4 md:mb-0">
                <ProfileMenu />
       
              </div>
              <div className="p-4 rounded-lg w-full md:w-1/2 mb-4 md:mb-0 overflow-y-auto max-h-screen hide-scrollbar">
                {/* Add Upload Post Section */}
                <div className="mb-4">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    {/* Meeting, Image/Video, and Article Options */}
                    <div className="flex space-x-4 justify-center">
                      {/* Centered Button - Meeting */}
                     
                      <Button
                         onClick={()=>void MeetButtonClick()}
                        variant="text"
                        
                        startIcon={<Videocam className="text-red-500" />}
                        >
                        Meet
                      </Button>
                      <Button
                        onClick={()=>void CourseButtonClick()}
                        variant="text"
                        startIcon={<Book className="text-gray-500" />}
                        >
                        Course
                      </Button>
                      {/* Centered Button - Image/Video */}
                      <Button
                        variant="text"
                        startIcon={<Image className="text-purple-500" />}
                        onClick={() => void handleMediaButtonClick()}
                      >
                        Media
                      </Button>
                
                  
                      {/* Centered Button - Article */}
                      <Button
                        variant="text"
                        startIcon={<Description className="text-orange-500" />}
                        onClick={() => void handelArticleButtonClick()}
                      >
                        Article
                      </Button>
                    </div>
                  </div>
                </div>
                {/* Posts */}
                <Posts />
              </div>
              <div className="w-full md:w-1/4"> <TutorList/></div>
            </div>
          </div>
        </div>
      </div>

      <UploadArticleModal
        
        isOpen={isArticleModalOpen}
        CloseModal={handelArticleButtonClick}
        data="Author Your Content"
      >
        <UploadArticleForm CloseModal={handelArticleButtonClick} />
      </UploadArticleModal>

      <UploadMediaModal
        isOpen={isMediaModalOpen}
        CloseModal={handleMediaButtonClick}
        data="Share Your Insights"
      >
        <UploadMediaForm CloseModal={handleMediaButtonClick} />
      </UploadMediaModal>

      <ToastContainer />
    </>
  );
};

export default LeadHomePage;
