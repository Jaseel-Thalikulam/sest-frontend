import { Navigate } from "react-router-dom";

// Define the interface for the props
interface LearnPrivateRouteProps {
  children: React.ReactNode;
}

export default function LearnPrivateRoute(props: LearnPrivateRouteProps) {
  
    if (localStorage.getItem('jwt-learn')) {
    return props.children
}else{
    return <Navigate to={'/'} />
    }
    
}
