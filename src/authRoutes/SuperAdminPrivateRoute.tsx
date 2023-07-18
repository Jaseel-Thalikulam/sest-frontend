import { Navigate } from "react-router-dom";

// Define the interface for the props
interface SuperAdminPrivateRouteProps {
  children: React.ReactNode;
}

export default function SuperAdminPrivateRoute(props: SuperAdminPrivateRouteProps) {
  
    if (localStorage.getItem('jwt-S-admin')) {
    return props.children
}else{
    return <Navigate to={'/'} />
    }
    
}
