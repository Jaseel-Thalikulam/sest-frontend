import React, { useEffect, useState } from 'react';
import { Avatar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axiosInstanceStudent from '../../interceptor/axiosInstance.Student';
import defaultAvatar from '../../../../public/defaultAvatar/defaultavatar.png';
import IUserSlice from '../../../interface/Iredux/IuserSlice';
import IFetchTutorsResponse from '../../../interface/TutorDetailPage/fetchTutors.interface';

function TutorList() {
  const [tutors, setTutors] = useState<IUserSlice[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  function properCase(inputString: string) {
    return inputString.replace(/\b\w/g, function (match) {
      return match.toUpperCase();
    });
  }

  useEffect(() => {
    const fetchTutorList = async () => {
      try {
        const response: { data: IFetchTutorsResponse } = await axiosInstanceStudent.get('/tutorlist');
        const tutordata = response.data.Tutorsdata;
        setTutors(tutordata);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    void fetchTutorList();
  }, []);
  const loadingArray = new Array(3).fill(null);
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Tutors</h2>
      {loading ? (
        // Render loading component multiple times
        loadingArray.map((_, index) => (
          <div key={index} className="relative flex w-64 animate-pulse gap-2 p-4">
            <div className="h-12 w-12 rounded-full bg-slate-300"></div>
            <div className="flex-1">
              <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-300 text-lg"></div>
              <div className="h-5 w-[90%] rounded-lg bg-slate-300 text-sm"></div>
            </div>
            <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-300"></div>
          </div>
        ))
      ) : (
        <ul>
          {tutors.map((tutor: IUserSlice) => (
            <li key={tutor._id} className="mb-2">
              <Link to={`tutor/${tutor._id}`} className="flex items-center space-x-2">
                <div>
                  {tutor.avatarUrl !== null ? (
                    <Avatar alt={tutor.name} className="w-10 h-10" src={tutor.avatarUrl} />
                  ) : (
                    <Avatar alt={tutor.name} className="w-10 h-10" src={defaultAvatar} />
                  )}
                </div>
                <Typography variant="body2">{properCase(tutor.name)}</Typography>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TutorList;
