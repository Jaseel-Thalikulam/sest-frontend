import {
  useMediaQuery,
  useTheme,
} from '@mui/material';
import './LearnHomePage.scss';

import NavBar from '../../../common/Components/NavBar/NavBar';
import ProfileMenu from '../../components/HomePage-ProfileMenu/ProfileMenu';
import TutorList from '../../components/HomrPage-TutorList/TutorList';

const LearnHomePage = () => {

  const theme = useTheme();
  const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <>
      <NavBar isSmallScreen={isSmallScreen} />

      <div className='learn-home-page'>
        <div className='content-container'>
          {!isSmallScreen && (
            <ProfileMenu />
          )}

          <div className={`col-6${isSmallScreen ? ' full-width' : ''}`}>
            <div className='user-info'>
              {/* Other content for the center column */}

            </div>
          </div>

          {!isSmallScreen && (
            <TutorList />
          )}
        </div>
      </div>
    </>

  );
};

export default LearnHomePage;
