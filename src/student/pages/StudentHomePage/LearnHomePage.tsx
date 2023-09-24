import ProfileMenu from '../../components/HomePage-ProfileMenu/ProfileMenu';
import './LearnHomePage.scss';
import TutorList from '../../components/HomePage-TutorList/TutorList';
import Posts from '../../components/HomePage-Posts/Posts';
import { Button } from '@mui/material';
import { Videocam,Description } from '@mui/icons-material';
import { useState } from 'react';
import UploadArticleModal from '../../../tutor/components/Article/uploadArticleModal';
import UploadArticleForm from '../../../tutor/components/Article/uploadArticleForm';
import { ToastContainer } from "react-toastify";
import {  useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { Jitsihelper } from '../../../common/Helper/JistiMeetHelper';
import PublicMethods from '../../../Methods/PublicMethods';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../redux/store';
import { AxiosInstanceComponent } from '../../../common/interceptor/axiosInstance';
const LearnHomePage = () => {
  const data = useSelector((state: RootStateType) => state.user);
const navigate = useNavigate()
  const publicmethod =  new PublicMethods()
  const jitsi = new Jitsihelper()
  const [isArticleModalOpen, setArticleModal] = useState(false);
   function handelArticleButtonClick() {
    setArticleModal(!isArticleModalOpen);
  }
  
 async function MeetButtonClick(){
    
   const meetId: string = publicmethod.generateRandomString(10)

   const token :string= await jitsi.getToken(data)

   navigate(`/learn/meet/${meetId}/${token}`)

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
                    {/* Meeting, Image/Video, Poll, and Article Options */}
                    
                    <div className="flex space-x-4 justify-center relative"  >
                      {/* Centered Button - Meeting */}


                        <Button 
                         onClick={()=>void MeetButtonClick()}
                        variant="text"
                        startIcon={<Videocam className="text-red-500" /> }
                        >
                        Meet
                      </Button>
                          
                      {/* Centered Button - Image/Video */}
                   
                      {/* Centered Button - Article */}
                      <Button
                        style={{ zIndex: 2 }}
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
            <div className="w-full md:w-1/4">
              <TutorList />
            </div>
          </div>
        </div>
      </div>
    </div>
    <UploadArticleModal
        isOpen={isArticleModalOpen}
        CloseModal={()=>void handelArticleButtonClick()}
        data="Author Your Content"
      >
        <UploadArticleForm CloseModal={()=>void handelArticleButtonClick()} />
      </UploadArticleModal>
      <ToastContainer/>
<AxiosInstanceComponent/>
                        </>
  );
};

export default LearnHomePage;
