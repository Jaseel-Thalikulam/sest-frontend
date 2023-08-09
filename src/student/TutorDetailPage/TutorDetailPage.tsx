import { Box, Avatar, Typography, Chip, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './tutorDetailPage.scss';
import axiosInstanceStudent from '../interceptor/axiosInstance.Student';
import IUserSlice from '../../interface/Iredux/IuserSlice';

function TutorDetailPage() {
  const { tutorId } = useParams();
  const [profileData, setProfileData] = useState<IUserSlice | undefined>();
  function properCase(inputString:string) {
    return inputString.replace(/\b\w/g, function(match) {
        return match.toUpperCase();
    });
  }
  
  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const { data } = await axiosInstanceStudent.post('/tutordata', {
          tutorId,
        });

        let tutordata = data.data;

        setProfileData(tutordata);
        console.log(tutordata, 'datataa'); // Log the fetched data
      } catch (error) {
        console.error('Error fetching tutor data:', error);
      }
    };

    fetchTutor();
  }, [tutorId]);

  return (
    <div className="profile-container">
      {profileData && (
        <Box className="profile-details">
          <Avatar alt={profileData.name}src={profileData.avatarUrl} className="avatar" />
          <div className="info-container">
            <Typography variant="h4" className="name">
              {properCase(profileData.name)}
            </Typography>
            <Box className="tag-chips">
              {profileData.tags.map((tag, index) => (
                <Chip key={index} label={tag.Name} variant="outlined" />
              ))}
            </Box>
            <Typography variant="body1" className="about">
              {profileData.about}
            </Typography>
            <Button variant="outlined" color="primary" className="follow-button">
              Follow
            </Button>
            <Typography variant="h6" className="courses">
              Courses Released
            </Typography>
          </div>
        </Box>
      )}
    </div>
  );
}

export default TutorDetailPage;