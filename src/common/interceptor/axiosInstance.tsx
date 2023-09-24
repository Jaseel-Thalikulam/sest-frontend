import axios from 'axios';
import React, { useState } from 'react'; // Import React and useState
import Snackbar from '@mui/material/Snackbar'; // Import Material-UI Snackbar
import MuiAlert from '@mui/material/Alert'; // Import Material-UI Alert
const BASE_URL:string = import.meta.env.VITE_BACKEND_BASE_URL as string
const axiosInstance = axios.create(); // Create a generic Axios instance with no base URL

// Define a function for rendering the Snackbar message
const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} variant="filled" {...props} ref={ref} />;
});

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

      console.log(accessToken,"int prcommon")

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
    <div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export { axiosInstance, AxiosInstanceComponent }; 
