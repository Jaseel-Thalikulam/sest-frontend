import React from 'react'
import {
    Button,
    Avatar,
    Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../../../public/defaultAvatar/defaultavatar.png';
function ProfileMenu() {
    const data = useSelector((state: RootStateType) => state.user);
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem('persist:user');
        localStorage.removeItem('jwt-learn');
        navigate('/');
      };
    
  return (
      <>
           <div className='col-3 profile-menu'>
              <div className='avatar-container'>
                {data.avatarUrl !== null ? (
                  <Avatar alt='Avatar' sx={{ width: 70, height: 70 }} src={data.avatarUrl} />
                ) : (
                  <Avatar alt='Avatar' sx={{ width: 70, height: 70 }} src={defaultAvatar} />
                )}
              </div>
              <Typography variant='subtitle2'>{data.name}</Typography>
              <Typography onClick={() => navigate('/learn/profile')} variant='body2'>Profile</Typography>
              <Button variant='text' className='logout-button' onClick={logoutHandler}>
                Logout
              </Button>
              {/* Add other menu items here */}
            </div>
      </>
  )
}

export default ProfileMenu
