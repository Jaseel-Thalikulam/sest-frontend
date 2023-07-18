import { Navigate } from "react-router-dom";

// Define the interface for the props
interface LeadPrivateRouteProps {
  children: React.ReactNode;
}

export default function LeadPrivateRoute(props: LeadPrivateRouteProps) {
  
    if (localStorage.getItem('jwt-lead')) {
    return props.children
}else{
    return <Navigate to={'/'} />
    }
    
}
