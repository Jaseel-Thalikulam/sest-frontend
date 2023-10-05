import axios from 'axios';
import { useState } from 'react'; // Import React and useState
import MuiAlert from '../../mui/muiAlert';

const BASE_URL:string = import.meta.env.VITE_BACKEND_BASE_URL as string
const axiosInstance = axios.create(); // Create a generic Axios instance with no base URL


// Your component
function AxiosInstanceComponent() {
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar open/close
  const [snackbarMessage, setSnackbarMessage] = useState(''); // State for Snackbar message

  // Determine whether the user is a student or a tutor
  const isStudent = localStorage.getItem('jwt-learn') !== null;
  const isTutor = localStorage.getItem('jwt-lead') !== null;


  axiosInstance.defaults.baseURL = isStudent
    ? `${BASE_URL}/learn`
    : isTutor
    ? `${BASE_URL}/lead`
    : BASE_URL;

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const tokenString = isStudent
        ? localStorage.getItem('jwt-learn')
        : isTutor
        ? localStorage.getItem('jwt-lead')
        : null;

      const accessToken = tokenString;


      if (accessToken) {
        if (config.headers) config.headers.token = accessToken;
      }
      return config;
    },
    (error) => {
      console.log(error, 'from the interceptor');
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
     
      
      return response;
    },
    (error:{code:string}) => {
      if (error.code === 'ERR_NETWORK') {
        setSnackbarMessage('Request timed out: The network is slow.');
        setSnackbarOpen(true);
      }
      return Promise.reject(error);
    }
  );

  // Close the Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
   <>
      <MuiAlert handleCloseSnackbar={handleCloseSnackbar} snackbarMessage={snackbarMessage} snackbarOpen={snackbarOpen} severity='warning'/>
     
   </>

  );
}

export { axiosInstance, AxiosInstanceComponent }; 
