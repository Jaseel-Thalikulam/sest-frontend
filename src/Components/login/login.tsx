import React from 'react'
import LoginForm from './loginform'
import LoginModal from '../Modal/loginModal'
const login = () => {
  return (
      <div>
          <LoginModal buttonname='Login' data='Login & Connect'>  
      <LoginForm/>
          </LoginModal>
    </div>
  )
}

export default login
