import React, { useEffect, useState } from 'react'
import IUserSlice from '../../../interface/Iredux/IuserSlice';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Typography,
  } from '@mui/material';
import IFetchTutorsResponse from '../../../interface/TutorDetailPage/fetchTutors.interface';
import axiosInstanceStudent from '../../interceptor/axiosInstance.Student';
import defaultAvatar from '../../../../public/defaultAvatar/defaultavatar.png';

function TutorList() {
    const [tutors, setTutors] = useState<IUserSlice[]>([]);
    function properCase(inputString: string) {
        return inputString.replace(/\b\w/g, function (match) {
          return match.toUpperCase();
        });
    }

    useEffect(() => {
        const fetchtutorlist = async () => {
          try {
            const response: { data: IFetchTutorsResponse } = await axiosInstanceStudent.get('/tutorlist');
            const tutordata = response.data.Tutorsdata;
            setTutors(tutordata);
           
          } catch (error) {
            console.error('Error fetching users:', error);
           
          }
        };
    
        void fetchtutorlist();
      }, []);
  return (
      <>
          <div className='col-3 tutorlist-menu'>
              <h2>Tutors</h2>
              <ul>
                {tutors.map((tutor: IUserSlice) => (
                  <li key={tutor._id} className="tutor-item">
                    <Link className="tutor-link" to={`tutor/${tutor._id}`}>
                      <div className="tutor-details">
                        {tutor.avatarUrl !== null ? (
                          <Avatar alt={tutor.name} sx={{ width: 40, height: 40 }} src={tutor.avatarUrl} />
                        ) : (
                          <Avatar alt={tutor.name} sx={{ width: 40, height: 40 }} src={defaultAvatar} />
                        )}
                        <Typography variant='body2'>{properCase(tutor.name)}</Typography>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
      </>
  )
}

export default TutorList


