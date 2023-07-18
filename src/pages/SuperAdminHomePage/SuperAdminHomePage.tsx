import React from 'react'
import './SuperAdminHomePage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from '../../redux/store'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { UserDetails } from '../../redux/userSlice/UserSlice'



const SuperAdminHomePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const data = useSelector((state: RootStateType) => state.user)
    console.log("userData from lead page", data)
  
    const LogOutHandler = () => {
      {
        localStorage.removeItem('jwt-S-admin')
        navigate('/')
        dispatch(
          UserDetails({
            role: '',
            name:'',
            email: '',
            phone:null,
            dob:null,
          })
          )
      }
    }
  
  return (
    <div>
      <h1>Hellooo {data.role} {data.name}</h1>
      <Button variant='contained' onClick={()=>LogOutHandler()}>logout</Button>
    </div>
  )
}




export default SuperAdminHomePage
