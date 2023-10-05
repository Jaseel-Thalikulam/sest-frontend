import {  useSelector } from 'react-redux'
import { RootStateType } from '../../../redux/store'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './AdminHomePage.scss'
const AdminHomePage = () => {
  const navigate = useNavigate()

    const data = useSelector((state: RootStateType) => state.user)
  
    const LogOutHandler = () => {
      {
        localStorage.removeItem('persist:user')
        localStorage.removeItem('jwt-admin')
        navigate('/')
      }
    }
  
  return (
    <div>
      <h1>Hellooo {data.role} {data.name}</h1>
      <Button variant='contained' onClick={()=>LogOutHandler()}>logout</Button>
    </div>
  )
}


export default AdminHomePage
