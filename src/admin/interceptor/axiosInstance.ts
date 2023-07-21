import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/', // Replace with your API base URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here (e.g., add headers, authentication tokens)
        // const accessToken = JSON.parse(localStorage.getItem("token"));
        const tokenString = localStorage.getItem("jwt-S-admin");
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

    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here (e.g., parse, transform)

    return response;
  },
  (error) => {
    // Handle response errors here

    return Promise.reject(error);
  }
);

export default axiosInstance;;