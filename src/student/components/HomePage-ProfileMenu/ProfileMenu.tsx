import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../../../public/defaultAvatar/defaultavatar.png';
import { RootStateType } from '../../../redux/store';

function ProfileMenu() {
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
    if(localStorage.getItem('jwt-learn')){
      navigate('/learn/profile')
    } else if (localStorage.getItem('jwt-lead')) {
      
      navigate('/lead/profile')
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="text-center">
        {data.avatarUrl !== null ? (
          <Avatar alt="Avatar" className="mx-auto mb-2" src={data.avatarUrl} />
        ) : (
          <Avatar alt="Avatar" className="mx-auto mb-2" src={defaultAvatar} />
        )}
        <Typography variant="subtitle2">{data.name}</Typography>
        <Typography onClick={() =>void handlenavigateProfile()} className="cursor-pointer" variant="body2">
          Profile
        </Typography>
        <Button onClick={logoutHandler} variant="text" className="mt-2">
          Logout
        </Button>
        {/* Add other menu items here */}
      </div>
    </div>
  );
}

export default ProfileMenu;
