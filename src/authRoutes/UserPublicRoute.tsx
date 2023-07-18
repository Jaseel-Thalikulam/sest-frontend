import { Navigate } from "react-router-dom";

// Define the interface for the props
interface UserPublicRouteProps {
  children: React.ReactNode;
}

export default function UserPublicRoute(props: UserPublicRouteProps) {
  if (localStorage.getItem('jwt-learn')) {
    
      return <Navigate to={'/learn'} />;

  } else if (localStorage.getItem('jwt-lead')) {
      
    return <Navigate to={'/lead'} />;
    
} else if (localStorage.getItem('jwt-admin')) {
    
      return <Navigate to={'/admin'} />;
      
} else if (localStorage.getItem('jwt-S-admin')) {
    
      return <Navigate to={'/Sadmin'} />;
      
  }else{
    return props.children;
  }
}
