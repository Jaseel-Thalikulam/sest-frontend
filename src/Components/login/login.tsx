import React from 'react'
import LoginForm from './loginform'
import { useSelector } from 'react-redux'
import { RootStateType } from '../../redux/store'
import LoginModal from '../Modal/loginModal'
import ForgetPassword from '../Forgetpassword/ForgetPassword'
import NewPasswordVerifyOTP from '../Forgetpassword/NewPassword&OTPVerify'
const login = () => {
  const data = useSelector((state: RootStateType) => state.loginformmodal)
  return (
      <div>
          <LoginModal buttonname='Login' data='Login & Connect'>  

        <LoginForm />
        
        
      </LoginModal>
      <ForgetPassword />
     
    </div>
  )
}

export default login
