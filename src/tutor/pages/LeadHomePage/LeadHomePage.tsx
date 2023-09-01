import './LeadHomePage.scss';
import ProfileMenu from '../../../student/components/HomePage-ProfileMenu/ProfileMenu';
import Posts from '../../../student/components/HomePage-Posts/Posts';
import { Button } from '@mui/material';
import { Videocam, Image, Poll, Description } from '@mui/icons-material';

const LeadHomePage = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow bg-gray-100">
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
                    <div className="flex space-x-4 justify-center">
                      {/* Centered Button - Meeting */}
                      <Button
                        variant="text"
                        startIcon={<Videocam className="text-red-500" />}
                      >
                        Meeting
                      </Button>
                      {/* Centered Button - Image/Video */}
                      <Button
                        variant="text"
                        startIcon={<Image className="text-blue-500" />}
                      >
                        Media
                      </Button>
                      {/* Centered Button - Poll */}
                      <Button
                        variant="text"
                        startIcon={<Poll className="text-purple-500" />}
                      >
                        Poll
                      </Button>
                      {/* Centered Button - Article */}
                      <Button
                        variant="text"
                        startIcon={<Description className="text-orange-500" />}
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
                {/* <TutorList /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadHomePage;
