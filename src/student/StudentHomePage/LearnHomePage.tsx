import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../redux/store';
import { Button, Avatar, Typography, AppBar, TextField, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './LearnHomePage.scss';
import axiosInstanceStudent from '../interceptor/axiosInstance.Student';
import IUserSlice from '../../interface/Iredux/IuserSlice';
import { Link } from 'react-router-dom';
import IFetchTutorsResponse from '../../interface/TutorDetailPage/fetchTutors.interface';

const LearnHomePage = () => {
  const [loading, setLoading] = useState(true);
  const [tutors, setTutors] = useState<IUserSlice[]>([]);
  const navigate = useNavigate();
  const data = useSelector((state: RootStateType) => state.user);

  function properCase(inputString:string) {
    return inputString.replace(/\b\w/g, function(match) {
        return match.toUpperCase();
    });
  }
  
  

  const logoutHandler = () => {
    localStorage.removeItem('persist:user');
    localStorage.removeItem('jwt-learn');
    navigate('/');
  };


  useEffect(() => {
    
    const fetchtutorlist = async () => {
      try {
        const response : { data:IFetchTutorsResponse } = await axiosInstanceStudent.get('/tutorlist');

        
        const tutordata = response.data.Tutorsdata
        
        setTutors(tutordata);

        setLoading(false)
      } catch (error){
        console.error('Error fetching users:', error);

        setLoading(false)

      }
    };

   void fetchtutorlist();
  },[])


  return (
    <div className='learn-home-page'>
      <AppBar position="fixed"  sx={{ backgroundColor: '#2196F3', borderBottom: '1px solid #ccc' }}> 
        <Toolbar>
          <div className="logo-container">
            <img src="path_to_logo_image" alt="Logo" className="logo" />
          </div>
          <TextField variant="outlined" placeholder="Search" className="search-field" /> 
        </Toolbar>
      </AppBar>
    <div className='col-3 profile-menu'>
      <div className='avatar-container'>
        <Avatar
          alt='User Avatar'
          src='path_to_avatar_image'
          sx={{ width: 60, height: 60 }}
        />
      </div>
      <Typography variant='subtitle2'>{data.name}</Typography>
      <Button variant='text' className='logout-button' onClick={logoutHandler}>
        Logout
      </Button>
      {/* Add other menu items here */}
    </div>

    <div className='col-6'>
      <div className='user-info'>
       
      </div>
      {/* Other content for the center column */}
    </div>

    <div className='col-3 tutorlist-menu'>
  <h2>Tutors</h2>
  <ul>
  {tutors.map((tutor:IUserSlice) => (
  <li key={tutor._id} className="tutor-item">
    <Link className="tutor-link" to={`tutor/${tutor._id}`}>
      <div className="tutor-details">
        <Avatar alt={tutor.name} sx={{ width: 40, height: 40 }} src={tutor.avatarUrl} />
        <Typography variant='body2'>{properCase(tutor.name)}</Typography>
      </div>

    </Link>
  </li>
))}

  </ul>
</div>

  </div>
);
};

export default LearnHomePage;
