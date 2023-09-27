import { useSelector } from 'react-redux';
import { Typography, Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../../../public/defaultAvatar/defaultavatar.png';
import { RootStateType } from '../../../redux/store';
import PublicMethods from '../../../Methods/PublicMethods';
import ErrorBoundary from '../../../common/Components/errorBoundary/ErrorBoundary';

function ProfileMenu() {
  const publicmethods = new PublicMethods();
  const data = useSelector((state: RootStateType) => state.user);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('persist:user');
    if (localStorage.getItem('jwt-learn')) {
      localStorage.removeItem('jwt-learn');
    } else if (localStorage.getItem('jwt-lead')) {
      localStorage.removeItem('jwt-lead');
    }
    navigate('/');
  };

  const handlenavigateProfile = () => {
    if (localStorage.getItem('jwt-learn')) {
      navigate('/learn/profile');
    } else if (localStorage.getItem('jwt-lead')) {
      navigate('/lead/profile');
    }
  };
  const handlenavigateShowAllPosts = () => {
    if (localStorage.getItem('jwt-learn')) {
      navigate('/learn/ShowAllPosts');
    } else if (localStorage.getItem('jwt-lead')) {
      navigate('/lead/ShowAllPosts');
    }
  };
  const handlenavigateConnections = () => {
    if (localStorage.getItem('jwt-learn')) {
      navigate('/learn/Connections');
    } else if (localStorage.getItem('jwt-lead')) {
      navigate('/lead/Connections');
    }
  };



  return (
    <ErrorBoundary>

    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="text-center">
        {data.avatarUrl !== null ? (
          <Avatar alt="Avatar" className="mx-auto mb-2" src={data.avatarUrl} />
        ) : (
          <Avatar alt="Avatar" className="mx-auto mb-2" src={defaultAvatar} />
        )}
        <Typography variant="subtitle2">{publicmethods.properCase(data.name)}</Typography>
        <Typography onClick={handlenavigateProfile} className="cursor-pointer" variant="caption">
          Profile
        </Typography>
      <br/>
          <Typography variant="caption" className="cursor-pointer" onClick={handlenavigateShowAllPosts} >
            My Posts
          </Typography>
      <br/>
          <Typography variant="caption" className="cursor-pointer" onClick={handlenavigateConnections}>
            Connections
          </Typography>
      <br/>
        
        <Button onClick={logoutHandler} variant="text" className="mt-2">
          Logout
        </Button>
        {/* Add other menu items here */}
      </div>
    </div>
    </ErrorBoundary>
  );
}

export default ProfileMenu;
