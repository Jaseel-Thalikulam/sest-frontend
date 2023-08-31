import ProfileMenu from '../../components/HomePage-ProfileMenu/ProfileMenu';
import './LearnHomePage.scss'
import TutorList from '../../components/HomrPage-TutorList/TutorList';
import Posts from '../../components/HomePage-Posts/Posts';
const LearnHomePage = () => {

  return (
    <div className="flex flex-col min-h-screen">
    <div className="flex-grow bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <ProfileMenu />
          </div>
          <div className="posts w-full md:w-1/2 mb-4 md:mb-0 overflow-y-auto max-h-screen hide-scrollbar" >
              <Posts/>
          </div>
          <div className="w-full md:w-1/4">
            <TutorList />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default LearnHomePage;