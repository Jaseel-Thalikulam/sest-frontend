import LoginForm from './loginform'
import LoginModal from '../Modal/loginModal'
import ForgetPassword from '../Forgetpassword/ForgetPassword'
const login = () => {
 
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
