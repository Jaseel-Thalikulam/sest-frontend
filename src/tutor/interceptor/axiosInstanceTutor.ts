import axios from 'axios'
const axiosInstanceTutor = axios.create({
  baseURL: 'http://localhost:4000/lead', // Replace with your API base URL
});

// Request interceptor
axiosInstanceTutor.interceptors.request.use(
  (config) => {
    // Modify the request config here (e.g., add headers, authentication tokens)
        // const accessToken = JSON.parse(localStorage.getItem("token"));
        const tokenString = localStorage.getItem("jwt-lead");
        console.log(tokenString,"from the interceptor")
        
        const accessToken = tokenString;       
        
        // Now you can use the accessToken variable without errors.
        
    // ** If token is present add it to request'sAuthorization Header
    if (accessToken) {
      if (config.headers) config.headers.token = accessToken;
    }
    return config;
  },
  (error) => {

    // Handle request errors here

      console.log(error, "from the interceptor")
      return Promise.reject(error);
  }
);

// Response interceptor
axiosInstanceTutor.interceptors.response.use(
  (response) => {
    // Modify the response data here (e.g., parse, transform)

    return response;
  },
  (error) => {
    // Handle response errors here

    return Promise.reject(error);
  }
);

export default axiosInstanceTutor;;