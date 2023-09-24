import ForgetPasswordModal from '../Modal/forgetPasswordModal'
import ForgetPasswordForm from './ForgetPasswordForm'
import { RootStateType } from '../../../redux/store'
import { useSelector } from 'react-redux'
import NewPassword from './newPassword'

const ForgetPassword = () => {
  const data = useSelector((state: RootStateType) => state.forgetPasswordmodal)

  return (
    <div>
      <ForgetPasswordModal data="Enter Your Email" autoOpen={data.isOpen}>

        <ForgetPasswordForm />
     
      </ForgetPasswordModal>
      <NewPassword/>
    </div>
  )
}

export default ForgetPassword
