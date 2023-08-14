import {  useSelector } from 'react-redux'
import { RootStateType } from '../../../redux/store'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './LeadHomePage.scss'
const LeadHomePage = () => {
  const navigate = useNavigate()
 
    const data = useSelector((state: RootStateType) => state.user)
    
  
    const LogOutHandler = () => {
      
      localStorage.removeItem('persist:user');
      localStorage.removeItem('jwt-lead');
      navigate('/');
    }
    
  
  return (
    <div>
      <h1>Hellooo {data.role} {data.name}</h1>
      <Button variant='contained' onClick={()=>LogOutHandler()}>logout</Button>
      <Button variant='contained' onClick={()=>navigate('/lead/profile')}>Profile</Button>
    </div>
  )
}

export default LeadHomePage
