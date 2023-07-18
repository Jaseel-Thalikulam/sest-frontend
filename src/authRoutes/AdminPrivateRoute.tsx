import { Navigate } from "react-router-dom";


interface AdminPrivateRouteProps {
  children: React.ReactNode;
}

export default function AdminPrivateRoute(props: AdminPrivateRouteProps) {
  
    if (localStorage.getItem('jwt-admin')) {
    return props.children
}else{
    return <Navigate to={'/'} />
    }
    
}
