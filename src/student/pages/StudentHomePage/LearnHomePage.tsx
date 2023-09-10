import ProfileMenu from '../../components/HomePage-ProfileMenu/ProfileMenu';
import './LearnHomePage.scss';
import TutorList from '../../components/HomePage-TutorList/TutorList';
import Posts from '../../components/HomePage-Posts/Posts';
import { Button } from '@mui/material';
import { Videocam,Description } from '@mui/icons-material';
import { useState } from 'react';
import UploadArticleModal from '../../../tutor/components/Article/UploadArticleModal';
import UploadArticleForm from '../../../tutor/components/Article/UploadArticleForm';
import { ToastContainer } from "react-toastify";
import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
const LearnHomePage = () => {
  const [isArticleModalOpen, setArticleModal] = useState(false);
  async function handelArticleButtonClick() {
    setArticleModal(!isArticleModalOpen);
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

                      <Link to={`/learn/meet`} className="flex items-center space-x-2">

                      <Button
                        variant="text"
                        startIcon={<Videocam className="text-red-500" /> }
                        >
                        Meet
                      </Button>
                          </Link>
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
        CloseModal={handelArticleButtonClick}
        data="Author Your Content"
      >
        <UploadArticleForm CloseModal={handelArticleButtonClick} />
      </UploadArticleModal>
      <ToastContainer/>

                        </>
  );
};

export default LearnHomePage;
