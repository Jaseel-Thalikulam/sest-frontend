import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar'; // Import Avatar component
import axiosInstanceStudent from '../../../student/interceptor/axiosInstance.Student';
import IUserSlice from '../../../interface/Iredux/IuserSlice';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../redux/store';
import PublicMethods from '../../../Methods/PublicMethods';
import axiosInstanceTutor from '../../../tutor/interceptor/axiosInstanceTutor';


function Connections() {
  const [selectedTab, setSelectedTab] = useState(0);
  const data = useSelector((state: RootStateType) => state.user);
    const { _id } = data;
    const publicmethods = new PublicMethods()
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const [Followers, setFollowers] = useState([]);
  const [Followings, setFollowings] = useState([]);

  useEffect(() => {
    async function getFollowers() {
      try {
        if (localStorage.getItem('jwt-learn')) {
          const response = await axiosInstanceStudent.get('/getfollowers', {
            params: {
              userId: _id,
            },
          });

          if (response.data.success) {
            setFollowers(response.data.followers);
            setFollowings(response.data.follwingUsers);
          }
        } else if (localStorage.getItem('jwt-lead')) {
            const response = await axiosInstanceTutor.get('/getfollowers', {
                params: {
                  userId: _id,
                },
              });
    
              if (response.data.success) {
                setFollowers(response.data.followers);
                setFollowings(response.data.follwingUsers);
              }
        }
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    }

    getFollowers(); // Call the async function
  }, [_id]);

  const usersData = selectedTab === 0 ? Followers : Followings;
  const tabLabel = selectedTab === 0 ? 'Followers' : 'Followings';

  return (
    <Box>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="Followers" />
        <Tab label="Followings" />
      </Tabs>

   
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {usersData.map((user: IUserSlice) => (
          <Card key={user._id} style={{ width: '300px', margin: '10px' }}>
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={user.avatarUrl} alt={`${user.name}'s avatar`} style={{ marginRight: '10px' }} />
                <h3>{publicmethods.properCase( user.name)}</h3>
              </div>
              {/* You can display additional user details here */}
            </CardContent>
          </Card>
        ))}
      </div>
    </Box>
  );
}

export default Connections;
