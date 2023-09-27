  import { useEffect, useState } from 'react';
  import { Avatar, Typography } from '@mui/material';
  import { Link } from 'react-router-dom';
  import {axiosInstance} from '../../../common/interceptor/axiosInstance';
  import defaultAvatar from '../../../../public/defaultAvatar/defaultavatar.png';
  import IUserSlice from '../../../interface/Iredux/IuserSlice';
  import IFetchTutorsResponse from '../../../interface/TutorDetailPage/fetchTutors.interface';
  import PublicMethods from '../../../Methods/PublicMethods';
import ErrorBoundary from '../../../common/Components/errorBoundary/ErrorBoundary';
  function TutorList() {
    const [tutors, setTutors] = useState<IUserSlice[]>([]);
    const [loading, setLoading] = useState(true); // Add loading state
   
    const publicmethods = new PublicMethods()
  



    useEffect(() => {
      const fetchTutorList = async () => {
        try {
          
            
            const response: { data: IFetchTutorsResponse } = await axiosInstance.get('/tutorlist');
            if (response.data.success) {
              
              const tutordata = response.data.Tutorsdata;
              
              
              setTutors(tutordata);
              setLoading(false); // Set loading to false after fetching data
            } else {
              alert (response.data.message)
            }
          
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      void fetchTutorList();
    }, []);
    const loadingArray = new Array(3).fill(null);
    return (
      <ErrorBoundary>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="text-center mb-2"> {/* Centered heading */}
          <h2 className="text-xl font-semibold">Trending Tutors</h2>
        </div>
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
              <li key={tutor._id} className="mb-2 hover hover:scale-105 transition-transform duration-300 cursor-pointer ">
                <Link to={`user/${tutor._id}`} className="flex items-center space-x-2">
                  <div>
                    {tutor.avatarUrl !== null ? (
                      <Avatar alt={tutor.name} className="w-10 h-10" src={tutor.avatarUrl} />
                    ) : (
                      <Avatar alt={tutor.name} className="w-10 h-10" src={defaultAvatar} />
                    )}
                  </div>
                  <Typography variant="body2">{publicmethods.properCase(tutor.name)}</Typography>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
          </ErrorBoundary>
    );
  }

  export default TutorList;
