import axios from 'axios'
const BASE_URL : string= import.meta.env.VITE_BACKEND_SUPERADMIN_BASE_URL as string
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`, 
});


// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    
        const tokenString = localStorage.getItem("jwt-S-admin");
        const accessToken = tokenString;       
      
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
    

    return response;
  },
  (error) => {

    return Promise.reject(error);
  }
);

export default axiosInstance;