import axios from 'axios'
const BASE_URL:string = import.meta.env.VITE_BACKEND_BASE_URL as string
const axiosInstanceStudent = axios.create({
  baseURL: `${BASE_URL}/learn`,
});

// Request interceptor
axiosInstanceStudent.interceptors.request.use(
  (config) => {
   
        const tokenString = localStorage.getItem("jwt-learn");
        console.log(tokenString,"from the interceptor")
        
        const accessToken = tokenString;       
        
    
    if (accessToken) {
      if (config.headers) config.headers.token = accessToken;
    }
    return config;
  },
  (error) => {


      console.log(error, "from the interceptor")
      return Promise.reject(error);
  }
);

// Response interceptor
axiosInstanceStudent.interceptors.response.use(
  (response) => {
    // Modify the response data here (e.g., parse, transform)

    return response;
  },
  (error) => {
    // Handle response errors here

    return Promise.reject(error);
  }
);

export default axiosInstanceStudent;